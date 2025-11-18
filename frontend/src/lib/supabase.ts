import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://exkbwqxlduwjljvanmxs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4a2J3cXhsZHV3amxqdmFubXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMTQxNDksImV4cCI6MjA3ODg5MDE0OX0.NkHfew4UzxY7H6bSJSVATRAlHrry7ifoKhdIn5o2E84';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'hr' | 'manager' | 'employee';
          department?: string;
          position?: string;
          avatar?: string;
          created_at: string;
        };
      };
      employees: {
        Row: {
          id: string;
          user_id: string;
          employee_id: string;
          joining_date: string;
          department: string;
          position: string;
          manager_id?: string;
          salary?: number;
          status: 'active' | 'inactive' | 'on_leave';
          created_at: string;
        };
      };
      attendance: {
        Row: {
          id: string;
          employee_id: string;
          date: string;
          clock_in: string;
          clock_out?: string;
          status: 'present' | 'absent' | 'on_leave' | 'half_day';
          notes?: string;
          created_at: string;
        };
      };
      leaves: {
        Row: {
          id: string;
          employee_id: string;
          leave_type: string;
          start_date: string;
          end_date: string;
          status: 'pending' | 'approved' | 'rejected' | 'cancelled';
          reason: string;
          approver_id?: string;
          created_at: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          description: string;
          department: string;
          salary_range?: string;
          status: 'open' | 'closed' | 'filled';
          created_by: string;
          created_at: string;
        };
      };
      candidates: {
        Row: {
          id: string;
          job_id: string;
          name: string;
          email: string;
          phone?: string;
          resume_url?: string;
          resume_text?: string;
          ai_score?: number;
          status: 'applied' | 'shortlisted' | 'interview' | 'rejected' | 'hired';
          created_at: string;
        };
      };
      performance: {
        Row: {
          id: string;
          employee_id: string;
          period: string;
          rating: number;
          feedback: string;
          reviewed_by: string;
          created_at: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          created_by: string;
          visibility: 'all' | 'department' | 'role' | 'specific';
          created_at: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          entity_type: string;
          entity_id: string;
          changes?: Record<string, any>;
          ip_address?: string;
          created_at: string;
        };
      };
    };
  };
};
