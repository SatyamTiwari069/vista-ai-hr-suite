import { toast } from 'sonner';
import { UserRole } from '@/types/auth';

/**
 * Attendance & Clock Management
 */
export const attendanceUtils = {
  clockIn: async (employeeId: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/attendance/clock-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id: employeeId }),
      });
      const data = await response.json();
      toast.success('Clocked in successfully');
      return data;
    } catch (error) {
      toast.error('Failed to clock in');
      throw error;
    }
  },

  clockOut: async (attendanceId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/attendance/${attendanceId}/clock-out`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      toast.success('Clocked out successfully');
      return data;
    } catch (error) {
      toast.error('Failed to clock out');
      throw error;
    }
  },

  getAttendanceReport: async (employeeId: string, startDate: string, endDate: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/attendance?employee_id=${employeeId}&start_date=${startDate}&end_date=${endDate}`
      );
      return await response.json();
    } catch (error) {
      toast.error('Failed to fetch attendance report');
      throw error;
    }
  },
};

/**
 * Leave Management
 */
export const leaveUtils = {
  requestLeave: async (employeeId: string, startDate: string, endDate: string, reason: string, type: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/leaves/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: employeeId,
          start_date: startDate,
          end_date: endDate,
          reason,
          type,
          status: 'pending',
        }),
      });
      const data = await response.json();
      toast.success('Leave request submitted');
      return data;
    } catch (error) {
      toast.error('Failed to submit leave request');
      throw error;
    }
  },

  approveLeave: async (leaveId: string, approverId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/leaves/${leaveId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approver_id: approverId }),
      });
      const data = await response.json();
      toast.success('Leave approved');
      return data;
    } catch (error) {
      toast.error('Failed to approve leave');
      throw error;
    }
  },

  rejectLeave: async (leaveId: string, approverId: string, reason: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/leaves/${leaveId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approver_id: approverId, rejection_reason: reason }),
      });
      const data = await response.json();
      toast.success('Leave rejected');
      return data;
    } catch (error) {
      toast.error('Failed to reject leave');
      throw error;
    }
  },
};

/**
 * Employee Management
 */
export const employeeUtils = {
  createEmployee: async (employeeData: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });
      const data = await response.json();
      toast.success('Employee created successfully');
      return data;
    } catch (error) {
      toast.error('Failed to create employee');
      throw error;
    }
  },

  updateEmployee: async (employeeId: string, updates: any) => {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      toast.success('Employee updated successfully');
      return data;
    } catch (error) {
      toast.error('Failed to update employee');
      throw error;
    }
  },

  getEmployeeProfile: async (employeeId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`);
      return await response.json();
    } catch (error) {
      toast.error('Failed to fetch employee profile');
      throw error;
    }
  },

  getTeamMembers: async (managerId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/team/${managerId}`);
      return await response.json();
    } catch (error) {
      toast.error('Failed to fetch team members');
      throw error;
    }
  },
};

/**
 * Recruitment & Candidates
 */
export const recruitmentUtils = {
  uploadResume: async (formData: FormData) => {
    try {
      const response = await fetch('http://localhost:3001/api/candidates/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      toast.success('Resume uploaded successfully');
      return data;
    } catch (error) {
      toast.error('Failed to upload resume');
      throw error;
    }
  },

  screenResume: async (resumeText: string, jobRequirements: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/ai/screen-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_text: resumeText,
          job_requirements: jobRequirements,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error('Failed to screen resume');
      throw error;
    }
  },

  scheduleInterview: async (candidateId: string, interviewData: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/candidates/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate_id: candidateId,
          ...interviewData,
        }),
      });
      const data = await response.json();
      toast.success('Interview scheduled');
      return data;
    } catch (error) {
      toast.error('Failed to schedule interview');
      throw error;
    }
  },
};

/**
 * Payroll & Benefits
 */
export const payrollUtils = {
  generatePayslip: async (employeeId: string, month: string, year: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/payroll/generate-payslip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: employeeId,
          month,
          year,
        }),
      });
      const data = await response.json();
      toast.success('Payslip generated');
      return data;
    } catch (error) {
      toast.error('Failed to generate payslip');
      throw error;
    }
  },

  processBulkPayroll: async (payrollData: any[]) => {
    try {
      const response = await fetch('http://localhost:3001/api/payroll/bulk-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payroll_entries: payrollData }),
      });
      const data = await response.json();
      toast.success('Payroll processed successfully');
      return data;
    } catch (error) {
      toast.error('Failed to process payroll');
      throw error;
    }
  },

  getTaxCalculations: async (employeeId: string, annualSalary: number) => {
    try {
      const response = await fetch('http://localhost:3001/api/payroll/calculate-tax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: employeeId,
          annual_salary: annualSalary,
        }),
      });
      return await response.json();
    } catch (error) {
      toast.error('Failed to calculate tax');
      throw error;
    }
  },
};

/**
 * Performance Management
 */
