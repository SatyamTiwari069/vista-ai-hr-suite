import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);

export const documentService = {
  /**
   * Generate salary slip PDF content
   */
  async generateSalarySlip(userId: string, month: number, year: number) {
    try {
      const { data: payroll, error: payrollError } = await supabase
        .from('payroll')
        .select('*')
        .eq('user_id', userId)
        .eq('month', month)
        .eq('year', year)
        .single();

      if (payrollError && payrollError.code !== 'PGRST116') throw payrollError;

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('email, name, salary')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      const slip = payroll || {
        user_id: userId,
        month,
        year,
        baseSalary: user?.salary || 0,
        allowances: Math.round((user?.salary || 0) * 0.1),
        deductions: Math.round((user?.salary || 0) * 0.15),
        netSalary: Math.round((user?.salary || 0) * 0.95),
      };

      // Generate CSV content
      const csvContent = `
SALARY SLIP
==================================================
Employee Name: ${user?.name || 'N/A'}
Employee Email: ${user?.email || 'N/A'}
Month: ${month}
Year: ${year}

SALARY BREAKDOWN
==================================================
Base Salary,${slip.baseSalary || 0}
Allowances,${slip.allowances || 0}
Deductions,${slip.deductions || 0}
Net Salary,${slip.netSalary || 0}

Generated Date: ${new Date().toISOString()}
`;

      return csvContent;
    } catch (error) {
      logger.error('Generate salary slip error:', error);
      throw error;
    }
  },

  /**
   * Generate resume from candidate data
   */
  async generateCandidateResume(candidateId: string) {
    try {
      const { data: candidate, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', candidateId)
        .single();

      if (error) throw error;

      const resumeContent = `
RESUME
==================================================
Name: ${candidate.name || 'N/A'}
Email: ${candidate.email || 'N/A'}
Phone: ${candidate.phone || 'N/A'}
Location: ${candidate.location || 'N/A'}

PROFESSIONAL SUMMARY
${candidate.summary || 'No summary provided'}

EXPERIENCE
${candidate.experience || 'No experience provided'}

SKILLS
${Array.isArray(candidate.skills) ? candidate.skills.join(', ') : candidate.skills || 'No skills provided'}

EDUCATION
${candidate.education || 'No education provided'}

QUALIFICATIONS
${candidate.qualifications || 'No qualifications provided'}

Generated: ${new Date().toISOString()}
`;

      return resumeContent;
    } catch (error) {
      logger.error('Generate resume error:', error);
      throw error;
    }
  },

  /**
   * Generate attendance report
   */
  async generateAttendanceReport(userId?: string, startDate?: string, endDate?: string) {
    try {
      let query = supabase.from('attendance').select('*');

      if (userId) {
        query = query.eq('user_id', userId);
      }
      if (startDate) {
        query = query.gte('date', startDate);
      }
      if (endDate) {
        query = query.lte('date', endDate);
      }

      const { data: records, error } = await query;

      if (error) throw error;

      let reportContent = `
ATTENDANCE REPORT
==================================================
Generated: ${new Date().toISOString()}
Period: ${startDate || 'All'} to ${endDate || 'All'}

SUMMARY
Total Days: ${records?.length || 0}
Present: ${records?.filter((r: any) => r.status === 'present').length || 0}
Absent: ${records?.filter((r: any) => r.status === 'absent').length || 0}
Leave: ${records?.filter((r: any) => r.status === 'leave').length || 0}
Half Day: ${records?.filter((r: any) => r.status === 'half_day').length || 0}

DETAILED RECORDS
Date,Status,Check-In,Check-Out
`;

      records?.forEach((record: any) => {
        reportContent += `\n${record.date},${record.status},${record.check_in_time || 'N/A'},${record.check_out_time || 'N/A'}`;
      });

      return reportContent;
    } catch (error) {
      logger.error('Generate attendance report error:', error);
      throw error;
    }
  },

  /**
   * Generate employee data export
   */
  async generateEmployeeReport(departmentId?: string) {
    try {
      let query = supabase.from('users').select('*').eq('role', 'employee');

      if (departmentId) {
        query = query.eq('department_id', departmentId);
      }

      const { data: employees, error } = await query;

      if (error) throw error;

      let reportContent = `
EMPLOYEE REPORT
==================================================
Generated: ${new Date().toISOString()}
Total Employees: ${employees?.length || 0}

Employee ID,Name,Email,Department,Position,Salary,Status
`;

      employees?.forEach((emp: any) => {
        reportContent += `\n${emp.id},${emp.name || 'N/A'},${emp.email || 'N/A'},${emp.department_id || 'N/A'},${emp.position || 'N/A'},${emp.salary || 0},${emp.status || 'active'}`;
      });

      return reportContent;
    } catch (error) {
      logger.error('Generate employee report error:', error);
      throw error;
    }
  },

  /**
   * Generate leave balance report
   */
  async generateLeaveReport(userId?: string) {
    try {
      let query = supabase.from('leaves').select('*');

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data: leaveRecords, error } = await query;

      if (error) throw error;

      let reportContent = `
LEAVE REPORT
==================================================
Generated: ${new Date().toISOString()}

LEAVE SUMMARY
Total Leave Requests: ${leaveRecords?.length || 0}
Approved: ${leaveRecords?.filter((l: any) => l.status === 'approved').length || 0}
Pending: ${leaveRecords?.filter((l: any) => l.status === 'pending').length || 0}
Rejected: ${leaveRecords?.filter((l: any) => l.status === 'rejected').length || 0}

Casual Leave: ${leaveRecords?.filter((l: any) => l.leave_type === 'casual').length || 0}
Sick Leave: ${leaveRecords?.filter((l: any) => l.leave_type === 'sick').length || 0}
Earned Leave: ${leaveRecords?.filter((l: any) => l.leave_type === 'earned').length || 0}

LEAVE RECORDS
From Date,To Date,Type,Days,Status,Reason
`;

      leaveRecords?.forEach((leave: any) => {
        reportContent += `\n${leave.from_date},${leave.to_date},${leave.leave_type},${leave.number_of_days},${leave.status},${leave.reason || 'N/A'}`;
      });

      return reportContent;
    } catch (error) {
      logger.error('Generate leave report error:', error);
      throw error;
    }
  },

  /**
   * Generate performance review report
   */
  async generatePerformanceReport(userId?: string, departmentId?: string) {
    try {
      let query = supabase.from('performance_reviews').select('*, users(*)')
        .order('review_date', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }
      if (departmentId) {
        query = query.eq('users.department_id', departmentId);
      }

      const { data: reviews, error } = await query;

      if (error) throw error;

      let reportContent = `
PERFORMANCE REVIEW REPORT
==================================================
Generated: ${new Date().toISOString()}
Total Reviews: ${reviews?.length || 0}

SUMMARY
Average Rating: ${reviews ? (reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / reviews.length).toFixed(2) : 0}
High Performers (4.5+): ${reviews?.filter((r: any) => r.rating >= 4.5).length || 0}
Needs Improvement (<3): ${reviews?.filter((r: any) => r.rating < 3).length || 0}

DETAILED REVIEWS
Employee,Reviewer,Rating,Review Date,Feedback
`;

      reviews?.forEach((review: any) => {
        reportContent += `\n${review.users?.name || 'N/A'},${review.reviewer_id || 'N/A'},${review.rating || 0},${review.review_date || 'N/A'},${(review.feedback || 'N/A').substring(0, 100)}...`;
      });

      return reportContent;
    } catch (error) {
      logger.error('Generate performance report error:', error);
      throw error;
    }
  },

  /**
   * Generate payroll report
   */
  async generatePayrollReport(month: number, year: number) {
    try {
      const { data: records, error } = await supabase
        .from('payroll')
        .select('*, users(*)')
        .eq('month', month)
        .eq('year', year);

      if (error) throw error;

      const totalPayroll = records?.reduce((sum: number, r: any) => sum + (r.netSalary || 0), 0) || 0;
      const totalAllowances = records?.reduce((sum: number, r: any) => sum + (r.allowances || 0), 0) || 0;
      const totalDeductions = records?.reduce((sum: number, r: any) => sum + (r.deductions || 0), 0) || 0;

      let reportContent = `
PAYROLL REPORT
==================================================
Month: ${month}
Year: ${year}
Generated: ${new Date().toISOString()}

SUMMARY
Total Employees: ${records?.length || 0}
Total Base Salary: ${records?.reduce((sum: number, r: any) => sum + (r.baseSalary || 0), 0) || 0}
Total Allowances: ${totalAllowances}
Total Deductions: ${totalDeductions}
Net Payroll: ${totalPayroll}

DETAILED BREAKDOWN
Employee ID,Employee Name,Base Salary,Allowances,Deductions,Net Salary
`;

      records?.forEach((record: any) => {
        reportContent += `\n${record.user_id},${record.users?.name || 'N/A'},${record.baseSalary || 0},${record.allowances || 0},${record.deductions || 0},${record.netSalary || 0}`;
      });

      return reportContent;
    } catch (error) {
      logger.error('Generate payroll report error:', error);
      throw error;
    }
  },

  /**
   * Generate recruitment report
   */
  async generateRecruitmentReport(jobId?: string) {
    try {
      let query = supabase.from('candidates').select('*, jobs(*)');

      if (jobId) {
        query = query.eq('job_id', jobId);
      }

      const { data: candidates, error } = await query;

      if (error) throw error;

      let reportContent = `
RECRUITMENT REPORT
==================================================
Generated: ${new Date().toISOString()}

SUMMARY
Total Candidates: ${candidates?.length || 0}
Selected: ${candidates?.filter((c: any) => c.status === 'selected').length || 0}
Rejected: ${candidates?.filter((c: any) => c.status === 'rejected').length || 0}
Under Review: ${candidates?.filter((c: any) => c.status === 'under_review').length || 0}

CANDIDATE LIST
Name,Email,Position,Status,Applied Date
`;

      candidates?.forEach((candidate: any) => {
        reportContent += `\n${candidate.name || 'N/A'},${candidate.email || 'N/A'},${candidate.jobs?.title || 'N/A'},${candidate.status || 'N/A'},${candidate.created_at || 'N/A'}`;
      });

      return reportContent;
    } catch (error) {
      logger.error('Generate recruitment report error:', error);
      throw error;
    }
  },
};
