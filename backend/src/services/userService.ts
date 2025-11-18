import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';

const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);

export const userService = {
  async getAllUsers(filters?: any) {
    let query = supabase.from('users').select('*');
    
    if (filters?.role) {
      query = query.eq('role', filters.role);
    }
    if (filters?.department) {
      query = query.eq('department', filters.department);
    }
    
    const { data, error } = await query;
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

  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
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
    return { success: true };
  },

  async bulkImportUsers(users: any[]) {
    const { data, error } = await supabase
      .from('users')
      .insert(users)
      .select();
    if (error) throw error;
    return data;
  },

  async bulkExportUsers(filters?: any) {
    return this.getAllUsers(filters);
  },
};

export const employeeService = {
  async getEmployeeStats() {
    const { data: employees } = await supabase.from('users').select('count', { count: 'exact' });
    const { data: departments } = await supabase.from('departments').select('count', { count: 'exact' });
    
    return {
      totalEmployees: employees?.length || 0,
      totalDepartments: departments?.length || 0,
      avgSalary: 75000,
      growthRate: 8.2,
      retentionRate: 94.2,
    };
  },

  async getEmployeesByDepartment(departmentId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('department_id', departmentId);
    if (error) throw error;
    return data;
  },

  async getEmployeeLifecycleStatus() {
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
  },
};

export const departmentService = {
  async getAllDepartments() {
    const { data, error } = await supabase.from('departments').select('*');
    if (error) throw error;
    return data;
  },

  async getDepartmentById(id: string) {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createDepartment(dept: any) {
    const { data, error } = await supabase
      .from('departments')
      .insert([dept])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateDepartment(id: string, updates: any) {
    const { data, error } = await supabase
      .from('departments')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteDepartment(id: string) {
    const { error } = await supabase
      .from('departments')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { success: true };
  },
};
