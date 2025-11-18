export type UserRole = 'admin' | 'hr' | 'manager' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
}

export const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@vista.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@vista.com',
      name: 'Admin User',
      role: 'admin',
      department: 'IT',
      position: 'System Administrator',
    },
  },
  'hr@vista.com': {
    password: 'hr123',
    user: {
      id: '2',
      email: 'hr@vista.com',
      name: 'HR Manager',
      role: 'hr',
      department: 'Human Resources',
      position: 'HR Manager',
    },
  },
  'manager@vista.com': {
    password: 'manager123',
    user: {
      id: '3',
      email: 'manager@vista.com',
      name: 'Team Manager',
      role: 'manager',
      department: 'Engineering',
      position: 'Senior Manager',
    },
  },
  'employee@vista.com': {
    password: 'employee123',
    user: {
      id: '4',
      email: 'employee@vista.com',
      name: 'John Doe',
      role: 'employee',
      department: 'Engineering',
      position: 'Software Engineer',
    },
  },
};
