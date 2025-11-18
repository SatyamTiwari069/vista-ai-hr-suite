import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/StatCard';
import { AIChatbot } from '@/components/ai/AIChatbot';
import { 
  Clock, Calendar, DollarSign, TrendingUp, 
  Award, FileText, Briefcase, Heart, HelpCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [clockedIn, setClockedIn] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  const handleClockInClick = () => {
    setClockedIn(true);
  };

  const handleClockOutClick = () => {
    setClockedIn(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Employee Dashboard</h1>
        <p className="text-muted-foreground">Personal workspace for attendance, leave, payroll, and more</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Days Attended"
              value="18"
              change="This month"
              icon={Calendar}
              trend="up"
            />
            <StatCard
              title="Leave Balance"
              value="12"
              change="Days remaining"
              icon={Calendar}
              trend="up"
            />
            <StatCard
              title="Next Salary"
              value="$5,200"
              change="Due on 31st"
              icon={DollarSign}
              trend="up"
            />
            <StatCard
              title="Performance"
              value="4.3/5"
              change="Last review"
              icon={TrendingUp}
              trend="up"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>My Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="bg-gradient-hero h-12"
                      onClick={clockedIn ? handleClockOutClick : handleClockInClick}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {clockedIn ? 'Clock Out' : 'Clock In'}
                    </Button>
                    <Button variant="outline" className="h-12" onClick={() => setShowLeaveForm(!showLeaveForm)}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Apply Leave
                    </Button>
                    <Button variant="outline" className="h-12">
                      <FileText className="h-4 w-4 mr-2" />
                      View Payslip
                    </Button>
                    <Button variant="outline" className="h-12">
                      <Briefcase className="h-4 w-4 mr-2" />
                      My Profile
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">This Month's Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Days Present</span>
                      <Badge>18</Badge>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Days Absent</span>
                      <Badge>0</Badge>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Days on Leave</span>
                      <Badge>2</Badge>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Hours Worked</span>
                      <Badge>168 hrs</Badge>
                    </div>
                  </div>
                </div>

                {showLeaveForm && (
                  <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                    <h3 className="font-semibold">Apply for Leave</h3>
                    <Input placeholder="Select leave type" />
                    <Input type="date" placeholder="Start date" />
                    <Input type="date" placeholder="End date" />
                    <Textarea placeholder="Reason for leave..." className="min-h-20" />
                    <div className="flex gap-2">
                      <Button className="bg-gradient-hero">Submit</Button>
                      <Button variant="outline" onClick={() => setShowLeaveForm(false)}>Cancel</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <AIChatbot />
          </div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Attendance Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Current Status</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">{clockedIn ? 'Clocked In' : 'Clocked Out'}</p>
                    <p className="text-sm text-muted-foreground">Today</p>
                  </div>
                  <Button
                    className="bg-gradient-hero"
                    onClick={clockedIn ? handleClockOutClick : handleClockInClick}
                  >
                    {clockedIn ? 'Clock Out' : 'Clock In'}
                  </Button>
                </div>
              </div>

              {clockedIn && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm font-medium">Clock In Time: {new Date().toLocaleTimeString()}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: '2024-01-15', status: 'present', hours: 8 },
                  { date: '2024-01-16', status: 'present', hours: 8 },
                  { date: '2024-01-17', status: 'on_leave', hours: 0 },
                  { date: '2024-01-18', status: 'present', hours: 8 },
                  { date: '2024-01-19', status: 'present', hours: 7.5 },
                ].map((record, i) => (
                  <div key={i} className="flex justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{record.date}</p>
                      <Badge variant={
                        record.status === 'present' ? 'default' :
                        record.status === 'on_leave' ? 'secondary' :
                        'destructive'
                      }>
                        {record.status === 'present' ? 'Present' :
                         record.status === 'on_leave' ? 'Leave' : 'Absent'}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold">{record.hours}h</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leave Tab */}
        <TabsContent value="leave" className="space-y-6">
          <div className="flex gap-4">
            <Button className="bg-gradient-hero">+ Apply Leave</Button>
            <Input placeholder="Search leaves..." className="flex-1" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Paid Leave Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Days available</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Sick Leave Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Days available</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Personal Leave Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Days available</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Leave Requests History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: 'Paid Leave', dates: 'Jan 17-17', status: 'Approved', submitted: '5 days ago' },
                  { type: 'Sick Leave', dates: 'Jan 10-10', status: 'Approved', submitted: '2 weeks ago' },
                  { type: 'Personal Leave', dates: 'Dec 25-26', status: 'Approved', submitted: '1 month ago' },
                ].map((leave, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm">{leave.type}</p>
                        <p className="text-xs text-muted-foreground">{leave.dates}</p>
                      </div>
                      <Badge>{leave.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Submitted {leave.submitted}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Salary Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Monthly Salary</span>
                  <span className="font-bold">$5,200</span>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Basic Pay</span>
                  <span className="font-bold">$4,500</span>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Allowances</span>
                  <span className="font-bold">$700</span>
                </div>
                <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <span className="text-sm font-medium">Next Salary Date</span>
                  <span className="font-bold">Jan 31, 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payslips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { month: 'December 2023', amount: '$5,200', date: '2023-12-31' },
                  { month: 'November 2023', amount: '$5,200', date: '2023-11-30' },
                  { month: 'October 2023', amount: '$5,200', date: '2023-10-31' },
                ].map((payslip, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div>
                      <p className="font-medium text-sm">{payslip.month}</p>
                      <p className="text-xs text-muted-foreground">{payslip.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{payslip.amount}</span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Health Insurance', status: 'Active' },
                  { name: 'Dental Insurance', status: 'Active' },
                  { name: '401(k) Plan', status: 'Active', contribution: '5%' },
                  { name: 'Life Insurance', status: 'Active' },
                ].map((benefit, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-muted rounded">
                    <span className="text-sm font-medium">{benefit.name}</span>
                    <Badge>{benefit.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Overall Rating</span>
                  <Badge className="bg-green-500">4.3/5</Badge>
                </div>
                <Progress value={86} className="h-3" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Quality</span>
                  <Badge variant="outline">92%</Badge>
                </div>
                <Progress value={92} className="h-3" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Productivity</span>
                  <Badge variant="outline">88%</Badge>
                </div>
                <Progress value={88} className="h-3" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Collaboration</span>
                  <Badge variant="outline">95%</Badge>
                </div>
                <Progress value={95} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { goal: 'Complete Advanced Certification', progress: 75, deadline: '2024-03-31' },
                  { goal: 'Lead 2 Team Projects', progress: 50, deadline: '2024-06-30' },
                  { goal: 'Mentor New Developer', progress: 25, deadline: '2024-12-31' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{item.goal}</p>
                        <p className="text-xs text-muted-foreground">By {item.deadline}</p>
                      </div>
                      <span className="text-sm font-bold">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Last Review (Dec 2023)</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Help & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Browse FAQ
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Policies & Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Submit Support Ticket
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contact HR Team
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Wellness
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Wellness Programs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Mental Health Resources
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Schedule Health Check
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Benefits
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Company Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: 'New Office Policies', date: '2024-01-15', important: true },
                { title: 'Upcoming Training Programs', date: '2024-01-14', important: false },
                { title: 'Holiday Schedule 2024', date: '2024-01-10', important: true },
              ].map((announcement, i) => (
                <div key={i} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{announcement.title}</p>
                      <p className="text-xs text-muted-foreground">{announcement.date}</p>
                    </div>
                    {announcement.important && <Badge className="bg-red-500">Important</Badge>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
