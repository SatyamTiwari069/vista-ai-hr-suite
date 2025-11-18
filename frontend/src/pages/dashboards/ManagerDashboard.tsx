import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/StatCard';
import { AIChatbot } from '@/components/ai/AIChatbot';
import { 
  Users, TrendingUp, Calendar, Briefcase, 
  CheckCircle, BarChart3, MessageSquare, FileText 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const teamMembers = [
    { name: 'Alice Kumar', position: 'Senior Developer', performance: 92, status: 'active' },
    { name: 'Bob Smith', position: 'Developer', performance: 85, status: 'active' },
    { name: 'Carol White', position: 'QA Engineer', performance: 88, status: 'on_leave' },
    { name: 'David Lee', position: 'Developer', performance: 79, status: 'active' },
    { name: 'Eve Johnson', position: 'Tech Lead', performance: 95, status: 'active' },
  ];

  const projects = [
    { name: 'Mobile App Redesign', progress: 75, deadline: '2024-02-15', status: 'On Track' },
    { name: 'Backend Optimization', progress: 45, deadline: '2024-03-01', status: 'On Track' },
    { name: 'API Integration', progress: 60, deadline: '2024-02-28', status: 'At Risk' },
    { name: 'Database Migration', progress: 30, deadline: '2024-03-15', status: 'Not Started' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manager Dashboard</h1>
        <p className="text-muted-foreground">Team oversight, performance analysis, and project management</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Team Members"
              value="5"
              change="4 available today"
              icon={Users}
              trend="up"
            />
            <StatCard
              title="Active Projects"
              value="4"
              change="2 on track, 1 at risk"
              icon={Briefcase}
              trend="up"
            />
            <StatCard
              title="Avg Performance"
              value="88/100"
              change="+5 from last quarter"
              icon={TrendingUp}
              trend="up"
            />
            <StatCard
              title="Pending Approvals"
              value="8"
              change="4 leave requests"
              icon={CheckCircle}
              trend="up"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Team Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.position}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                            {member.status}
                          </Badge>
                          <span className="text-sm font-bold">{member.performance}%</span>
                        </div>
                      </div>
                      <Progress value={member.performance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <AIChatbot />
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <div className="flex gap-4">
            <Input placeholder="Search team members..." className="flex-1" />
            <Button className="bg-gradient-hero">+ Add Team Member</Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.map((member, i) => (
                    <div key={i} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                        </div>
                        <Badge variant="outline">{member.performance}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Attendance This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { day: 'Monday', present: 5, absent: 0, leave: 0 },
                    { day: 'Tuesday', present: 4, absent: 1, leave: 0 },
                    { day: 'Wednesday', present: 5, absent: 0, leave: 0 },
                    { day: 'Thursday', present: 3, absent: 0, leave: 2 },
                    { day: 'Friday', present: 4, absent: 0, leave: 1 },
                  ].map((day, i) => (
                    <div key={i} className="flex justify-between p-2 bg-muted rounded">
                      <span className="text-sm font-medium">{day.day}</span>
                      <div className="flex gap-2 text-xs">
                        <Badge className="bg-green-500">{day.present} Present</Badge>
                        {day.absent > 0 && <Badge className="bg-red-500">{day.absent} Absent</Badge>}
                        {day.leave > 0 && <Badge className="bg-orange-500">{day.leave} Leave</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Communication Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Team Chat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule 1-on-1
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex gap-4">
            <Button className="bg-gradient-hero">+ New Project</Button>
            <Input placeholder="Search projects..." className="flex-1" />
          </div>

          <div className="grid gap-6">
            {projects.map((project, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Due: {project.deadline}</p>
                    </div>
                    <Badge variant={
                      project.status === 'On Track' ? 'default' :
                      project.status === 'At Risk' ? 'destructive' :
                      'secondary'
                    }>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-bold">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Advanced project analytics coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { metric: 'Team Productivity', value: 88 },
                  { metric: 'Quality Score', value: 92 },
                  { metric: 'Delivery Rate', value: 85 },
                  { metric: 'Employee Satisfaction', value: 87 },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.metric}</span>
                      <span className="font-bold">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Conduct Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Set Goals
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Provide Feedback
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Predictive Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                AI-powered performance predictions and insights coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Leave Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Carol White', type: 'Sick Leave', dates: 'Jan 15-17', status: 'Pending' },
                  { name: 'David Lee', type: 'Vacation', dates: 'Jan 22-29', status: 'Pending' },
                  { name: 'Eve Johnson', type: 'Personal', dates: 'Jan 31', status: 'Approved' },
                ].map((request, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm">{request.name}</p>
                        <p className="text-xs text-muted-foreground">{request.type}</p>
                      </div>
                      <Badge variant={request.status === 'Approved' ? 'default' : 'secondary'}>
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{request.dates}</p>
                    {request.status === 'Pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="h-7 text-xs">Approve</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs">Reject</Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Other Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Promotion Requests (2)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Transfer Requests (1)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Training Approvals (3)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Equipment Requests (2)
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
