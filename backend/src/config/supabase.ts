import { createClient } from '@supabase/supabase-js';
import { config } from './env.js';

export const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey
);

export const initializeDatabase = async () => {
  try {
    console.log('✅ Supabase client initialized');
  } catch (error) {
    console.error('❌ Supabase initialization failed:', error);
    throw error;
  }
};
