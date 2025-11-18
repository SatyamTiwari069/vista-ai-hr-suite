const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get JWT token from localStorage
function getToken(): string | null {
  return localStorage.getItem('vista_token');
}

// Helper for API calls with JWT authentication
async function apiCall(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle unauthorized access
  if (response.status === 401) {
    localStorage.removeItem('vista_token');
    localStorage.removeItem('vista_user');
    window.location.href = '/login';
    throw new Error('Unauthorized - please login');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error: ${response.statusText}`);
  }

  return response.json();
}

// User Management APIs
export const userService = {
  async getUsers() {
    return apiCall('/users');
  },

  async getUserById(id: string) {
    return apiCall(`/users/${id}`);
  },

  async createUser(user: any) {
    return apiCall('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },

  async updateUser(id: string, updates: any) {
    return apiCall(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteUser(id: string) {
    return apiCall(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  async bulkImportUsers(users: any[]) {
    return apiCall('/users/bulk', {
      method: 'POST',
      body: JSON.stringify({ users }),
    });
  },

  async exportUsers(format: 'csv' | 'xlsx') {
    return apiCall(`/users/export?format=${format}`);
  },
};

// Employee Management APIs
export const employeeService = {
  async getEmployees() {
    return apiCall('/employees');
  },

  async getEmployeeById(id: string) {
    return apiCall(`/employees/${id}`);
  },

  async createEmployee(employee: any) {
    return apiCall('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  },

  async updateEmployee(id: string, updates: any) {
    return apiCall(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteEmployee(id: string) {
    return apiCall(`/employees/${id}`, {
      method: 'DELETE',
    });
  },

  async getTeamMembers(managerId: string) {
    return apiCall(`/employees/team/${managerId}`);
  },
};

// Attendance APIs
export const attendanceService = {
  async clockIn(employeeId: string) {
    return apiCall('/attendance/clock-in', {
      method: 'POST',
      body: JSON.stringify({ 
        employeeId,
        timestamp: new Date().toISOString() 
      }),
    });
  },

  async clockOut(attendanceId: string) {
    return apiCall(`/attendance/${attendanceId}/clock-out`, {
      method: 'POST',
      body: JSON.stringify({ timestamp: new Date().toISOString() }),
    });
  },

  async getAttendance(employeeId: string, startDate: string, endDate: string) {
    return apiCall(`/attendance?employeeId=${employeeId}&startDate=${startDate}&endDate=${endDate}`);
  },

  async markAttendance(employeeId: string, date: string, status: string) {
    return apiCall('/attendance', {
      method: 'POST',
      body: JSON.stringify({ employeeId, date, status }),
    });
  },
};

// Leave APIs
export const leaveService = {
  async applyLeave(employeeId: string, leaveData: any) {
    return apiCall('/leaves', {
      method: 'POST',
      body: JSON.stringify({ employeeId, ...leaveData }),
    });
  },

  async getLeaves(employeeId: string) {
    return apiCall(`/leaves?employeeId=${employeeId}`);
  },

  async getPendingLeaves(managerId: string) {
    return apiCall(`/leaves/pending?managerId=${managerId}`);
  },

  async approveLeave(leaveId: string) {
    return apiCall(`/leaves/${leaveId}/approve`, {
      method: 'POST',
    });
  },

  async rejectLeave(leaveId: string, reason: string) {
    return apiCall(`/leaves/${leaveId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },
};

// Job & Recruitment APIs
export const jobService = {
  async getJobs(status?: string) {
    const query = status ? `?status=${status}` : '';
    return apiCall(`/jobs${query}`);
  },

  async getJobById(id: string) {
    return apiCall(`/jobs/${id}`);
  },

  async createJob(jobData: any) {
    return apiCall('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },

  async updateJob(jobId: string, updates: any) {
    return apiCall(`/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteJob(jobId: string) {
    return apiCall(`/jobs/${jobId}`, {
      method: 'DELETE',
    });
  },
};

// Candidate APIs
export const candidateService = {
  async getCandidates(jobId?: string) {
    const query = jobId ? `?jobId=${jobId}` : '';
    return apiCall(`/candidates${query}`);
  },

  async getCandidateById(id: string) {
    return apiCall(`/candidates/${id}`);
  },

  async createCandidate(candidateData: any) {
    return apiCall('/candidates', {
      method: 'POST',
      body: JSON.stringify(candidateData),
    });
  },

  async updateCandidate(id: string, updates: any) {
    return apiCall(`/candidates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async uploadResume(candidateId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = getToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/candidates/${candidateId}/resume`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Resume upload failed');
    }

    return response.json();
  },

  async updateCandidateStatus(candidateId: string, status: string) {
    return apiCall(`/candidates/${candidateId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  async updateCandidateScore(candidateId: string, score: number) {
    return apiCall(`/candidates/${candidateId}`, {
      method: 'PUT',
      body: JSON.stringify({ aiScore: score }),
    });
  },
};

// Performance APIs
export const performanceService = {
  async getPerformanceReviews(employeeId: string) {
    return apiCall(`/performance?employeeId=${employeeId}`);
  },

  async getPerformanceById(id: string) {
    return apiCall(`/performance/${id}`);
  },

  async createPerformanceReview(reviewData: any) {
    return apiCall('/performance', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  async updatePerformanceReview(reviewId: string, updates: any) {
    return apiCall(`/performance/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
};

// Announcements APIs
export const announcementService = {
  async getAnnouncements() {
    return apiCall('/announcements');
  },

  async createAnnouncement(announcementData: any) {
    return apiCall('/announcements', {
      method: 'POST',
      body: JSON.stringify(announcementData),
    });
  },

  async updateAnnouncement(id: string, updates: any) {
    return apiCall(`/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteAnnouncement(id: string) {
    return apiCall(`/announcements/${id}`, {
      method: 'DELETE',
    });
  },
};

// Audit Logs APIs
export const auditService = {
  async getAuditLogs(filters?: any) {
    let query = '/audit-logs';
    const params = new URLSearchParams();
    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.entityType) params.append('entityType', filters.entityType);
    if (params.toString()) query += `?${params.toString()}`;
    return apiCall(query);
  },

  async logAction(action: string, entityType: string, entityId: string, changes?: any) {
    return apiCall('/audit-logs', {
      method: 'POST',
      body: JSON.stringify({ action, entityType, entityId, changes }),
    });
  },
};

// AI Services - REAL Gemini Integration via Backend
export const aiService = {
  async screenResume(resumeText: string, jobDescription: string, candidateName: string) {
    return apiCall('/ai/screen-resume', {
      method: 'POST',
      body: JSON.stringify({ resumeText, jobDescription, candidateName }),
    });
  },

  async generateJobDescription(jobTitle: string, departmentContext: string) {
    return apiCall('/ai/generate-job-desc', {
      method: 'POST',
      body: JSON.stringify({ jobTitle, departmentContext }),
    });
  },

  async hrChat(query: string) {
    return apiCall('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  },

  async generateInterviewPrep(candidateBackground: string, jobRole: string) {
    return apiCall('/ai/interview-prep', {
      method: 'POST',
      body: JSON.stringify({ candidateBackground, jobRole }),
    });
  },

  async analyzePerformance(reviewContent: string) {
    return apiCall('/ai/analyze-performance', {
      method: 'POST',
      body: JSON.stringify({ reviewContent }),
    });
  },

  async getTrainingRecommendations(employeeProfile: string) {
    return apiCall('/ai/training-recommendations', {
      method: 'POST',
      body: JSON.stringify({ employeeProfile }),
    });
  },

  async nlpQuery(query: string) {
    return apiCall('/ai/nlp-query', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  },

  async getHiringInsights(jobId: string) {
    return apiCall(`/ai/hiring-insights/${jobId}`);
  },

  async predictBurnout(employeeId: string) {
    return apiCall(`/ai/burnout-prediction/${employeeId}`);
  },

  async checkHealth() {
    return apiCall('/ai/health');
  },
};

// Payroll APIs
export const payrollService = {
  async getPayroll(userId?: string) {
    const query = userId ? `?userId=${userId}` : '';
    return apiCall(`/payroll${query}`);
  },

  async calculatePayroll(userId: string, month: number, year: number) {
    return apiCall('/payroll/calculate', {
      method: 'POST',
      body: JSON.stringify({ userId, month, year }),
    });
  },

  async generatePayslip(userId: string, month: number, year: number) {
    return apiCall(`/payroll/${userId}/${month}/${year}/slip`);
  },
};

// File Upload/Download APIs
export const fileService = {
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const token = getToken();
    const headers: Record<string, string> = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/uploads/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (response.status === 401) {
      localStorage.removeItem('vista_token');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  },

  async downloadFile(filename: string) {
    const token = getToken();
    const headers: Record<string, string> = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/uploads/download/${filename}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    return response.blob();
  },

  async listFiles() {
    return apiCall('/uploads/list');
  },

  async deleteFile(filename: string) {
    return apiCall(`/uploads/${filename}`, {
      method: 'DELETE',
    });
  },
};

// Interview APIs
export const interviewService = {
  async scheduleInterview(interviewData: any) {
    return apiCall('/interviews', {
      method: 'POST',
      body: JSON.stringify(interviewData),
    });
  },

  async getInterviews(jobId?: string) {
    const query = jobId ? `?jobId=${jobId}` : '';
    return apiCall(`/interviews${query}`);
  },

  async getCandidateInterviews(candidateId: string) {
    return apiCall(`/interviews/candidate/${candidateId}`);
  },

  async getInterviewerSchedule(interviewerId: string, startDate?: string, endDate?: string) {
    let query = `?`;
    if (startDate) query += `startDate=${startDate}&`;
    if (endDate) query += `endDate=${endDate}`;
    return apiCall(`/interviews/schedule/${interviewerId}${query.endsWith('?') ? '' : query}`);
  },

  async getUpcomingInterviews(days?: number) {
    const query = days ? `?days=${days}` : '';
    return apiCall(`/interviews/upcoming${query}`);
  },

  async updateInterviewStatus(interviewId: string, status: string, result?: string) {
    return apiCall(`/interviews/${interviewId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, result }),
    });
  },

  async rescheduleInterview(interviewId: string, newDate: string, newTime: string) {
    return apiCall(`/interviews/${interviewId}/reschedule`, {
      method: 'PUT',
      body: JSON.stringify({ newDate, newTime }),
    });
  },

  async addFeedback(interviewId: string, feedback: any) {
    return apiCall(`/interviews/${interviewId}/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  },

  async getFeedback(interviewId: string) {
    return apiCall(`/interviews/${interviewId}/feedback`);
  },

  async cancelInterview(interviewId: string, reason?: string) {
    return apiCall(`/interviews/${interviewId}`, {
      method: 'DELETE',
      body: JSON.stringify({ reason }),
    });
  },

  async getStats(jobId?: string) {
    const query = jobId ? `?jobId=${jobId}` : '';
    return apiCall(`/interviews/stats${query}`);
  },
};

// Document & Download APIs
export const documentService = {
  async downloadSalarySlip(userId: string, month: number, year: number) {
    const link = document.createElement('a');
    link.href = `${API_BASE_URL}/documents/salary-slip/${userId}/${month}/${year}`;
    const token = getToken();
    if (token) {
      link.setAttribute('Authorization', `Bearer ${token}`);
    }
    link.download = `salary-slip-${month}-${year}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  async downloadResume(candidateId: string) {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/documents/resume/${candidateId}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });

    if (!response.ok) throw new Error('Failed to download resume');

    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `resume-${candidateId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  async downloadAttendanceReport(userId?: string, startDate?: string, endDate?: string) {
    let query = `?`;
    if (userId) query += `userId=${userId}&`;
    if (startDate) query += `startDate=${startDate}&`;
    if (endDate) query += `endDate=${endDate}`;

    const link = document.createElement('a');
    link.href = `${API_BASE_URL}/documents/attendance-report${query.endsWith('?') ? '' : query}`;
    const token = getToken();
    if (token) {
      link.setAttribute('Authorization', `Bearer ${token}`);
    }
    link.download = `attendance-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  async downloadEmployeeReport(departmentId?: string) {
    const query = departmentId ? `?departmentId=${departmentId}` : '';
    const link = document.createElement('a');
    link.href = `${API_BASE_URL}/documents/employee-report${query}`;
    const token = getToken();
    if (token) {
      link.setAttribute('Authorization', `Bearer ${token}`);
    }
    link.download = `employee-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  async downloadLeaveReport(userId?: string) {
    const query = userId ? `?userId=${userId}` : '';
    const link = document.createElement('a');
    link.href = `${API_BASE_URL}/documents/leave-report${query}`;
    const token = getToken();
    if (token) {
      link.setAttribute('Authorization', `Bearer ${token}`);
    }
    link.download = `leave-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  async downloadPerformanceReport(userId?: string, departmentId?: string) {
    let query = `?`;
    if (userId) query += `userId=${userId}&`;
    if (departmentId) query += `departmentId=${departmentId}`;

    const link = document.createElement('a');
    link.href = `${API_BASE_URL}/documents/performance-report${query.endsWith('?') ? '' : query}`;
    const token = getToken();
    if (token) {
      link.setAttribute('Authorization', `Bearer ${token}`);
    }
    link.download = `performance-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  async downloadPayrollReport(month: number, year: number) {
    const link = document.createElement('a');
    link.href = `${API_BASE_URL}/documents/payroll-report/${month}/${year}`;
    const token = getToken();
    if (token) {
      link.setAttribute('Authorization', `Bearer ${token}`);
    }
    link.download = `payroll-report-${month}-${year}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  async downloadRecruitmentReport(jobId?: string) {
    const query = jobId ? `?jobId=${jobId}` : '';
    const link = document.createElement('a');
    link.href = `${API_BASE_URL}/documents/recruitment-report${query}`;
    const token = getToken();
    if (token) {
      link.setAttribute('Authorization', `Bearer ${token}`);
    }
    link.download = `recruitment-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  payrollService,
  fileService,
  interviewService,
  documentService,
};
