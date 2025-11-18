import { supabase } from './supabase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper for API calls
async function apiCall(
  endpoint: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// User Management APIs
export const userService = {
  async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    if (error) throw error;
    return data;
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createUser(user: any) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateUser(id: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteUser(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async bulkImportUsers(users: any[]) {
    const { data, error } = await supabase
      .from('users')
      .insert(users)
      .select();
    if (error) throw error;
    return data;
  },

  async exportUsers(format: 'csv' | 'xlsx') {
    return apiCall(`/users/export?format=${format}`);
  },
};

// Employee Management APIs
export const employeeService = {
  async getEmployees() {
    const { data, error } = await supabase
      .from('employees')
      .select('*, users(*)');
    if (error) throw error;
    return data;
  },

  async getEmployeeById(id: string) {
    const { data, error } = await supabase
      .from('employees')
      .select('*, users(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async updateEmployee(id: string, updates: any) {
    const { data, error } = await supabase
      .from('employees')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async getTeamMembers(managerId: string) {
    const { data, error } = await supabase
      .from('employees')
      .select('*, users(*)')
      .eq('manager_id', managerId);
    if (error) throw error;
    return data;
  },
};

// Attendance APIs
export const attendanceService = {
  async clockIn(employeeId: string) {
    const { data, error } = await supabase
      .from('attendance')
      .insert([{
        employee_id: employeeId,
        date: new Date().toISOString().split('T')[0],
        clock_in: new Date().toISOString(),
        status: 'present',
      }])
      .select();
    if (error) throw error;
    return data[0];
  },

  async clockOut(attendanceId: string) {
    const { data, error } = await supabase
      .from('attendance')
      .update({ clock_out: new Date().toISOString() })
      .eq('id', attendanceId)
      .select();
    if (error) throw error;
    return data[0];
  },

  async getAttendance(employeeId: string, startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('employee_id', employeeId)
      .gte('date', startDate)
      .lte('date', endDate);
    if (error) throw error;
    return data;
  },

  async markAttendance(employeeId: string, date: string, status: string) {
    const { data, error } = await supabase
      .from('attendance')
      .upsert([{
        employee_id: employeeId,
        date,
        status,
      }])
      .select();
    if (error) throw error;
    return data[0];
  },
};

// Leave APIs
export const leaveService = {
  async applyLeave(employeeId: string, leaveData: any) {
    const { data, error } = await supabase
      .from('leaves')
      .insert([{
        employee_id: employeeId,
        ...leaveData,
        status: 'pending',
      }])
      .select();
    if (error) throw error;
    return data[0];
  },

  async getLeaves(employeeId: string) {
    const { data, error } = await supabase
      .from('leaves')
      .select('*')
      .eq('employee_id', employeeId);
    if (error) throw error;
    return data;
  },

  async getPendingLeaves(managerId: string) {
    const { data, error } = await supabase
      .from('leaves')
      .select('*, employees(*)')
      .eq('approver_id', managerId)
      .eq('status', 'pending');
    if (error) throw error;
    return data;
  },

  async approveLeave(leaveId: string) {
    const { data, error } = await supabase
      .from('leaves')
      .update({ status: 'approved' })
      .eq('id', leaveId)
      .select();
    if (error) throw error;
    return data[0];
  },

  async rejectLeave(leaveId: string) {
    const { data, error } = await supabase
      .from('leaves')
      .update({ status: 'rejected' })
      .eq('id', leaveId)
      .select();
    if (error) throw error;
    return data[0];
  },
};

// Job & Recruitment APIs
export const jobService = {
  async getJobs(status?: string) {
    let query = supabase.from('jobs').select('*');
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createJob(jobData: any) {
    const { data, error } = await supabase
      .from('jobs')
      .insert([jobData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateJob(jobId: string, updates: any) {
    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', jobId)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteJob(jobId: string) {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId);
    if (error) throw error;
  },
};

// Candidate APIs
export const candidateService = {
  async getCandidates(jobId?: string) {
    let query = supabase.from('candidates').select('*');
    if (jobId) query = query.eq('job_id', jobId);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createCandidate(candidateData: any) {
    const { data, error } = await supabase
      .from('candidates')
      .insert([candidateData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateCandidateStatus(candidateId: string, status: string) {
    const { data, error } = await supabase
      .from('candidates')
      .update({ status })
      .eq('id', candidateId)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateCandidateScore(candidateId: string, score: number) {
    const { data, error } = await supabase
      .from('candidates')
      .update({ ai_score: score })
      .eq('id', candidateId)
      .select();
    if (error) throw error;
    return data[0];
  },
};

// Performance APIs
export const performanceService = {
  async getPerformanceReviews(employeeId: string) {
    const { data, error } = await supabase
      .from('performance')
      .select('*')
      .eq('employee_id', employeeId);
    if (error) throw error;
    return data;
  },

  async createPerformanceReview(reviewData: any) {
    const { data, error } = await supabase
      .from('performance')
      .insert([reviewData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updatePerformanceReview(reviewId: string, updates: any) {
    const { data, error } = await supabase
      .from('performance')
      .update(updates)
      .eq('id', reviewId)
      .select();
    if (error) throw error;
    return data[0];
  },
};

// Announcements APIs
export const announcementService = {
  async getAnnouncements() {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createAnnouncement(announcementData: any) {
    const { data, error } = await supabase
      .from('announcements')
      .insert([announcementData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateAnnouncement(id: string, updates: any) {
    const { data, error } = await supabase
      .from('announcements')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteAnnouncement(id: string) {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Audit Logs APIs
export const auditService = {
  async getAuditLogs(filters?: any) {
    let query = supabase.from('audit_logs').select('*');
    if (filters?.user_id) query = query.eq('user_id', filters.user_id);
    if (filters?.entity_type) query = query.eq('entity_type', filters.entity_type);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async logAction(action: string, entityType: string, entityId: string, changes?: any) {
    const { data, error } = await supabase
      .from('audit_logs')
      .insert([{
        action,
        entity_type: entityType,
        entity_id: entityId,
        changes,
        created_at: new Date().toISOString(),
      }])
      .select();
    if (error) throw error;
    return data[0];
  },
};

// AI Services
export const aiService = {
  async screenResume(resumeText: string, jobDescription: string) {
    return apiCall('/ai/screen-resume', {
      method: 'POST',
      body: JSON.stringify({ resumeText, jobDescription }),
    });
  },

  async generateJobDescription(title: string, requirements: string[]) {
    return apiCall('/ai/generate-job-description', {
      method: 'POST',
      body: JSON.stringify({ title, requirements }),
    });
  },

  async getHiringInsights(jobId: string) {
    return apiCall(`/ai/hiring-insights/${jobId}`);
  },

  async analyzePerformance(employeeId: string) {
    return apiCall(`/ai/performance-analysis/${employeeId}`);
  },

  async predictBurnout(employeeId: string) {
    return apiCall(`/ai/burnout-prediction/${employeeId}`);
  },
};

export default {
  userService,
  employeeService,
  attendanceService,
  leaveService,
  jobService,
  candidateService,
  performanceService,
  announcementService,
  auditService,
  aiService,
};
