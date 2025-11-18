import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Check, X, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function LeaveAttendance() {
  const attendanceData = [
    { month: 'Jan', present: 800, absent: 50, onLeave: 100 },
    { month: 'Feb', present: 820, absent: 40, onLeave: 90 },
    { month: 'Mar', present: 850, absent: 45, onLeave: 105 },
    { month: 'Apr', present: 880, absent: 30, onLeave: 90 },
    { month: 'May', present: 900, absent: 25, onLeave: 75 },
    { month: 'Jun', present: 920, absent: 20, onLeave: 60 },
  ];

  const leaveRequests = [
    {
      id: 1,
      employeeName: 'John Doe',
      leaveType: 'Paid Leave',
      startDate: '2024-07-01',
      endDate: '2024-07-05',
      days: 5,
      status: 'pending',
      reason: 'Vacation',
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      leaveType: 'Sick Leave',
      startDate: '2024-06-20',
      endDate: '2024-06-21',
      days: 2,
      status: 'approved',
      reason: 'Medical appointment',
    },
  ];

  const handleApprove = (id: number) => {
    toast.success('Leave approved');
  };

  const handleReject = (id: number) => {
    toast.error('Leave rejected');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leave & Attendance</h1>
        <p className="text-muted-foreground mt-2">Manage employee leaves and attendance</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Present Today</p>
                  <p className="text-2xl font-bold mt-2">892</p>
                  <p className="text-xs text-green-600 mt-2">Out of 950</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">On Leave</p>
                  <p className="text-2xl font-bold mt-2">42</p>
                  <p className="text-xs text-blue-600 mt-2">4.4%</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Absent</p>
                  <p className="text-2xl font-bold mt-2">16</p>
                  <p className="text-xs text-red-600 mt-2">1.7%</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  <p className="text-2xl font-bold mt-2">96.8%</p>
                  <p className="text-xs text-muted-foreground mt-2">This month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
              <CardDescription>Last 6 months attendance pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#10b981" name="Present" />
                  <Bar dataKey="onLeave" fill="#3b82f6" name="On Leave" />
                  <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Leave Requests</CardTitle>
              <CardDescription>Approve or reject employee leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{request.employeeName}</h3>
                        <p className="text-sm text-muted-foreground">{request.leaveType}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        request.status === 'approved' ? 'bg-green-100 text-green-700' :
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Period</p>
                        <p className="font-medium">{request.startDate} to {request.endDate}</p>
                        <p className="text-muted-foreground">{request.days} days</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reason</p>
                        <p className="font-medium">{request.reason}</p>
                      </div>
                    </div>
                    {request.status === 'pending' && (
                      <div className="flex gap-2 pt-3 border-t">
                        <Button size="sm" onClick={() => handleApprove(request.id)}>
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleReject(request.id)}>
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>Manually mark or correct attendance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Employee ID" />
                <Input type="date" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="half_day">Half Day</SelectItem>
                    <SelectItem value="on_leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Mark Attendance</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
