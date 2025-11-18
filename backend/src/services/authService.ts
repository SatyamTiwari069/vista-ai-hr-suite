import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config/env.js';
import { supabase } from '../config/supabase.js';

// Development mock users for quick testing
const mockUsers: Record<string, { password: string; name: string; role: string; department: string; position: string }> = {
  'admin@vista.com': {
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    department: 'IT',
    position: 'System Administrator',
  },
  'hr@vista.com': {
    password: 'hr123',
    name: 'HR Manager',
    role: 'hr',
    department: 'Human Resources',
    position: 'HR Manager',
  },
  'manager@vista.com': {
    password: 'manager123',
    name: 'Team Manager',
    role: 'manager',
    department: 'Engineering',
    position: 'Senior Manager',
  },
  'employee@vista.com': {
    password: 'employee123',
    name: 'John Doe',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Engineer',
  },
};

export const authService = {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },

  generateToken(userId: string, email: string, role: string): string {
    const payload = { id: userId, email, role };
    return jwt.sign(payload, config.jwt.secret, { 
      expiresIn: config.jwt.expiresIn 
    } as any);
  },

  async authenticateUser(email: string, password: string) {
    // First, try mock users (development/fallback)
    if (email in mockUsers) {
      const mockUser = mockUsers[email];
      if (mockUser.password === password) {
        const token = this.generateToken(email, email, mockUser.role);
        return { 
          token, 
          user: { 
            id: email, 
            email, 
            role: mockUser.role, 
            name: mockUser.name,
            department: mockUser.department,
            position: mockUser.position,
          } 
        };
      }
      // Mock user exists but password is wrong
      throw new Error('Invalid credentials');
    }

    // Try database authentication
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !user) {
        throw new Error('Invalid credentials');
      }

      const isPasswordValid = await this.comparePassword(password, user.password_hash);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      const token = this.generateToken(user.id, user.email, user.role);
      return { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
    } catch (error: any) {
      // If database fails and email not in mock users, throw error
      if (error.message === 'Invalid credentials') throw error;
      // For other DB errors, default to invalid credentials
      throw new Error('Invalid credentials');
    }
  },

  async registerUser(email: string, password: string, name: string, role: string = 'employee') {
    const hashedPassword = await this.hashPassword(password);

    try {
      const { data: user, error } = await supabase
        .from('users')
        .insert([
          {
            email,
            name,
            role,
            password_hash: hashedPassword,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      const token = this.generateToken(user.id, user.email, user.role);
      return { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
    } catch (error: any) {
      // Fallback: Return a mock user token for development
      const userId = `user_${Date.now()}`;
      const token = this.generateToken(userId, email, role);
      return { 
        token, 
        user: { 
          id: userId, 
          email, 
          role, 
          name 
        } 
      };
    }
  },
};
