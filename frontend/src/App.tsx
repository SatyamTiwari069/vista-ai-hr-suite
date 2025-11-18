import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import HRDashboard from "./pages/dashboards/HRDashboard";
import ManagerDashboard from "./pages/dashboards/ManagerDashboard";
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard";
import ResumeScreener from "./pages/hr/ResumeScreener";
import UserManagement from "./pages/admin/UserManagement";
import CompanyOverview from "./pages/admin/CompanyOverview";
import PayrollManagement from "./pages/admin/PayrollManagement";
import LeaveAttendance from "./pages/admin/LeaveAttendance";
import RoleManagement from "./pages/admin/RoleManagement";
import DepartmentHierarchy from "./pages/admin/DepartmentHierarchy";
import AuditLogs from "./pages/admin/AuditLogs";
import RecruitmentManagement from "./pages/hr/RecruitmentManagement";
import TeamOverview from "./pages/manager/TeamOverview";
import ClockInOut from "./pages/employee/ClockInOut";
// Admin pages
import OrganizationDashboard from "./pages/admin/OrganizationDashboard";
import BulkUserImportExport from "./pages/admin/BulkUserImportExport";
import SSOIntegration from "./pages/admin/SSOIntegration";
import SystemMaintenance from "./pages/admin/SystemMaintenance";
import EmployeeLifecycle from "./pages/admin/EmployeeLifecycle";
import GoalTracking from "./pages/admin/GoalTracking";
import EmployeeRecognition from "./pages/admin/EmployeeRecognition";
import EmployeeBurnout from "./pages/admin/EmployeeBurnout";
import EmployeeEngagement from "./pages/admin/EmployeeEngagement";
import SystemAnnouncements from "./pages/admin/SystemAnnouncements";
import EmailSMSSettings from "./pages/admin/EmailSMSSettings";
import ChatModerator from "./pages/admin/ChatModerator";
import DocumentManagement from "./pages/admin/DocumentManagement";
import DataBackupRecovery from "./pages/admin/DataBackupRecovery";
import ComplianceTracking from "./pages/admin/ComplianceTracking";
import RiskManagement from "./pages/admin/RiskManagement";
import CustomReportBuilder from "./pages/admin/CustomReportBuilder";
import AutomatedWorkflow from "./pages/admin/AutomatedWorkflow";
import APIManagement from "./pages/admin/APIManagement";
import ThirdPartyIntegration from "./pages/admin/ThirdPartyIntegration";
// HR pages
import HRDepartments from "./pages/hr/HRDepartments";
import HRRolesPermissions from "./pages/hr/HRRolesPermissions";
import CandidateEvaluation from "./pages/hr/CandidateEvaluation";
import InterviewScheduler from "./pages/hr/InterviewScheduler";
import JobListingsManagement from "./pages/hr/JobListingsManagement";
import HiringInsights from "./pages/hr/HiringInsights";
import HRPayroll from "./pages/hr/HRPayroll";
import TrainingDevelopment from "./pages/hr/TrainingDevelopment";
import BenefitsCompensation from "./pages/hr/BenefitsCompensation";
import HRPerformance from "./pages/hr/HRPerformance";
import HRGoals from "./pages/hr/HRGoals";
import EmployeeEngagementHR from "./pages/hr/EmployeeEngagementHR";
import EmployeeRecognitionHR from "./pages/hr/EmployeeRecognitionHR";
import BurnoutAndRisk from "./pages/hr/BurnoutAndRisk";
// Manager pages
import ManagerTeamOverview from "./pages/manager/ManagerTeamOverview";
import ManagerPerformanceAnalysis from "./pages/manager/ManagerPerformanceAnalysis";
import ProjectManagement from "./pages/manager/ProjectManagement";
import ManagerLeaveRequests from "./pages/manager/ManagerLeaveRequests";
import ManagerReportingTools from "./pages/manager/ManagerReportingTools";
import ManagerCommunication from "./pages/manager/ManagerCommunication";
import ManagerDocuments from "./pages/manager/ManagerDocuments";
import PredictiveAnalysis from "./pages/manager/PredictiveAnalysis";
// Employee pages
import Attendance from "./pages/employee/Attendance";
import LeaveApplyAndHistory from "./pages/employee/LeaveApplyAndHistory";
import EmployeePayroll from "./pages/employee/EmployeePayroll";
import EmployeeAnnouncements from "./pages/employee/EmployeeAnnouncements";
import Policies from "./pages/employee/Policies";
import EmployeeDocuments from "./pages/employee/EmployeeDocuments";
import EmployeePerformance from "./pages/employee/EmployeePerformance";
import EmployeeTasks from "./pages/employee/EmployeeTasks";
import EmployeeTraining from "./pages/employee/EmployeeTraining";
import Events from "./pages/employee/Events";
import HelpDesk from "./pages/employee/HelpDesk";

