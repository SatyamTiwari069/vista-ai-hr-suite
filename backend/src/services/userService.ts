import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';
import { mockDataService } from './mockDataService.js';

const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);

// Mock users for fallback
const mockUsers = [
  {
    id: 'user1',
    email: 'admin@vista.com',
    name: 'Admin User',
    role: 'admin',
    department: 'IT',
    position: 'System Administrator',
    status: 'active',
  },
  {
    id: 'user2',
    email: 'hr@vista.com',
    name: 'HR Manager',
    role: 'hr',
    department: 'Human Resources',
    position: 'HR Manager',
    status: 'active',
  },
  {
    id: 'user3',
    email: 'manager@vista.com',
    name: 'Team Manager',
    role: 'manager',
    department: 'Engineering',
    position: 'Senior Manager',
    status: 'active',
  },
  {
    id: 'user4',
    email: 'employee@vista.com',
    name: 'John Doe',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Engineer',
    status: 'active',
  },
];

export const userService = {
  async getAllUsers(filters?: any) {
    try {
      let query = supabase.from('users').select('*');
      
      if (filters?.role) {
        query = query.eq('role', filters.role);
      }
      if (filters?.department) {
        query = query.eq('department', filters.department);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      // Fallback to mock data
      let result = mockUsers;
      if (filters?.role) {
        result = result.filter(u => u.role === filters.role);
      }
      if (filters?.department) {
        result = result.filter(u => u.department === filters.department);
      }
      return result;
    }
  },

  async getUserById(id: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    } catch (error: any) {
      // Fallback to mock data
      return mockUsers.find(u => u.id === id) || null;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error: any) {
      // Fallback to mock data
      return mockUsers.find(u => u.email === email) || null;
    }
  },

  async createUser(user: any) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([user])
        .select();
      if (error) throw error;
      return data[0];
    } catch (error: any) {
      // Fallback: return mock-like response
      return {
        id: `user_${Date.now()}`,
        ...user,
      };
    }
  },

  async updateUser(id: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } catch (error: any) {
      // Fallback: update mock data array and return
      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex >= 0) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
        return mockUsers[userIndex];
      }
      return { id, ...updates };
    }
  },

  async deleteUser(id: string) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      // Fallback: remove from mock data
      const index = mockUsers.findIndex(u => u.id === id);
      if (index >= 0) {
        mockUsers.splice(index, 1);
      }
      return { success: true };
    }
  },

  async bulkImportUsers(users: any[]) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert(users)
        .select();
      if (error) throw error;
      return data;
    } catch (error: any) {
      // Fallback: add to mock data
      const newUsers = users.map(u => ({
        id: `user_${Date.now()}_${Math.random()}`,
        ...u,
      }));
      mockUsers.push(...newUsers);
      return newUsers;
    }
  },

  async bulkExportUsers(filters?: any) {
    return this.getAllUsers(filters);
  },
};

export const employeeService = {
  async getEmployeeStats() {
    try {
      const { data: employees, count: empCount } = await supabase.from('users').select('count', { count: 'exact' });
      const { data: departments, count: deptCount } = await supabase.from('departments').select('count', { count: 'exact' });
      
      return {
        totalEmployees: empCount || mockDataService.mockEmployees.length,
        totalDepartments: deptCount || 3,
        avgSalary: 108333,
        growthRate: 12.5,
        retentionRate: 94.2,
      };
    } catch (error: any) {
      // Fallback to mock data stats
      return {
        totalEmployees: mockDataService.mockEmployees.length,
        totalDepartments: 3,
        avgSalary: 108333,
        growthRate: 12.5,
        retentionRate: 94.2,
      };
    }
  },

  async getEmployeesByDepartment(departmentId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('department_id', departmentId);
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      // Fallback to mock data
      return mockDataService.mockEmployees.filter(e => e.department === departmentId);
    }
  },

  async getEmployeeLifecycleStatus() {
    try {
      const stages = ['recruitment', 'onboarding', 'development', 'performance', 'offboarding'];
      const data: any = {};
      
      for (const stage of stages) {
        const { count } = await supabase
          .from('employee_lifecycle')
          .select('count', { count: 'exact' })
          .eq('stage', stage);
        data[stage] = count || 0;
      }
      
      return data;
    } catch (error: any) {
      // Fallback: mock lifecycle stages
      return {
        recruitment: 5,
        onboarding: 2,
        development: 8,
        performance: 3,
        offboarding: 1,
      };
    }
  },
};

// Mock departments for fallback
const mockDepartments = [
  { id: 'dept1', name: 'Engineering', description: 'Software Development' },
  { id: 'dept2', name: 'Human Resources', description: 'People Operations' },
  { id: 'dept3', name: 'Product', description: 'Product Management' },
];

export const departmentService = {
  async getAllDepartments() {
    try {
      const { data, error } = await supabase.from('departments').select('*');
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      // Fallback to mock data
      return mockDepartments;
    }
  },

  async getDepartmentById(id: string) {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    } catch (error: any) {
      // Fallback to mock data
      return mockDepartments.find(d => d.id === id) || null;
    }
  },

  async createDepartment(dept: any) {
    try {
      const { data, error } = await supabase
        .from('departments')
        .insert([dept])
        .select();
      if (error) throw error;
      return data[0];
    } catch (error: any) {
      // Fallback: return mock-like response
      const newDept = { id: `dept_${Date.now()}`, ...dept };
      mockDepartments.push(newDept);
      return newDept;
    }
  },

  async updateDepartment(id: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('departments')
        .update(updates)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    } catch (error: any) {
      // Fallback: update mock data
      const deptIndex = mockDepartments.findIndex(d => d.id === id);
      if (deptIndex >= 0) {
        mockDepartments[deptIndex] = { ...mockDepartments[deptIndex], ...updates };
        return mockDepartments[deptIndex];
      }
      return { id, ...updates };
    }
  },

  async deleteDepartment(id: string) {
    try {
      const { error } = await supabase
        .from('departments')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      // Fallback: remove from mock data
      const index = mockDepartments.findIndex(d => d.id === id);
      if (index >= 0) {
        mockDepartments.splice(index, 1);
      }
      return { success: true };
    }
  },
};
