import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export default function TeamOverview() {
  const teamMembers = [
    { id: 1, name: 'Alice Johnson', position: 'Senior Dev', rating: 4.5, status: 'active' },
    { id: 2, name: 'Bob Smith', position: 'Junior Dev', rating: 4.2, status: 'active' },
    { id: 3, name: 'Carol Davis', position: 'QA Engineer', rating: 4.8, status: 'active' },
    { id: 4, name: 'David Wilson', position: 'Tech Lead', rating: 4.7, status: 'on_leave' },
  ];

  const performanceData = [
    { month: 'Jan', score: 3.8, target: 4.0 },
    { month: 'Feb', score: 3.9, target: 4.0 },
    { month: 'Mar', score: 4.1, target: 4.0 },
    { month: 'Apr', score: 4.0, target: 4.0 },
    { month: 'May', score: 4.2, target: 4.0 },
    { month: 'Jun', score: 4.3, target: 4.0 },
  ];

  const attendanceData = [
    { name: 'Present', value: 92, color: '#10b981' },
    { name: 'Absent', value: 5, color: '#ef4444' },
    { name: 'On Leave', value: 3, color: '#3b82f6' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Overview</h1>
        <p className="text-muted-foreground mt-2">Manage and monitor your team performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Size</p>
                <p className="text-2xl font-bold mt-2">5</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <p className="text-2xl font-bold mt-2">4.3/5</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold mt-2">1</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-2xl font-bold mt-2">95%</p>
              </div>
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="team" className="w-full">
        <TabsList>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Current team composition and individual performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Position</th>
                      <th className="text-left py-3 px-4">Performance</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b hover:bg-accent">
                        <td className="py-3 px-4 font-medium">{member.name}</td>
                        <td className="py-3 px-4">{member.position}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded h-2">
                              <div
                                className="bg-green-500 h-2 rounded"
                                style={{ width: `${member.rating * 20}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{member.rating}/5</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Trend</CardTitle>
              <CardDescription>Average performance score vs target</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[3, 4.5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" name="Team Score" />
                  <Line type="monotone" dataKey="target" stroke="#10b981" strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Current team projects and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Mobile App Redesign', progress: 75, team: 3 },
                { name: 'API Integration', progress: 60, team: 2 },
                { name: 'Performance Optimization', progress: 40, team: 4 },
              ].map((project, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div className="bg-blue-500 h-2 rounded" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{project.team} team members</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
