import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Briefcase, TrendingUp, DollarSign, Calendar, AlertCircle } from 'lucide-react';

export default function CompanyOverview() {
  const departmentData = [
    { name: 'Engineering', value: 250, color: '#3b82f6' },
    { name: 'Sales', value: 150, color: '#10b981' },
    { name: 'HR', value: 45, color: '#f59e0b' },
    { name: 'Finance', value: 60, color: '#ef4444' },
    { name: 'Operations', value: 80, color: '#8b5cf6' },
  ];

  const employmentTrendData = [
    { month: 'Jan', count: 800 },
    { month: 'Feb', count: 850 },
    { month: 'Mar', count: 920 },
    { month: 'Apr', count: 980 },
    { month: 'May', count: 1050 },
    { month: 'Jun', count: 1150 },
  ];

  const attritionData = [
    { month: 'Jan', rate: 2.5 },
    { month: 'Feb', rate: 2.1 },
    { month: 'Mar', rate: 3.2 },
    { month: 'Apr', rate: 2.8 },
    { month: 'May', rate: 1.9 },
    { month: 'Jun', rate: 2.3 },
  ];

  const stats = [
    { label: 'Total Employees', value: '1,234', icon: Users, trend: '+5.2%' },
    { label: 'Open Positions', value: '23', icon: Briefcase, trend: '+2.1%' },
    { label: 'Average Performance', value: '4.2/5', icon: TrendingUp, trend: '+0.3' },
    { label: 'Annual Payroll', value: '$45.2M', icon: DollarSign, trend: '+12.5%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Overview</h1>
        <p className="text-muted-foreground mt-2">Organization-wide metrics and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-2">{stat.trend}</p>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Employment Growth</CardTitle>
                <CardDescription>Employee count over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={employmentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#3b82f6" name="Total Employees" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attrition Rate</CardTitle>
                <CardDescription>Monthly employee attrition percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attritionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rate" fill="#ef4444" name="Attrition %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Distribution by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={departmentData} cx="50%" cy="50%" labelLine={false} label={{ key: 'name' }} outerRadius={80} fill="#8884d8" dataKey="value">
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentData.map((dept, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                        <span className="font-medium">{dept.name}</span>
                      </div>
                      <span className="text-muted-foreground">{dept.value} employees</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics Summary</CardTitle>
              <CardDescription>Important organizational metrics and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-yellow-900">High Attrition in Engineering</p>
                  <p className="text-sm text-yellow-800">Recent turnover rate increased by 15%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Employee Satisfaction Score</span>
                  <span className="font-medium">3.8/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Promotion Rate (YTD)</span>
                  <span className="font-medium">12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Training Completion Rate</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Tenure</span>
                  <span className="font-medium">4.2 years</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
