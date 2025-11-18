/**
 * Comprehensive action handlers for all button functions
 * This file contains all business logic for button clicks across the application
 */

import { interviewService, documentService, fileService, payrollService, leaveService, employeeService, candidateService, attendanceService, aiService } from './api';

// Interview Scheduling Actions
export const interviewActions = {
  async scheduleInterview(data: any) {
    try {
      const interview = await interviewService.scheduleInterview(data);
      console.log('Interview scheduled:', interview);
      return interview;
    } catch (error: any) {
      console.error('Failed to schedule interview:', error);
      throw error;
    }
  },

  async rescheduleInterview(interviewId: string, newDate: string, newTime: string) {
    try {
      const interview = await interviewService.rescheduleInterview(interviewId, newDate, newTime);
      return interview;
    } catch (error: any) {
      console.error('Failed to reschedule interview:', error);
      throw error;
    }
  },

  async cancelInterview(interviewId: string, reason?: string) {
    try {
      const interview = await interviewService.cancelInterview(interviewId, reason);
      return interview;
    } catch (error: any) {
      console.error('Failed to cancel interview:', error);
      throw error;
    }
  },

  async updateInterviewStatus(interviewId: string, status: string, result?: string) {
    try {
      const interview = await interviewService.updateInterviewStatus(interviewId, status, result);
      return interview;
    } catch (error: any) {
      console.error('Failed to update interview:', error);
      throw error;
    }
  },

  async addFeedback(interviewId: string, feedback: any) {
    try {
      const result = await interviewService.addFeedback(interviewId, feedback);
      return result;
    } catch (error: any) {
      console.error('Failed to add feedback:', error);
      throw error;
    }
  },

  async getUpcomingInterviews() {
    try {
      const interviews = await interviewService.getUpcomingInterviews();
      return interviews;
    } catch (error: any) {
      console.error('Failed to get interviews:', error);
      throw error;
    }
  },
};

// Document Download Actions
export const documentActions = {
  async downloadSalarySlip(userId: string, month: number, year: number) {
    try {
      await documentService.downloadSalarySlip(userId, month, year);
    } catch (error: any) {
      console.error('Failed to download salary slip:', error);
      throw error;
    }
  },

  async downloadResume(candidateId: string) {
    try {
      await documentService.downloadResume(candidateId);
    } catch (error: any) {
      console.error('Failed to download resume:', error);
      throw error;
    }
  },

  async downloadAttendanceReport(userId?: string, startDate?: string, endDate?: string) {
    try {
      await documentService.downloadAttendanceReport(userId, startDate, endDate);
    } catch (error: any) {
      console.error('Failed to download attendance report:', error);
      throw error;
    }
  },

  async downloadEmployeeReport(departmentId?: string) {
    try {
      await documentService.downloadEmployeeReport(departmentId);
    } catch (error: any) {
      console.error('Failed to download employee report:', error);
      throw error;
    }
  },

  async downloadLeaveReport(userId?: string) {
    try {
      await documentService.downloadLeaveReport(userId);
    } catch (error: any) {
      console.error('Failed to download leave report:', error);
      throw error;
    }
  },

  async downloadPerformanceReport(userId?: string, departmentId?: string) {
    try {
      await documentService.downloadPerformanceReport(userId, departmentId);
    } catch (error: any) {
      console.error('Failed to download performance report:', error);
      throw error;
    }
  },

  async downloadPayrollReport(month: number, year: number) {
    try {
      await documentService.downloadPayrollReport(month, year);
    } catch (error: any) {
      console.error('Failed to download payroll report:', error);
      throw error;
    }
  },

  async downloadRecruitmentReport(jobId?: string) {
    try {
      await documentService.downloadRecruitmentReport(jobId);
    } catch (error: any) {
      console.error('Failed to download recruitment report:', error);
      throw error;
    }
  },
};

