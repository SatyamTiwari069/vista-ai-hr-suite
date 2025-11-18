// Mock Data Service - Can be replaced with real API calls later

export const mockData = {
  // Employee Data
  employees: [
    {
      id: '1',
      name: 'Alice Kumar',
      email: 'alice.kumar@vista.com',
      position: 'Senior Developer',
      department: 'Engineering',
      salary: 95000,
      joinDate: '2021-03-15',
      status: 'active',
      performance: 92,
      manager: 'Sarah Johnson',
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.smith@vista.com',
      position: 'Product Manager',
      department: 'Product',
      salary: 85000,
      joinDate: '2021-06-01',
      status: 'active',
      performance: 88,
      manager: 'Sarah Johnson',
    },
    {
      id: '3',
      name: 'Carol White',
      email: 'carol.white@vista.com',
      position: 'QA Engineer',
      department: 'Quality Assurance',
      salary: 75000,
      joinDate: '2022-01-10',
      status: 'active',
      performance: 85,
      manager: 'Mike Johnson',
    },
  ],

  // Job Postings
  jobs: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      description: 'We are looking for an experienced software engineer...',
      department: 'Engineering',
      salaryRange: '$90,000 - $120,000',
      status: 'open',
      applicants: 45,
      posted: '2024-01-01',
    },
    {
      id: '2',
      title: 'Product Manager',
      description: 'Join our product team to lead innovative initiatives...',
      department: 'Product',
      salaryRange: '$80,000 - $110,000',
      status: 'open',
      applicants: 32,
      posted: '2024-01-05',
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      description: 'We need a talented designer to create amazing experiences...',
      department: 'Design',
      salaryRange: '$75,000 - $95,000',
      status: 'open',
      applicants: 28,
      posted: '2024-01-08',
    },
  ],

  // Candidates
  candidates: [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Engineer',
      jobId: '1',
      status: 'interview',
      aiScore: 92,
      appliedDate: '2024-01-10',
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@example.com',
      phone: '+1 (555) 234-5678',
      position: 'Product Manager',
      jobId: '2',
      status: 'shortlisted',
      aiScore: 88,
      appliedDate: '2024-01-12',
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma.d@example.com',
      phone: '+1 (555) 345-6789',
      position: 'UX Designer',
      jobId: '3',
      status: 'applied',
      aiScore: 85,
      appliedDate: '2024-01-15',
    },
  ],

  // Leave Requests
  leaves: [
    {
      id: '1',
      employeeId: '1',
      type: 'Vacation',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      status: 'approved',
      reason: 'Family vacation',
    },
    {
      id: '2',
      employeeId: '2',
      type: 'Sick Leave',
      startDate: '2024-01-22',
      endDate: '2024-01-23',
      status: 'pending',
      reason: 'Medical appointment',
    },
    {
      id: '3',
      employeeId: '3',
      type: 'Personal',
      startDate: '2024-01-31',
      endDate: '2024-01-31',
      status: 'approved',
      reason: 'Personal work',
    },
  ],

  // Attendance Records
  attendance: [
    { date: '2024-01-15', status: 'present', hours: 8, employee: 'Alice Kumar' },
    { date: '2024-01-16', status: 'present', hours: 8, employee: 'Alice Kumar' },
    { date: '2024-01-17', status: 'on_leave', hours: 0, employee: 'Alice Kumar' },
    { date: '2024-01-18', status: 'present', hours: 8, employee: 'Alice Kumar' },
    { date: '2024-01-19', status: 'present', hours: 7.5, employee: 'Alice Kumar' },
  ],

  // Projects
  projects: [
    {
      id: '1',
      name: 'Mobile App Redesign',
      progress: 75,
      deadline: '2024-02-15',
      status: 'on_track',
      team: ['Alice Kumar', 'Bob Smith'],
    },
    {
      id: '2',
      name: 'Backend Optimization',
      progress: 45,
      deadline: '2024-03-01',
      status: 'on_track',
      team: ['Alice Kumar', 'Carol White'],
    },
    {
      id: '3',
      name: 'API Integration',
      progress: 60,
      deadline: '2024-02-28',
      status: 'at_risk',
      team: ['Bob Smith'],
    },
  ],

  // Performance Reviews
  reviews: [
    {
      id: '1',
      employeeId: '1',
      period: 'Q4 2023',
      rating: 4.5,
      feedback: 'Excellent performance and leadership',
      reviewedBy: 'Sarah Johnson',
    },
    {
      id: '2',
      employeeId: '2',
      period: 'Q4 2023',
      rating: 4.2,
      feedback: 'Strong product sense and execution',
      reviewedBy: 'Sarah Johnson',
    },
  ],

  // Announcements
  announcements: [
    {
      id: '1',
      title: 'New Office Policies',
      content: 'We have updated our office policies...',
      date: '2024-01-15',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Upcoming Training Programs',
      content: 'New training programs are available...',
      date: '2024-01-14',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Holiday Schedule 2024',
      content: 'Here is the holiday schedule for 2024...',
      date: '2024-01-10',
      priority: 'high',
    },
  ],

  // Training Programs
  trainingPrograms: [
    {
      id: '1',
      title: 'Leadership Development',
      participants: 24,
      progress: 65,
      duration: '8 weeks',
      status: 'in_progress',
    },
    {
      id: '2',
      title: 'Technical Skills',
      participants: 45,
      progress: 42,
      duration: '12 weeks',
      status: 'in_progress',
    },
    {
      id: '3',
      title: 'Compliance Training',
      participants: 150,
      progress: 78,
      duration: '4 weeks',
      status: 'in_progress',
    },
  ],

  // Payroll Data
  payroll: {
    totalPayroll: 2450000,
    processed: 1890000,
    pending: 560000,
    budgetUsage: 87,
    payslips: [
      { month: 'December 2023', amount: 5200, date: '2023-12-31' },
      { month: 'November 2023', amount: 5200, date: '2023-11-30' },
      { month: 'October 2023', amount: 5200, date: '2023-10-31' },
    ],
  },

  // Department Data
  departments: [
    { id: '1', name: 'Engineering', employees: 45, budget: 1200000 },
    { id: '2', name: 'Product', employees: 12, budget: 400000 },
    { id: '3', name: 'Design', employees: 8, budget: 250000 },
    { id: '4', name: 'Human Resources', employees: 6, budget: 150000 },
    { id: '5', name: 'Finance', employees: 5, budget: 180000 },
  ],

  // Company Statistics
  stats: {
    totalEmployees: 1234,
    openPositions: 23,
    averagePerformance: 4.2,
    pendingApprovals: 8,
    attendanceRate: 95.2,
    payrollThisMonth: '$2.4M',
  },
};

