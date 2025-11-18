// Environment Configuration
export const ENV = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || 'https://exkbwqxlduwjljvanmxs.supabase.co',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4a2J3cXhsZHV3amxqdmFubXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMTQxNDksImV4cCI6MjA3ODg5MDE0OX0.NkHfew4UzxY7H6bSJSVATRAlHrry7ifoKhdIn5o2E84',
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyB3eSwwpGT9nxtqKzjvMGqx8BtY8fkaits',
  
  // Feature Flags
  FEATURES: {
    AI_ENABLED: true,
    SUPABASE_ENABLED: true,
    ANALYTICS_ENABLED: true,
    ADVANCED_REPORTING_ENABLED: true,
  },

  // Default Settings
  DEFAULTS: {
    ITEMS_PER_PAGE: 20,
    TIMEOUT: 30000, // 30 seconds
    CACHE_TTL: 3600, // 1 hour
  },
};

// Validate critical configurations
export const validateConfig = () => {
  const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const missing = required.filter(key => !ENV[key as keyof typeof ENV]);
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
  }

  return missing.length === 0;
};