// File Upload/Download Actions
export const fileActions = {
  async uploadFile(file: File) {
    try {
      const result = await fileService.uploadFile(file);
      return result;
    } catch (error: any) {
      console.error('Failed to upload file:', error);
      throw error;
    }
  },

  async downloadFile(filename: string) {
    try {
      const blob = await fileService.downloadFile(filename);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      console.error('Failed to download file:', error);
      throw error;
    }
  },

  async deleteFile(filename: string) {
    try {
      await fileService.deleteFile(filename);
    } catch (error: any) {
      console.error('Failed to delete file:', error);
      throw error;
    }
  },

  async listFiles() {
    try {
      return await fileService.listFiles();
    } catch (error: any) {
      console.error('Failed to list files:', error);
      throw error;
    }
  },
};

// Leave Management Actions
export const leaveActions = {
  async applyLeave(employeeId: string, leaveData: any) {
    try {
      const result = await leaveService.applyLeave(employeeId, leaveData);
      return result;
    } catch (error: any) {
      console.error('Failed to apply leave:', error);
      throw error;
    }
  },

  async approveLeave(leaveId: string) {
    try {
      const result = await leaveService.approveLeave(leaveId);
      return result;
    } catch (error: any) {
      console.error('Failed to approve leave:', error);
      throw error;
    }
  },

  async rejectLeave(leaveId: string, reason: string) {
    try {
      const result = await leaveService.rejectLeave(leaveId, reason);
      return result;
    } catch (error: any) {
      console.error('Failed to reject leave:', error);
      throw error;
    }
  },

  async getLeaves(employeeId: string) {
    try {
      return await leaveService.getLeaves(employeeId);
    } catch (error: any) {
      console.error('Failed to fetch leaves:', error);
      throw error;
    }
  },

  async getPendingLeaves(managerId: string) {
    try {
      return await leaveService.getPendingLeaves(managerId);
    } catch (error: any) {
      console.error('Failed to fetch pending leaves:', error);
      throw error;
    }
  },
};

// Employee Management Actions
export const employeeActions = {
  async getEmployees() {
    try {
      return await employeeService.getEmployees();
    } catch (error: any) {
      console.error('Failed to fetch employees:', error);
      throw error;
    }
  },

  async createEmployee(employeeData: any) {
    try {
      const result = await employeeService.createEmployee(employeeData);
      return result;
    } catch (error: any) {
      console.error('Failed to create employee:', error);
      throw error;
    }
  },

  async updateEmployee(employeeId: string, updates: any) {
    try {
      const result = await employeeService.updateEmployee(employeeId, updates);
      return result;
    } catch (error: any) {
      console.error('Failed to update employee:', error);
      throw error;
    }
  },

  async deleteEmployee(employeeId: string) {
    try {
      await employeeService.deleteEmployee(employeeId);
    } catch (error: any) {
      console.error('Failed to delete employee:', error);
      throw error;
    }
  },

  async getEmployeeById(employeeId: string) {
    try {
      return await employeeService.getEmployeeById(employeeId);
    } catch (error: any) {
      console.error('Failed to fetch employee:', error);
      throw error;
    }
  },

  async getTeamMembers(managerId: string) {
    try {
      return await employeeService.getTeamMembers(managerId);
    } catch (error: any) {
      console.error('Failed to fetch team members:', error);
      throw error;
    }
  },
};

// Candidate Management Actions
export const candidateActions = {
  async getCandidates(jobId?: string) {
    try {
      return await candidateService.getCandidates(jobId);
    } catch (error: any) {
      console.error('Failed to fetch candidates:', error);
      throw error;
    }
  },

  async createCandidate(candidateData: any) {
    try {
      const result = await candidateService.createCandidate(candidateData);
      return result;
    } catch (error: any) {
      console.error('Failed to create candidate:', error);
      throw error;
    }
  },

  async updateCandidate(candidateId: string, updates: any) {
    try {
      const result = await candidateService.updateCandidate(candidateId, updates);
      return result;
    } catch (error: any) {
      console.error('Failed to update candidate:', error);
      throw error;
    }
  },

  async uploadResume(candidateId: string, file: File) {
    try {
      const result = await candidateService.uploadResume(candidateId, file);
      return result;
    } catch (error: any) {
      console.error('Failed to upload resume:', error);
      throw error;
    }
  },

  async getCandidateById(candidateId: string) {
    try {
      return await candidateService.getCandidateById(candidateId);
    } catch (error: any) {
      console.error('Failed to fetch candidate:', error);
      throw error;
    }
  },
};

