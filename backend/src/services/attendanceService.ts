import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';

const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);

export const attendanceService = {
  async clockIn(userId: string, location?: string) {
    const { data, error } = await supabase
      .from('attendance')
      .insert([
        {
          user_id: userId,
          clock_in: new Date().toISOString(),
          location,
          status: 'present',
        },
      ])
      .select();
    if (error) throw error;
    return data[0];
  },

  async clockOut(userId: string, attendanceId: string) {
    const { data, error } = await supabase
      .from('attendance')
      .update({ clock_out: new Date().toISOString() })
      .eq('id', attendanceId)
      .select();
    if (error) throw error;
    return data[0];
  },

  async getAttendanceRecords(userId: string, startDate?: string, endDate?: string) {
    let query = supabase.from('attendance').select('*').eq('user_id', userId);

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    query = query.order('date', { ascending: false });
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getDepartmentAttendance(departmentId: string, date: string) {
    const { data, error } = await supabase
      .from('attendance')
      .select('*, users!inner(*)')
      .eq('users.department_id', departmentId)
      .eq('date', date);
    if (error) throw error;
    return data;
  },

  async markAttendance(userId: string, date: string, status: 'present' | 'absent' | 'leave') {
    const { data, error } = await supabase
      .from('attendance')
      .upsert(
        [
          {
            user_id: userId,
            date,
            status,
          },
        ],
        { onConflict: 'user_id,date' }
      )
      .select();
    if (error) throw error;
    return data[0];
  },

  async getMonthlyAttendanceStats(userId: string, year: number, month: number) {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate);

    if (error) throw error;

    const stats = {
      totalDays: data?.length || 0,
      presentDays: data?.filter((d: any) => d.status === 'present').length || 0,
      absentDays: data?.filter((d: any) => d.status === 'absent').length || 0,
      leaveDays: data?.filter((d: any) => d.status === 'leave').length || 0,
      attendanceRate: 0,
    };

    stats.attendanceRate = stats.totalDays > 0 ? (stats.presentDays / stats.totalDays) * 100 : 0;
    return stats;
  },
};

export const leaveService = {
  async applyLeave(userId: string, leave: any) {
    const { data, error } = await supabase
      .from('leaves')
      .insert([
        {
          user_id: userId,
          leave_type: leave.leaveType,
          start_date: leave.startDate,
          end_date: leave.endDate,
          reason: leave.reason,
          status: 'pending',
          document_url: leave.documentUrl,
        },
      ])
      .select();
    if (error) throw error;
    return data[0];
  },

  async approveLeave(leaveId: string, approverId: string, comments?: string) {
    const { data, error } = await supabase
      .from('leaves')
      .update({
        status: 'approved',
        approved_by: approverId,
        approved_at: new Date().toISOString(),
        comments,
      })
      .eq('id', leaveId)
      .select();
    if (error) throw error;
    return data[0];
  },

  async rejectLeave(leaveId: string, reason: string) {
    const { data, error } = await supabase
      .from('leaves')
      .update({
        status: 'rejected',
        rejected_reason: reason,
        updated_at: new Date().toISOString(),
      })
      .eq('id', leaveId)
      .select();
    if (error) throw error;
    return data[0];
  },

  async getLeaveBalance(userId: string) {
    const { data, error } = await supabase
      .from('leave_balances')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return (
      data || {
        user_id: userId,
        casual: 12,
        sick: 10,
        personal: 5,
        maternity: 0,
      }
    );
  },

  async getUserLeaves(userId: string, filters?: any) {
    let query = supabase.from('leaves').select('*').eq('user_id', userId);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.year) {
      query = query.gte('start_date', `${filters.year}-01-01`).lte('start_date', `${filters.year}-12-31`);
    }

    query = query.order('start_date', { ascending: false });
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getPendingLeaves(departmentId?: string) {
    let query = supabase.from('leaves').select('*, users(*)', { count: 'exact' }).eq('status', 'pending');

    if (departmentId) {
      query = query.eq('users.department_id', departmentId);
    }

    query = query.order('created_at', { ascending: true });
    const { data, count, error } = await query;
    if (error) throw error;
    return { data, count };
  },

  async getLeaveHistory(userId: string) {
    const { data, error } = await supabase
      .from('leaves')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['approved', 'rejected'])
      .order('start_date', { ascending: false });
    if (error) throw error;
    return data;
  },
};
