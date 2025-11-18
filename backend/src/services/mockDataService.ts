// Mock Data Service for Development Mode
// Provides realistic mock data when database is unavailable

export const mockDataService = {
  // Mock Employees
  mockEmployees: [
    {
      id: 'emp1',
      user_id: 'user1',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      hire_date: '2020-01-15',
      salary: 120000,
      status: 'active',
    },
    {
      id: 'emp2',
      user_id: 'user2',
      department: 'HR',
      position: 'HR Manager',
      hire_date: '2019-06-10',
      salary: 95000,
      status: 'active',
    },
    {
      id: 'emp3',
      user_id: 'user3',
      department: 'Engineering',
      position: 'Team Lead',
      hire_date: '2021-03-20',
      salary: 110000,
      status: 'active',
    },
  ],

  // Mock Attendance Records
  mockAttendance: [
    {
      id: 'att1',
      employee_id: 'emp1',
      date: '2025-11-19',
      check_in: '09:00',
      check_out: '17:30',
      status: 'present',
    },
    {
      id: 'att2',
      employee_id: 'emp2',
      date: '2025-11-19',
      check_in: '08:45',
      check_out: '17:15',
      status: 'present',
    },
  ],

  // Mock Leave Requests
  mockLeaves: [
    {
      id: 'leave1',
      employee_id: 'emp1',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      type: 'vacation',
      status: 'approved',
      days_requested: 5,
    },
    {
      id: 'leave2',
      employee_id: 'emp3',
      start_date: '2025-11-20',
      end_date: '2025-11-20',
      type: 'sick',
      status: 'pending',
      days_requested: 1,
    },
  ],

  // Mock Candidates
  mockCandidates: [
    {
      id: 'cand1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      position: 'Software Engineer',
      status: 'under_review',
      resume_score: 85,
      ai_score: 88,
      experience_years: 5,
    },
    {
      id: 'cand2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      position: 'Product Manager',
      status: 'interviews',
      resume_score: 78,
      ai_score: 82,
      experience_years: 7,
    },
  ],

  // Mock Jobs
  mockJobs: [
    {
      id: 'job1',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'New York',
      salary_min: 120000,
      salary_max: 160000,
      status: 'open',
      description: 'Looking for experienced software engineers',
    },
    {
      id: 'job2',
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco',
      salary_min: 130000,
      salary_max: 170000,
      status: 'open',
      description: 'Lead our product strategy',
    },
  ],

  // Mock Payroll
  mockPayroll: [
    {
      id: 'payroll1',
      employee_id: 'emp1',
      period: '2025-11-01',
      salary: 10000,
      bonus: 2000,
      deductions: 1500,
      net_pay: 10500,
    },
  ],

  // Mock Performance Reviews
  mockPerformance: [
    {
      id: 'perf1',
      employee_id: 'emp1',
      reviewer_id: 'user3',
      rating: 4.5,
      date: '2025-11-15',
      comments: 'Excellent performance',
    },
  ],

  // Mock Training Records
  mockTraining: [
    {
      id: 'train1',
      employee_id: 'emp1',
      title: 'Advanced React',
      provider: 'Udemy',
      completion_date: '2025-11-10',
      status: 'completed',
    },
  ],

  getEmployees() {
    return this.mockEmployees;
  },

  getEmployee(id: string) {
    return this.mockEmployees.find(e => e.id === id);
  },

  getAttendance() {
    return this.mockAttendance;
  },

  getLeaves() {
    return this.mockLeaves;
  },

  getCandidates() {
    return this.mockCandidates;
  },

  getCandidate(id: string) {
    return this.mockCandidates.find(c => c.id === id);
  },

  getJobs() {
    return this.mockJobs;
  },

  getPayroll() {
    return this.mockPayroll;
  },

  getPerformance() {
    return this.mockPerformance;
  },

  getTraining() {
    return this.mockTraining;
  },
};