export const performanceUtils = {
  submitPerformanceReview: async (employeeId: string, reviewData: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/payroll/performance-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: employeeId,
          ...reviewData,
        }),
      });
      const data = await response.json();
      toast.success('Performance review submitted');
      return data;
    } catch (error) {
      toast.error('Failed to submit performance review');
      throw error;
    }
  },

  getPerformanceMetrics: async (employeeId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/payroll/performance/${employeeId}`);
      return await response.json();
    } catch (error) {
      toast.error('Failed to fetch performance metrics');
      throw error;
    }
  },

  generatePerformanceReport: async (departmentId: string, period: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/payroll/performance-report?department_id=${departmentId}&period=${period}`
      );
      return await response.json();
    } catch (error) {
      toast.error('Failed to generate performance report');
      throw error;
    }
  },
};

/**
 * Training & Development
 */
export const trainingUtils = {
  enrollInCourse: async (employeeId: string, courseId: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/payroll/enroll-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: employeeId,
          course_id: courseId,
        }),
      });
      const data = await response.json();
      toast.success('Enrolled in course successfully');
      return data;
    } catch (error) {
      toast.error('Failed to enroll in course');
      throw error;
    }
  },

  completeCourse: async (enrollmentId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/payroll/complete-course`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollment_id: enrollmentId }),
      });
      const data = await response.json();
      toast.success('Course marked as complete');
      return data;
    } catch (error) {
      toast.error('Failed to complete course');
      throw error;
    }
  },
};

/**
 * User Management
 */
export const userUtils = {
  createUser: async (userData: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      toast.success('User created successfully');
      return data;
    } catch (error) {
      toast.error('Failed to create user');
      throw error;
    }
  },

  updateUser: async (userId: string, updates: any) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      toast.success('User updated successfully');
      return data;
    } catch (error) {
      toast.error('Failed to update user');
      throw error;
    }
  },

  deleteUser: async (userId: string) => {
    try {
      await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'DELETE',
      });
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
      throw error;
    }
  },

  resetPassword: async (userId: string, newPassword: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_password: newPassword }),
      });
      const data = await response.json();
      toast.success('Password reset successfully');
      return data;
    } catch (error) {
      toast.error('Failed to reset password');
      throw error;
    }
  },
};

/**
 * Organization Management
 */
export const organizationUtils = {
  createDepartment: async (departmentData: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/employees/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(departmentData),
      });
      const data = await response.json();
      toast.success('Department created');
      return data;
    } catch (error) {
      toast.error('Failed to create department');
      throw error;
    }
  },

  updateDepartment: async (departmentId: string, updates: any) => {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/departments/${departmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      toast.success('Department updated');
      return data;
    } catch (error) {
      toast.error('Failed to update department');
      throw error;
    }
  },

  getDepartments: async () => {
    try {
      const response = await fetch('http://localhost:3001/api/employees/departments');
      return await response.json();
    } catch (error) {
      toast.error('Failed to fetch departments');
      throw error;
    }
  },
};

/**
 * Job Management
 */
export const jobUtils = {
  postJob: async (jobData: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });
      const data = await response.json();
      toast.success('Job posted successfully');
      return data;
    } catch (error) {
      toast.error('Failed to post job');
      throw error;
    }
  },

  closeJob: async (jobId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${jobId}/close`, {
        method: 'POST',
      });
      const data = await response.json();
      toast.success('Job closed');
      return data;
    } catch (error) {
      toast.error('Failed to close job');
      throw error;
    }
  },

  getJobApplications: async (jobId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${jobId}/applications`);
      return await response.json();
    } catch (error) {
      toast.error('Failed to fetch applications');
      throw error;
    }
  },
};

/**
 * Goals & Recognition
 */
export const goalsUtils = {
  setGoal: async (employeeId: string, goalData: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/payroll/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: employeeId,
          ...goalData,
        }),
      });
      const data = await response.json();
      toast.success('Goal set successfully');
      return data;
    } catch (error) {
      toast.error('Failed to set goal');
      throw error;
    }
  },

  updateGoal: async (goalId: string, updates: any) => {
    try {
      const response = await fetch(`http://localhost:3001/api/payroll/goals/${goalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      toast.success('Goal updated');
      return data;
    } catch (error) {
      toast.error('Failed to update goal');
      throw error;
    }
  },

  recognizeEmployee: async (employeeId: string, recognitionData: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/payroll/recognize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: employeeId,
          ...recognitionData,
        }),
      });
      const data = await response.json();
      toast.success('Recognition added');
      return data;
    } catch (error) {
      toast.error('Failed to add recognition');
      throw error;
    }
  },
};

/**
 * Analytics & Reporting
 */
export const reportingUtils = {
  generateCustomReport: async (filters: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/payroll/reports/custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      });
      return await response.json();
    } catch (error) {
      toast.error('Failed to generate report');
      throw error;
    }
  },

  exportReport: async (reportId: string, format: 'csv' | 'pdf' | 'xlsx') => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/payroll/reports/${reportId}/export?format=${format}`
      );
      return await response.blob();
    } catch (error) {
      toast.error('Failed to export report');
      throw error;
    }
  },

  getDashboardMetrics: async (role: UserRole) => {
    try {
      const response = await fetch(`http://localhost:3001/api/payroll/metrics?role=${role}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch metrics');
      return null;
    }
  },
};

export default {
  attendanceUtils,
  leaveUtils,
  employeeUtils,
  recruitmentUtils,
  payrollUtils,
  performanceUtils,
  trainingUtils,
  userUtils,
  organizationUtils,
  jobUtils,
  goalsUtils,
  reportingUtils,
};
