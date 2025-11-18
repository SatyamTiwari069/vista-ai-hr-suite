import { createClient } from '@supabase/supabase-js';
import { config } from './env.js';

// Create client with valid URL and key, or with placeholders if not configured
// The services will handle the errors and use mock data
const supabaseUrl = config.supabase.url || 'https://placeholder.supabase.co';
const supabaseKey = config.supabase.serviceRoleKey || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const initializeDatabase = async () => {
  try {
    if (!config.supabase.url || !config.supabase.serviceRoleKey) {
      console.log('⚠️  Supabase credentials not configured. Using mock data.');
      console.log('   To use real database, set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
    } else {
      console.log('✅ Supabase client initialized');
    }
  } catch (error) {
    console.error('❌ Supabase initialization failed:', error);
    throw error;
  }
};