// Payroll Actions
export const payrollActions = {
  async getPayrollData(userId: string) {
    try {
      return await payrollService.getPayroll(userId);
    } catch (error: any) {
      console.error('Failed to fetch payroll:', error);
      throw error;
    }
  },

  async getPayslip(userId: string, month: number, year: number) {
    try {
      return await payrollService.generatePayslip(userId, month, year);
    } catch (error: any) {
      console.error('Failed to fetch payslip:', error);
      throw error;
    }
  },

  async processPayroll(month: number, year: number) {
    try {
      const result = await payrollService.calculatePayroll('', month, year);
      return result;
    } catch (error: any) {
      console.error('Failed to process payroll:', error);
      throw error;
    }
  },

  async getPayrollSummary(filters?: any) {
    try {
      return await payrollService.getPayroll();
    } catch (error: any) {
      console.error('Failed to fetch payroll summary:', error);
      throw error;
    }
  },
};

// Attendance Actions
export const attendanceActions = {
  async clockIn(employeeId: string) {
    try {
      return await attendanceService.clockIn(employeeId);
    } catch (error: any) {
      console.error('Failed to clock in:', error);
      throw error;
    }
  },

  async clockOut(attendanceId: string) {
    try {
      return await attendanceService.clockOut(attendanceId);
    } catch (error: any) {
      console.error('Failed to clock out:', error);
      throw error;
    }
  },

  async getAttendance(employeeId: string, startDate: string, endDate: string) {
    try {
      return await attendanceService.getAttendance(employeeId, startDate, endDate);
    } catch (error: any) {
      console.error('Failed to fetch attendance:', error);
      throw error;
    }
  },

  async markAttendance(employeeId: string, date: string, status: string) {
    try {
      return await attendanceService.markAttendance(employeeId, date, status);
    } catch (error: any) {
      console.error('Failed to mark attendance:', error);
      throw error;
    }
  },
};

// AI Actions
export const aiActions = {
  async getAIResponse(query: string) {
    try {
      return await aiService.hrChat(query);
    } catch (error: any) {
      console.error('Failed to get AI response:', error);
      throw error;
    }
  },

  async analyzeData(data: any, analysisType: string) {
    try {
      return await aiService.analyzePerformance(data);
    } catch (error: any) {
      console.error('Failed to analyze data:', error);
      throw error;
    }
  },

  async generateReport(reportType: string, filters?: any) {
    try {
      return await aiService.nlpQuery(`Generate ${reportType} report`);
    } catch (error: any) {
      console.error('Failed to generate report:', error);
      throw error;
    }
  },
};

// Generic action handler for common operations
export const commonActions = {
  async handleDelete(id: string, itemType: string, deleteFunction: (id: string) => Promise<void>) {
    if (!window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      return false;
    }

    try {
      await deleteFunction(id);
      return true;
    } catch (error: any) {
      console.error(`Failed to delete ${itemType}:`, error);
      return false;
    }
  },

  async handleExport(data: any[], filename: string) {
    try {
      const csv = this.convertToCSV(data);
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
      element.setAttribute('download', filename);
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      return true;
    } catch (error: any) {
      console.error('Failed to export data:', error);
      return false;
    }
  },

  convertToCSV(data: any[]): string {
    if (data.length === 0) return '';

    const keys = Object.keys(data[0]);
    const csv = [keys.join(',')];

    data.forEach((item: any) => {
      const values = keys.map((key) => {
        const value = item[key];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      });
      csv.push(values.join(','));
    });

    return csv.join('\n');
  },

  formatDate(date: Date | string): string {
    if (typeof date === 'string') date = new Date(date);
    return date.toISOString().split('T')[0];
  },

  formatTime(date: Date | string): string {
    if (typeof date === 'string') date = new Date(date);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  },
};

export default {
  interviewActions,
  documentActions,
  fileActions,
  leaveActions,
  employeeActions,
  candidateActions,
  payrollActions,
  attendanceActions,
  aiActions,
  commonActions,
};
