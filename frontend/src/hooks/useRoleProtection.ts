import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface RolePermissions {
  [key: string]: UserRole[];
}

const ROLE_PERMISSIONS: RolePermissions = {
  // Admin pages - only admin
  'admin-dashboard': ['admin'],
  'user-management': ['admin'],
  'system-maintenance': ['admin'],
  'audit-logs': ['admin'],
  'api-management': ['admin'],
  'sso-integration': ['admin'],
  'organization-dashboard': ['admin'],
  'bulk-import': ['admin'],
  'system-announcements': ['admin'],
  'compliance-tracking': ['admin'],
  
  // HR pages - HR and Admin
  'hr-dashboard': ['hr', 'admin'],
  'recruitment': ['hr', 'admin'],
  'resume-screener': ['hr', 'admin'],
  'performance-management': ['hr', 'admin'],
  'payroll': ['hr', 'admin'],
  'benefits': ['hr', 'admin'],
  'employee-lifecycle': ['hr', 'admin'],
  'training': ['hr', 'admin'],
  
  // Manager pages - Manager, HR, Admin
  'manager-dashboard': ['manager', 'hr', 'admin'],
  'team-overview': ['manager', 'hr', 'admin'],
  'performance-review': ['manager', 'hr', 'admin'],
  'leave-approval': ['manager', 'hr', 'admin'],
  'project-tracking': ['manager', 'hr', 'admin'],
  
  // Employee pages - All roles
  'employee-dashboard': ['employee', 'manager', 'hr', 'admin'],
  'attendance': ['employee', 'manager', 'hr', 'admin'],
  'leave-management': ['employee', 'manager', 'hr', 'admin'],
  'timesheet': ['employee', 'manager', 'hr', 'admin'],
  'profile': ['employee', 'manager', 'hr', 'admin'],
};

export function useRoleProtection(pageKey: string) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const allowedRoles = ROLE_PERMISSIONS[pageKey];
    if (allowedRoles && !allowedRoles.includes(user?.role as UserRole)) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, pageKey, navigate]);

  return {
    hasAccess: !pageKey || !ROLE_PERMISSIONS[pageKey] || (user?.role && ROLE_PERMISSIONS[pageKey].includes(user.role as UserRole)),
    user,
    isAuthenticated,
  };
}

export function canAccess(userRole: UserRole | undefined, pageKey: string): boolean {
  if (!userRole) return false;
  const allowedRoles = ROLE_PERMISSIONS[pageKey];
  if (!allowedRoles) return true; // No restriction
  return allowedRoles.includes(userRole);
}

export default useRoleProtection;
