import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';

const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);

export const payrollService = {
  async getPayrollData(userId: string) {
    const { data, error } = await supabase
      .from('payroll')
      .select('*')
      .eq('user_id', userId)
      .order('month', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getPayslip(userId: string, month: number, year: number) {
    const { data, error } = await supabase
      .from('payroll')
      .select('*')
      .eq('user_id', userId)
      .eq('month', month)
      .eq('year', year)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return (
      data || {
        user_id: userId,
        month,
        year,
        baseSalary: 0,
        allowances: 0,
        deductions: 0,
        netSalary: 0,
        generateDate: new Date().toISOString(),
      }
    );
  },

  async processPayroll(month: number, year: number) {
    // Get all employees
    const { data: employees, error: empError } = await supabase
      .from('users')
      .select('id, salary')
      .eq('role', 'employee');
    if (empError) throw empError;

    const payrollRecords = employees?.map((emp: any) => ({
      user_id: emp.id,
      month,
      year,
      baseSalary: emp.salary || 0,
      allowances: Math.round((emp.salary || 0) * 0.1),
      deductions: Math.round((emp.salary || 0) * 0.15),
      netSalary: Math.round((emp.salary || 0) * 0.95),
      status: 'processed',
      generated_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from('payroll')
      .upsert(payrollRecords || [], { onConflict: 'user_id,month,year' })
      .select();
    if (error) throw error;
    return data;
  },

  async getPayrollSummary(filters?: any) {
    let query = supabase.from('payroll').select('*');

    if (filters?.month) {
      query = query.eq('month', filters.month);
    }
    if (filters?.year) {
      query = query.eq('year', filters.year);
    }

    const { data, error } = await query;
    if (error) throw error;

    return {
      totalEmployees: data?.length || 0,
      totalPayroll: data?.reduce((sum: number, p: any) => sum + (p.netSalary || 0), 0) || 0,
      averageSalary: data ? Math.round((data.reduce((sum: number, p: any) => sum + (p.netSalary || 0), 0) || 0) / data.length) : 0,
      records: data,
    };
  },
};

export const performanceService = {
  async getPerformanceReview(userId: string) {
    const { data, error } = await supabase
      .from('performance_reviews')
      .select('*')
      .eq('user_id', userId)
      .order('review_date', { ascending: false })
      .limit(1)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async createPerformanceReview(review: any) {
    const { data, error } = await supabase
      .from('performance_reviews')
      .insert([
        {
          user_id: review.userId,
          reviewer_id: review.reviewerId,
          rating: review.rating,
          feedback: review.feedback,
          goals: review.goals,
          review_date: new Date().toISOString(),
          status: 'completed',
        },
      ])
      .select();
    if (error) throw error;
    return data[0];
  },

  async getTeamPerformance(departmentId: string) {
    const { data, error } = await supabase
      .from('performance_reviews')
      .select('*, users!inner(*)')
      .eq('users.department_id', departmentId)
      .order('review_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getPerformanceMetrics() {
    const { data, error } = await supabase
      .from('performance_reviews')
      .select('rating');
    if (error) throw error;

    const ratings = (data || []).map((r: any) => r.rating || 0);
    const avgRating = ratings.length > 0 ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10 : 0;

    return {
      averageRating: avgRating,
      totalReviews: data?.length || 0,
      excellentPerformers: data?.filter((r: any) => r.rating >= 4.5).length || 0,
      needsImprovement: data?.filter((r: any) => r.rating < 3).length || 0,
    };
  },

  async setPerformanceGoals(userId: string, goals: string[]) {
    const { data, error } = await supabase
      .from('performance_goals')
      .upsert(
        [
          {
            user_id: userId,
            goals,
            set_date: new Date().toISOString(),
            status: 'active',
          },
        ],
        { onConflict: 'user_id' }
      )
      .select();
    if (error) throw error;
    return data[0];
  },

  async getPerformanceHistory(userId: string) {
    const { data, error } = await supabase
      .from('performance_reviews')
      .select('*')
      .eq('user_id', userId)
      .order('review_date', { ascending: false });
    if (error) throw error;
    return data;
  },
};

export const trainingService = {
  async getTrainingPrograms(filters?: any) {
    let query = supabase.from('training_programs').select('*');

    if (filters?.department) {
      query = query.eq('department', filters.department);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    query = query.order('start_date', { ascending: true });
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async enrollInTraining(userId: string, trainingId: string) {
    const { data, error } = await supabase
      .from('training_enrollments')
      .insert([
        {
          user_id: userId,
          training_id: trainingId,
          enrolled_date: new Date().toISOString(),
          status: 'enrolled',
        },
      ])
      .select();
    if (error) throw error;
    return data[0];
  },

  async getEmployeeTraining(userId: string) {
    const { data, error } = await supabase
      .from('training_enrollments')
      .select('*, training_programs(*)')
      .eq('user_id', userId)
      .order('enrolled_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async completeTraining(enrollmentId: string, certificateUrl?: string) {
    const { data, error } = await supabase
      .from('training_enrollments')
      .update({
        status: 'completed',
        completed_date: new Date().toISOString(),
        certificate_url: certificateUrl,
      })
      .eq('id', enrollmentId)
      .select();
    if (error) throw error;
    return data[0];
  },

  async getTrainingMetrics(departmentId?: string) {
    let query = supabase.from('training_enrollments').select('status', { count: 'exact' });

    if (departmentId) {
      query = query.eq('training_programs.department', departmentId);
    }

    const { data: enrollments, error } = await query;
    if (error) throw error;

    return {
      totalEnrollments: enrollments?.length || 0,
      completedTrainings: enrollments?.filter((e: any) => e.status === 'completed').length || 0,
      inProgressTrainings: enrollments?.filter((e: any) => e.status === 'in_progress').length || 0,
      enrolledTrainings: enrollments?.filter((e: any) => e.status === 'enrolled').length || 0,
    };
  },
};
