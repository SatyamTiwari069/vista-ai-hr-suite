import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  FileText,
  Briefcase,
  Settings,
  Shield,
  Building,
  Clock,
  Target,
  Award,
  MessageSquare,
  Brain,
  Bot,
  FileSearch,
  UserCheck,
  GraduationCap,
  Gift,
  Heart,
  AlertTriangle,
  BarChart3,
  FolderKanban,
  Mail,
  BookOpen,
  Zap,
  HelpCircle,
  CheckSquare,
  PartyPopper,
} from 'lucide-react';
import { UserRole } from '@/types/auth';

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigationConfig: Record<UserRole, NavSection[]> = {
  admin: [
    {
      title: 'Overview',
      items: [
        { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { title: 'Company Overview', href: '/admin/company', icon: Building },
        { title: 'Organization Dashboard', href: '/admin/org-dashboard', icon: BarChart3 },
      ],
    },
    {
      title: 'User Management',
      items: [
        { title: 'User Management', href: '/admin/users', icon: Users },
        { title: 'Role Management', href: '/admin/roles', icon: Shield },
        { title: 'Department Hierarchy', href: '/admin/departments', icon: Building },
        { title: 'Bulk Import/Export', href: '/admin/bulk-users', icon: Users },
      ],
    },
    {
      title: 'HR Operations',
      items: [
        { title: 'Payroll Management', href: '/admin/payroll', icon: DollarSign },
        { title: 'Recruitment', href: '/admin/recruitment', icon: Briefcase },
        { title: 'Training & Development', href: '/admin/training', icon: GraduationCap },
        { title: 'Benefits & Compensation', href: '/admin/benefits', icon: Gift },
        { title: 'Leave & Attendance', href: '/admin/leave-attendance', icon: Calendar },
        { title: 'Performance Cycle', href: '/admin/performance', icon: TrendingUp },
      ],
    },
    {
      title: 'Employee Management',
      items: [
        { title: 'Employee Lifecycle', href: '/admin/lifecycle', icon: Users },
        { title: 'Goal Tracking', href: '/admin/goals', icon: Target },
        { title: 'Employee Recognition', href: '/admin/recognition', icon: Award },
        { title: 'Employee Burnout', href: '/admin/burnout', icon: Heart },
        { title: 'Engagement', href: '/admin/engagement', icon: MessageSquare },
      ],
    },
    {
      title: 'System & Security',
      items: [
        { title: 'Audit Logs', href: '/admin/audit-logs', icon: FileText },
        { title: 'SSO Integration', href: '/admin/sso', icon: Shield },
        { title: 'System Maintenance', href: '/admin/maintenance', icon: Settings },
        { title: 'Data Backup & Recovery', href: '/admin/backup', icon: FileText },
        { title: 'Compliance Tracking', href: '/admin/compliance', icon: Shield },
        { title: 'Risk Management', href: '/admin/risk', icon: AlertTriangle },
      ],
    },
    {
      title: 'Communications',
      items: [
        { title: 'System Announcements', href: '/admin/announcements', icon: MessageSquare },
        { title: 'Email/SMS Settings', href: '/admin/communications', icon: Mail },
        { title: 'Chat Moderator', href: '/admin/chat-moderator', icon: MessageSquare },
      ],
    },
    {
      title: 'Advanced Features',
      items: [
        { title: 'Custom Report Builder', href: '/admin/reports', icon: BarChart3 },
        { title: 'Automated Workflow', href: '/admin/workflows', icon: Zap },
        { title: 'Third Party Integration', href: '/admin/integrations', icon: Zap },
        { title: 'API Management', href: '/admin/api', icon: Settings },
        { title: 'Document Management', href: '/admin/documents', icon: FileText },
      ],
    },
  ],
  hr: [
    {
      title: 'Dashboard',
      items: [
        { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { title: 'Departments', href: '/hr/departments', icon: Building },
        { title: 'HR Roles & Permissions', href: '/hr/roles', icon: Shield },
      ],
    },
    {
      title: 'Recruitment',
      items: [
        { title: 'Recruitment Management', href: '/hr/recruitment', icon: Briefcase },
        { title: 'AI Resume Screener', href: '/hr/resume-screener', icon: Brain, badge: 'AI' },
        { title: 'AI Job Description Generator', href: '/hr/job-generator', icon: Bot, badge: 'AI' },
        { title: 'Candidate Evaluation', href: '/hr/candidates', icon: UserCheck },
        { title: 'Interview Scheduler', href: '/hr/interviews', icon: Calendar },
        { title: 'Job Listings Management', href: '/hr/job-listings', icon: Briefcase },
        { title: 'Hiring Insights', href: '/hr/hiring-insights', icon: BarChart3 },
      ],
    },
    {
      title: 'Employee Management',
      items: [
        { title: 'Payroll Management', href: '/hr/payroll', icon: DollarSign },
        { title: 'Training & Development', href: '/hr/training', icon: GraduationCap },
        { title: 'Benefits & Compensation', href: '/hr/benefits', icon: Gift },
        { title: 'Performance Management', href: '/hr/performance', icon: TrendingUp },
        { title: 'Goal Tracking', href: '/hr/goals', icon: Target },
      ],
    },
    {
      title: 'Engagement',
      items: [
        { title: 'Employee Engagement', href: '/hr/engagement', icon: MessageSquare },
        { title: 'Employee Recognition', href: '/hr/recognition', icon: Award },
        { title: 'Employee Burnout', href: '/hr/burnout', icon: Heart },
        { title: 'Risk Management', href: '/hr/risk', icon: AlertTriangle },
      ],
    },
  ],
  manager: [
    {
      title: 'Overview',
      items: [
        { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { title: 'Team Overview', href: '/manager/team', icon: Users },
        { title: 'Performance Analysis', href: '/manager/performance', icon: TrendingUp },
      ],
    },
    {
      title: 'Management',
      items: [
        { title: 'Project Management', href: '/manager/projects', icon: FolderKanban },
        { title: 'Leave Requests', href: '/manager/leave-requests', icon: Calendar },
        { title: 'Reporting Tools', href: '/manager/reports', icon: BarChart3 },
        { title: 'Predictive Analysis', href: '/manager/predictive', icon: Brain, badge: 'AI' },
      ],
    },
    {
      title: 'Communication',
      items: [
        { title: 'Communication Hub', href: '/manager/communication', icon: MessageSquare },
        { title: 'Document Management', href: '/manager/documents', icon: FileText },
      ],
    },
  ],
  employee: [
    {
      title: 'Dashboard',
      items: [
        { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { title: 'My Profile', href: '/employee/profile', icon: Users },
      ],
    },
    {
      title: 'Time & Attendance',
      items: [
        { title: 'Clock In/Out', href: '/employee/clock', icon: Clock },
        { title: 'Attendance', href: '/employee/attendance', icon: Calendar },
        { title: 'Leave Apply & History', href: '/employee/leave', icon: Calendar },
      ],
    },
    {
      title: 'Payroll & Benefits',
      items: [
        { title: 'Payroll & Benefits', href: '/employee/payroll', icon: DollarSign },
      ],
    },
    {
      title: 'Performance',
      items: [
        { title: 'Performance Management', href: '/employee/performance', icon: TrendingUp },
        { title: 'Task Management', href: '/employee/tasks', icon: CheckSquare },
        { title: 'Training & Development', href: '/employee/training', icon: GraduationCap },
      ],
    },
    {
      title: 'Resources',
      items: [
        { title: 'Company Announcements', href: '/employee/announcements', icon: MessageSquare },
        { title: 'Policies', href: '/employee/policies', icon: BookOpen },
        { title: 'Document Library', href: '/employee/documents', icon: FileText },
        { title: 'Event Management', href: '/employee/events', icon: PartyPopper },
        { title: 'Help Desk', href: '/employee/helpdesk', icon: HelpCircle },
      ],
    },
  ],
};