// Helper functions to simulate API delays
export const simulateApiDelay = (ms: number = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Get employees
export const getEmployees = async () => {
  await simulateApiDelay();
  return mockData.employees;
};

// Get employee by ID
export const getEmployeeById = async (id: string) => {
  await simulateApiDelay();
  return mockData.employees.find(e => e.id === id);
};

// Get jobs
export const getJobs = async () => {
  await simulateApiDelay();
  return mockData.jobs;
};

// Get candidates
export const getCandidates = async (jobId?: string) => {
  await simulateApiDelay();
  if (jobId) {
    return mockData.candidates.filter(c => c.jobId === jobId);
  }
  return mockData.candidates;
};

// Get leaves
export const getLeaves = async (employeeId?: string) => {
  await simulateApiDelay();
  if (employeeId) {
    return mockData.leaves.filter(l => l.employeeId === employeeId);
  }
  return mockData.leaves;
};

// Get attendance
export const getAttendance = async (employeeId?: string) => {
  await simulateApiDelay();
  return mockData.attendance;
};

// Get projects
export const getProjects = async () => {
  await simulateApiDelay();
  return mockData.projects;
};

// Get announcements
export const getAnnouncements = async () => {
  await simulateApiDelay();
  return mockData.announcements;
};

// Get training programs
export const getTrainingPrograms = async () => {
  await simulateApiDelay();
  return mockData.trainingPrograms;
};

// Get departments
export const getDepartments = async () => {
  await simulateApiDelay();
  return mockData.departments;
};

export default mockData;