const queryClient = new QueryClient();

const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'hr':
      return <HRDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'employee':
      return <EmployeeDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <DashboardRouter />
                </DashboardLayout>
              }
            />
            <Route
              path="/hr/resume-screener"
              element={
                <DashboardLayout>
                  <ResumeScreener />
                </DashboardLayout>
              }
            />
            <Route path="/admin/users" element={<DashboardLayout><UserManagement /></DashboardLayout>} />
            <Route path="/admin/company" element={<DashboardLayout><CompanyOverview /></DashboardLayout>} />
            <Route path="/admin/payroll" element={<DashboardLayout><PayrollManagement /></DashboardLayout>} />
            <Route path="/admin/leave-attendance" element={<DashboardLayout><LeaveAttendance /></DashboardLayout>} />
            <Route path="/admin/roles" element={<DashboardLayout><RoleManagement /></DashboardLayout>} />
            <Route path="/admin/departments" element={<DashboardLayout><DepartmentHierarchy /></DashboardLayout>} />
            <Route path="/admin/audit-logs" element={<DashboardLayout><AuditLogs /></DashboardLayout>} />
            <Route path="/admin/org-dashboard" element={<DashboardLayout><OrganizationDashboard /></DashboardLayout>} />
            <Route path="/admin/bulk-users" element={<DashboardLayout><BulkUserImportExport /></DashboardLayout>} />
            <Route path="/admin/sso" element={<DashboardLayout><SSOIntegration /></DashboardLayout>} />
            <Route path="/admin/maintenance" element={<DashboardLayout><SystemMaintenance /></DashboardLayout>} />
            <Route path="/admin/lifecycle" element={<DashboardLayout><EmployeeLifecycle /></DashboardLayout>} />
            <Route path="/admin/goals" element={<DashboardLayout><GoalTracking /></DashboardLayout>} />
            <Route path="/admin/recognition" element={<DashboardLayout><EmployeeRecognition /></DashboardLayout>} />
            <Route path="/admin/burnout" element={<DashboardLayout><EmployeeBurnout /></DashboardLayout>} />
            <Route path="/admin/engagement" element={<DashboardLayout><EmployeeEngagement /></DashboardLayout>} />
            <Route path="/admin/announcements" element={<DashboardLayout><SystemAnnouncements /></DashboardLayout>} />
            <Route path="/admin/communications" element={<DashboardLayout><EmailSMSSettings /></DashboardLayout>} />
            <Route path="/admin/chat-moderator" element={<DashboardLayout><ChatModerator /></DashboardLayout>} />
            <Route path="/admin/documents" element={<DashboardLayout><DocumentManagement /></DashboardLayout>} />
            <Route path="/admin/backup" element={<DashboardLayout><DataBackupRecovery /></DashboardLayout>} />
            <Route path="/admin/compliance" element={<DashboardLayout><ComplianceTracking /></DashboardLayout>} />
            <Route path="/admin/risk" element={<DashboardLayout><RiskManagement /></DashboardLayout>} />
            <Route path="/admin/reports" element={<DashboardLayout><CustomReportBuilder /></DashboardLayout>} />
            <Route path="/admin/workflows" element={<DashboardLayout><AutomatedWorkflow /></DashboardLayout>} />
            <Route path="/admin/api" element={<DashboardLayout><APIManagement /></DashboardLayout>} />
            <Route path="/admin/integrations" element={<DashboardLayout><ThirdPartyIntegration /></DashboardLayout>} />
            <Route path="/admin/recruitment" element={<DashboardLayout><RecruitmentManagement /></DashboardLayout>} />
            <Route path="/admin/training" element={<DashboardLayout><TrainingDevelopment /></DashboardLayout>} />
            <Route path="/admin/benefits" element={<DashboardLayout><BenefitsCompensation /></DashboardLayout>} />
            <Route path="/admin/performance" element={<DashboardLayout><HRPerformance /></DashboardLayout>} />
            
            {/* HR Routes */}
            <Route path="/hr/recruitment" element={<DashboardLayout><RecruitmentManagement /></DashboardLayout>} />
            <Route path="/hr/departments" element={<DashboardLayout><HRDepartments /></DashboardLayout>} />
            <Route path="/hr/roles" element={<DashboardLayout><HRRolesPermissions /></DashboardLayout>} />
            <Route path="/hr/candidates" element={<DashboardLayout><CandidateEvaluation /></DashboardLayout>} />
            <Route path="/hr/interviews" element={<DashboardLayout><InterviewScheduler /></DashboardLayout>} />
            <Route path="/hr/job-listings" element={<DashboardLayout><JobListingsManagement /></DashboardLayout>} />
            <Route path="/hr/hiring-insights" element={<DashboardLayout><HiringInsights /></DashboardLayout>} />
            <Route path="/hr/job-generator" element={<DashboardLayout><JobListingsManagement /></DashboardLayout>} />
            <Route path="/hr/payroll" element={<DashboardLayout><HRPayroll /></DashboardLayout>} />
            <Route path="/hr/training" element={<DashboardLayout><TrainingDevelopment /></DashboardLayout>} />
            <Route path="/hr/benefits" element={<DashboardLayout><BenefitsCompensation /></DashboardLayout>} />
            <Route path="/hr/performance" element={<DashboardLayout><HRPerformance /></DashboardLayout>} />
            <Route path="/hr/goals" element={<DashboardLayout><HRGoals /></DashboardLayout>} />
            <Route path="/hr/engagement" element={<DashboardLayout><EmployeeEngagementHR /></DashboardLayout>} />
            <Route path="/hr/recognition" element={<DashboardLayout><EmployeeRecognitionHR /></DashboardLayout>} />
            <Route path="/hr/burnout" element={<DashboardLayout><BurnoutAndRisk /></DashboardLayout>} />
            <Route path="/hr/risk" element={<DashboardLayout><BurnoutAndRisk /></DashboardLayout>} />
            
            {/* Manager Routes */}
            <Route path="/manager/team" element={<DashboardLayout><ManagerTeamOverview /></DashboardLayout>} />
            <Route path="/manager/performance" element={<DashboardLayout><ManagerPerformanceAnalysis /></DashboardLayout>} />
            <Route path="/manager/projects" element={<DashboardLayout><ProjectManagement /></DashboardLayout>} />
            <Route path="/manager/leave-requests" element={<DashboardLayout><ManagerLeaveRequests /></DashboardLayout>} />
            <Route path="/manager/reports" element={<DashboardLayout><ManagerReportingTools /></DashboardLayout>} />
            <Route path="/manager/communication" element={<DashboardLayout><ManagerCommunication /></DashboardLayout>} />
            <Route path="/manager/documents" element={<DashboardLayout><ManagerDocuments /></DashboardLayout>} />
            <Route path="/manager/predictive" element={<DashboardLayout><PredictiveAnalysis /></DashboardLayout>} />
            
            {/* Employee Routes */}
            <Route path="/employee/clock" element={<DashboardLayout><ClockInOut /></DashboardLayout>} />
            <Route path="/employee/attendance" element={<DashboardLayout><Attendance /></DashboardLayout>} />
            <Route path="/employee/leave" element={<DashboardLayout><LeaveApplyAndHistory /></DashboardLayout>} />
            <Route path="/employee/payroll" element={<DashboardLayout><EmployeePayroll /></DashboardLayout>} />
            <Route path="/employee/announcements" element={<DashboardLayout><EmployeeAnnouncements /></DashboardLayout>} />
            <Route path="/employee/policies" element={<DashboardLayout><Policies /></DashboardLayout>} />
            <Route path="/employee/documents" element={<DashboardLayout><EmployeeDocuments /></DashboardLayout>} />
            <Route path="/employee/performance" element={<DashboardLayout><EmployeePerformance /></DashboardLayout>} />
            <Route path="/employee/tasks" element={<DashboardLayout><EmployeeTasks /></DashboardLayout>} />
            <Route path="/employee/training" element={<DashboardLayout><EmployeeTraining /></DashboardLayout>} />
            <Route path="/employee/events" element={<DashboardLayout><Events /></DashboardLayout>} />
            <Route path="/employee/helpdesk" element={<DashboardLayout><HelpDesk /></DashboardLayout>} />
            <Route path="/employee/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
            <Route
              path="/profile"
              element={
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              }
            />
            <Route
              path="/help"
              element={
                <DashboardLayout>
                  <HelpSupport />
                </DashboardLayout>
              }
            />
            <Route
              path="/*"
              element={
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-2">Page Under Development</h2>
                    <p className="text-muted-foreground">This feature is coming soon!</p>
                  </div>
                </DashboardLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
