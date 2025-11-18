import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/StatCard';
import { AIChatbot } from '@/components/ai/AIChatbot';
import { 
  Users, Briefcase, DollarSign, TrendingUp, Calendar, Clock, 
  Settings, Shield, BarChart3, FileText, CheckCircle, AlertCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const activities = [
    { icon: Users, text: '5 new employees onboarded', time: '2 hours ago', type: 'success' },
    { icon: Calendar, text: '12 leave requests pending', time: '4 hours ago', type: 'warning' },
    { icon: Briefcase, text: 'Job posting published: Senior Developer', time: '6 hours ago', type: 'info' },
    { icon: Clock, text: 'System backup completed', time: '1 day ago', type: 'success' },
    { icon: AlertCircle, text: 'Compliance audit scheduled', time: '2 days ago', type: 'alert' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Complete system overview, management, and control</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Employees"
              value="1,234"
              change="+12% from last month"
              icon={Users}
              trend="up"
            />
            <StatCard
              title="Open Positions"
              value="23"
              change="+5 new this week"
              icon={Briefcase}
              trend="up"
            />
            <StatCard
              title="Payroll This Month"
              value="$2.4M"
              change="-2% from last month"
              icon={DollarSign}
              trend="down"
            />
            <StatCard
              title="Avg Performance"
              value="4.2/5"
              change="+0.3 from last quarter"
              icon={TrendingUp}
              trend="up"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <activity.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant={activity.type === 'success' ? 'default' : 'secondary'}>
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <AIChatbot />
          </div>
        </TabsContent>

        {/* Users Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input placeholder="Search users..." />
            </div>
            <Button className="bg-gradient-hero">+ Add User</Button>
            <Button variant="outline">Import Users</Button>
            <Button variant="outline">Export</Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Users by Role</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { role: 'Admin', count: 5, icon: Shield },
                    { role: 'HR Managers', count: 15, icon: Users },
                    { role: 'Managers', count: 45, icon: Briefcase },
                    { role: 'Employees', count: 1169, icon: Users },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{item.role}</span>
                        </div>
                        <Badge variant="outline">{item.count}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'New User Registration', count: 8 },
                    { name: 'Role Change Requests', count: 3 },
                    { name: 'Access Requests', count: 12 },
                    { name: 'Deactivation Requests', count: 2 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{item.name}</span>
                      <Badge>{item.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                User list and management interface coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'API Server', status: 'online', uptime: '99.9%' },
                    { name: 'Database', status: 'online', uptime: '100%' },
                    { name: 'Cache Server', status: 'online', uptime: '98.5%' },
                    { name: 'Email Service', status: 'online', uptime: '99.8%' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">●</Badge>
                        <span className="text-xs">{item.uptime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Restore Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Database Optimization
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Cleanup Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                System logs and maintenance interface coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'HR Analytics', icon: BarChart3 },
              { title: 'Payroll Reports', icon: DollarSign },
              { title: 'Attendance Summary', icon: Calendar },
              { title: 'Performance Analysis', icon: TrendingUp },
              { title: 'Recruitment Pipeline', icon: Users },
              { title: 'Compliance Report', icon: CheckCircle },
            ].map((report, i) => {
              const Icon = report.icon;
              return (
                <Card key={i} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className="h-5 w-5 text-primary" />
                      {report.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-hero">Generate Report</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Custom report builder interface coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  SSO Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  API Keys Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  IP Whitelist
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Password Policy
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Audit logs interface coming soon
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Company Information
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Department Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Workflow Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Email & SMS Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Third-Party Integrations
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Webhook Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  API Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Zapier Integration
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Feature flags configuration coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
