import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config/env.js';
import { supabase } from '../config/supabase.js';

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
  },

  async registerUser(email: string, password: string, name: string, role: string = 'employee') {
    const hashedPassword = await this.hashPassword(password);

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
  },
};
