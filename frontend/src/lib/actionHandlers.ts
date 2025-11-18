import { toast } from 'sonner';
import * as BusinessLogic from './businessLogic';

/**
 * Unified Action Handlers for all buttons across the application
 * This provides standardized handler functions for common HR actions
 */

export const actionHandlers = {
  // ====================
  // ATTENDANCE ACTIONS
  // ====================
  async handleClockIn(employeeId: string) {
    try {
      await BusinessLogic.attendanceUtils.clockIn(employeeId);
      return true;
    } catch (error) {
      console.error('Clock in error:', error);
      return false;
    }
  },

  async handleClockOut(attendanceId: string) {
    try {
      await BusinessLogic.attendanceUtils.clockOut(attendanceId);
      return true;
    } catch (error) {
      console.error('Clock out error:', error);
      return false;
    }
  },

  async handleViewAttendanceReport(employeeId: string, startDate: string, endDate: string) {
    try {
      const data = await BusinessLogic.attendanceUtils.getAttendanceReport(employeeId, startDate, endDate);
      return data;
    } catch (error) {
      console.error('Attendance report error:', error);
      return null;
    }
  },

  // ====================
  // LEAVE ACTIONS
  // ====================
  async handleRequestLeave(employeeId: string, startDate: string, endDate: string, reason: string, type: string) {
    try {
      await BusinessLogic.leaveUtils.requestLeave(employeeId, startDate, endDate, reason, type);
      return true;
    } catch (error) {
      console.error('Leave request error:', error);
      return false;
    }
  },

  async handleApproveLeave(leaveId: string, approverId: string) {
    try {
      await BusinessLogic.leaveUtils.approveLeave(leaveId, approverId);
      return true;
    } catch (error) {
      console.error('Leave approval error:', error);
      return false;
    }
  },

  async handleRejectLeave(leaveId: string, approverId: string, reason: string) {
    try {
      await BusinessLogic.leaveUtils.rejectLeave(leaveId, approverId, reason);
      return true;
    } catch (error) {
      console.error('Leave rejection error:', error);
      return false;
    }
  },

  // ====================
  // EMPLOYEE ACTIONS
  // ====================
  async handleCreateEmployee(employeeData: any) {
    try {
      const result = await BusinessLogic.employeeUtils.createEmployee(employeeData);
      return result;
    } catch (error) {
      console.error('Create employee error:', error);
      return null;
    }
  },

  async handleUpdateEmployee(employeeId: string, updates: any) {
    try {
      const result = await BusinessLogic.employeeUtils.updateEmployee(employeeId, updates);
      return result;
    } catch (error) {
      console.error('Update employee error:', error);
      return null;
    }
  },

  async handleDeleteEmployee(employeeId: string) {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return false;
    }
    try {
      // Call delete endpoint
      await fetch(`http://localhost:3001/api/employees/${employeeId}`, {
        method: 'DELETE',
      });
      toast.success('Employee deleted successfully');
      return true;
    } catch (error) {
      console.error('Delete employee error:', error);
      toast.error('Failed to delete employee');
      return false;
    }
  },

  async handleViewEmployeeProfile(employeeId: string) {
    try {
      const profile = await BusinessLogic.employeeUtils.getEmployeeProfile(employeeId);
      return profile;
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  },

  async handleViewTeamMembers(managerId: string) {
    try {
      const team = await BusinessLogic.employeeUtils.getTeamMembers(managerId);
      return team;
    } catch (error) {
      console.error('Get team error:', error);
      return null;
    }
  },

  // ====================
  // RECRUITMENT ACTIONS
  // ====================
  async handleUploadResume(formData: FormData) {
    try {
      const result = await BusinessLogic.recruitmentUtils.uploadResume(formData);
      return result;
    } catch (error) {
      console.error('Resume upload error:', error);
      return null;
    }
  },

  async handleScreenResume(resumeText: string, jobRequirements: string) {
    try {
      const result = await BusinessLogic.recruitmentUtils.screenResume(resumeText, jobRequirements);
      return result;
    } catch (error) {
      console.error('Resume screening error:', error);
      return null;
    }
  },

  async handleScheduleInterview(candidateId: string, interviewData: any) {
    try {
      const result = await BusinessLogic.recruitmentUtils.scheduleInterview(candidateId, interviewData);
      return result;
    } catch (error) {
      console.error('Schedule interview error:', error);
      return null;
    }
  },

  // ====================
  // PAYROLL ACTIONS
  // ====================
  async handleGeneratePayslip(employeeId: string, month: string, year: string) {
    try {
      const payslip = await BusinessLogic.payrollUtils.generatePayslip(employeeId, month, year);
      return payslip;
    } catch (error) {
      console.error('Generate payslip error:', error);
      return null;
    }
  },

  async handleProcessBulkPayroll(payrollData: any[]) {
    try {
      const result = await BusinessLogic.payrollUtils.processBulkPayroll(payrollData);
      return result;
    } catch (error) {
      console.error('Process payroll error:', error);
      return null;
    }
  },

  async handleCalculateTax(employeeId: string, annualSalary: number) {
    try {
      const taxInfo = await BusinessLogic.payrollUtils.getTaxCalculations(employeeId, annualSalary);
      return taxInfo;
    } catch (error) {
      console.error('Calculate tax error:', error);
      return null;
    }
  },

  // ====================
  // PERFORMANCE ACTIONS
  // ====================
  async handleSubmitPerformanceReview(employeeId: string, reviewData: any) {
    try {
      const result = await BusinessLogic.performanceUtils.submitPerformanceReview(employeeId, reviewData);
      return result;
    } catch (error) {
      console.error('Submit review error:', error);
      return null;
    }
  },

  async handleGetPerformanceMetrics(employeeId: string) {
    try {
      const metrics = await BusinessLogic.performanceUtils.getPerformanceMetrics(employeeId);
      return metrics;
    } catch (error) {
      console.error('Get metrics error:', error);
      return null;
    }
  },

  async handleGeneratePerformanceReport(departmentId: string, period: string) {
    try {
      const report = await BusinessLogic.performanceUtils.generatePerformanceReport(departmentId, period);
      return report;
    } catch (error) {
      console.error('Generate report error:', error);
      return null;
    }
  },

  // ====================
  // TRAINING ACTIONS
  // ====================
  async handleEnrollCourse(employeeId: string, courseId: string) {
    try {
      const enrollment = await BusinessLogic.trainingUtils.enrollInCourse(employeeId, courseId);
      return enrollment;
    } catch (error) {
      console.error('Enroll course error:', error);
      return null;
    }
  },

  async handleCompleteCourse(enrollmentId: string) {
    try {
      const result = await BusinessLogic.trainingUtils.completeCourse(enrollmentId);
      return result;
    } catch (error) {
      console.error('Complete course error:', error);
      return null;
    }
  },

  // ====================
  // USER MANAGEMENT ACTIONS
  // ====================
  async handleCreateUser(userData: any) {
    try {
      const result = await BusinessLogic.userUtils.createUser(userData);
      return result;
    } catch (error) {
      console.error('Create user error:', error);
      return null;
    }
  },

  async handleUpdateUser(userId: string, updates: any) {
    try {
      const result = await BusinessLogic.userUtils.updateUser(userId, updates);
      return result;
    } catch (error) {
      console.error('Update user error:', error);
      return null;
    }
  },

  async handleDeleteUser(userId: string) {
    if (!confirm('Are you sure you want to delete this user?')) {
      return false;
    }
    try {
      await BusinessLogic.userUtils.deleteUser(userId);
      return true;
    } catch (error) {
      console.error('Delete user error:', error);
      return false;
    }
  },

  async handleResetPassword(userId: string, newPassword: string) {
    try {
      const result = await BusinessLogic.userUtils.resetPassword(userId, newPassword);
      return result;
    } catch (error) {
      console.error('Reset password error:', error);
      return null;
    }
  },

  // ====================
  // ORGANIZATION ACTIONS
  // ====================
  async handleCreateDepartment(departmentData: any) {
    try {
      const result = await BusinessLogic.organizationUtils.createDepartment(departmentData);
      return result;
    } catch (error) {
      console.error('Create department error:', error);
      return null;
    }
  },

  async handleUpdateDepartment(departmentId: string, updates: any) {
    try {
      const result = await BusinessLogic.organizationUtils.updateDepartment(departmentId, updates);
      return result;
    } catch (error) {
      console.error('Update department error:', error);
      return null;
    }
  },

  async handleGetDepartments() {
    try {
      const departments = await BusinessLogic.organizationUtils.getDepartments();
      return departments;
    } catch (error) {
      console.error('Get departments error:', error);
      return null;
    }
  },

  // ====================
  // JOB MANAGEMENT ACTIONS
  // ====================
  async handlePostJob(jobData: any) {
    try {
      const result = await BusinessLogic.jobUtils.postJob(jobData);
      return result;
    } catch (error) {
      console.error('Post job error:', error);
      return null;
    }
  },

  async handleCloseJob(jobId: string) {
    if (!confirm('Are you sure you want to close this job posting?')) {
      return false;
    }
    try {
      await BusinessLogic.jobUtils.closeJob(jobId);
      return true;
    } catch (error) {
      console.error('Close job error:', error);
      return false;
    }
  },

  async handleGetJobApplications(jobId: string) {
    try {
      const applications = await BusinessLogic.jobUtils.getJobApplications(jobId);
      return applications;
    } catch (error) {
      console.error('Get applications error:', error);
      return null;
    }
  },

  // ====================
  // GOALS & RECOGNITION ACTIONS
  // ====================
  async handleSetGoal(employeeId: string, goalData: any) {
    try {
      const result = await BusinessLogic.goalsUtils.setGoal(employeeId, goalData);
      return result;
    } catch (error) {
      console.error('Set goal error:', error);
      return null;
    }
  },

  async handleUpdateGoal(goalId: string, updates: any) {
    try {
      const result = await BusinessLogic.goalsUtils.updateGoal(goalId, updates);
      return result;
    } catch (error) {
      console.error('Update goal error:', error);
      return null;
    }
  },

  async handleRecognizeEmployee(employeeId: string, recognitionData: any) {
    try {
      const result = await BusinessLogic.goalsUtils.recognizeEmployee(employeeId, recognitionData);
      return result;
    } catch (error) {
      console.error('Recognize employee error:', error);
      return null;
    }
  },

  // ====================
  // REPORTING ACTIONS
  // ====================
  async handleGenerateReport(filters: any) {
    try {
      const report = await BusinessLogic.reportingUtils.generateCustomReport(filters);
      return report;
    } catch (error) {
      console.error('Generate report error:', error);
      return null;
    }
  },

  async handleExportReport(reportId: string, format: 'csv' | 'pdf' | 'xlsx') {
    try {
      const blob = await BusinessLogic.reportingUtils.exportReport(reportId, format);
      // Download the file
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `report.${format}`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success(`Report exported as ${format.toUpperCase()}`);
      return true;
    } catch (error) {
      console.error('Export report error:', error);
      toast.error('Failed to export report');
      return false;
    }
  },

  async handleGetDashboardMetrics(role: any) {
    try {
      const metrics = await BusinessLogic.reportingUtils.getDashboardMetrics(role);
      return metrics;
    } catch (error) {
      console.error('Get metrics error:', error);
      return null;
    }
  },

  // ====================
  // COMMON ACTIONS
  // ====================
  async handleExport(data: any[], filename: string, format: 'csv' | 'json' = 'csv') {
    try {
      if (format === 'csv') {
        const csv = this.convertToCSV(data);
        this.downloadFile(csv, `${filename}.csv`, 'text/csv');
      } else {
        const json = JSON.stringify(data, null, 2);
        this.downloadFile(json, `${filename}.json`, 'application/json');
      }
      toast.success(`Data exported as ${format.toUpperCase()}`);
      return true;
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
      return false;
    }
  },

  async handleImport(file: File): Promise<any[]> {
    try {
      const text = await file.text();
      if (file.name.endsWith('.csv')) {
        return this.parseCSV(text);
      } else if (file.name.endsWith('.json')) {
        return JSON.parse(text);
      }
      throw new Error('Unsupported file format');
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import file');
      return [];
    }
  },

  // ====================
  // UTILITY FUNCTIONS
  // ====================
  convertToCSV(data: any[]): string {
    if (!data.length) return '';
    const headers = Object.keys(data[0]);
    const csv = [headers.join(',')];
    data.forEach((row) => {
      csv.push(headers.map((header) => JSON.stringify(row[header] || '')).join(','));
    });
    return csv.join('\n');
  },

  parseCSV(csv: string): any[] {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map((line) => {
      const obj: any = {};
      const values = line.split(',');
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index]?.trim().replace(/^"|"$/g, '');
      });
      return obj;
    });
  },

  downloadFile(content: string, filename: string, type: string) {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  },

  // ====================
  // DIALOG HANDLERS
  // ====================
  handleOpenDialog(dialogId: string) {
    const dialog = document.getElementById(dialogId) as any;
    if (dialog?.showModal) {
      dialog.showModal();
    }
  },

  handleCloseDialog(dialogId: string) {
    const dialog = document.getElementById(dialogId) as any;
    if (dialog?.close) {
      dialog.close();
    }
  },

  // ====================
  // CONFIRMATION HANDLERS
  // ====================
  async handleDelete(itemName: string, onConfirm: () => Promise<boolean>): Promise<boolean> {
    if (confirm(`Are you sure you want to delete this ${itemName}?`)) {
      return await onConfirm();
    }
    return false;
  },

  async handleConfirmAction(message: string, onConfirm: () => Promise<boolean>): Promise<boolean> {
    if (confirm(message)) {
      return await onConfirm();
    }
    return false;
  },
};

export default actionHandlers;
