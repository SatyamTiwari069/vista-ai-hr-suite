import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase.js';

async function seedUsers() {
  console.log('🌱 Seeding test users...');

  const testUsers = [
    {
      email: 'admin@vista.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      department: 'IT',
      position: 'System Administrator',
    },
    {
      email: 'hr@vista.com',
      password: 'hr123',
      name: 'HR Manager',
      role: 'hr',
      department: 'Human Resources',
      position: 'HR Manager',
    },
    {
      email: 'manager@vista.com',
      password: 'manager123',
      name: 'Team Manager',
      role: 'manager',
      department: 'Engineering',
      position: 'Senior Manager',
    },
    {
      email: 'employee@vista.com',
      password: 'employee123',
      name: 'John Doe',
      role: 'employee',
      department: 'Engineering',
      position: 'Software Engineer',
    },
  ];

  for (const user of testUsers) {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', user.email)
        .single();

      if (existingUser) {
        console.log(`✅ User ${user.email} already exists`);
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(user.password, salt);

      // Create user
      const { data: newUser, error } = await supabase
        .from('users')
        .insert([
          {
            email: user.email,
            name: user.name,
            password_hash: passwordHash,
            role: user.role,
            department: user.department,
            position: user.position,
            is_active: true,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error(`❌ Failed to create user ${user.email}:`, error);
        continue;
      }

      console.log(`✅ Created user: ${user.email}`);
    } catch (error) {
      console.error(`❌ Error seeding user ${user.email}:`, error);
    }
  }

  console.log('✅ Seeding complete!');
}

seedUsers().catch(console.error);
