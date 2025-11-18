import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Users, DollarSign, Building } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

export default function OrganizationDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Dashboard"
        description="Complete organizational metrics and performance overview"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Employees"
          value="1,234"
          change="+5% from last month"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Departments"
          value="12"
          change="All active"
          icon={Building}
          trend="neutral"
        />
        <StatCard
          title="Avg Salary"
          value="$5.2K"
          change="+2% from last year"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Growth Rate"
          value="8.2%"
          change="Year over year"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Retention Rate"
          value="94.2%"
          change="+3% from last year"
          icon={Users}
          trend="up"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="growth">Growth Metrics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Employee Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Engineering', count: 234, percentage: '19%' },
                    { name: 'Sales', count: 198, percentage: '16%' },
                    { name: 'HR', count: 89, percentage: '7%' },
                    { name: 'Operations', count: 156, percentage: '13%' },
                    { name: 'Marketing', count: 123, percentage: '10%' },
                  ].map((dept, i) => (
                    <div key={i} className="flex justify-between items-center pb-3 border-b last:border-0">
                      <span className="text-sm font-medium">{dept.name}</span>
                      <div className="flex gap-3">
                        <span className="text-sm text-muted-foreground">{dept.count}</span>
                        <span className="text-sm text-primary font-medium">{dept.percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Headcount Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end justify-around">
                  {[240, 260, 280, 300, 320, 340].map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div 
                        className="w-8 bg-gradient-hero rounded-t"
                        style={{ height: `${val / 3.4}px` }}
                      />
                      <span className="text-xs text-muted-foreground">{i + 1}Q</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Engineering', 'Sales', 'HR', 'Operations', 'Marketing', 'Finance'].map((dept, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent transition-colors">
                    <span className="font-medium">{dept}</span>
                    <span className="text-sm text-muted-foreground">Manage</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Growth Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Year-over-year Growth</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-gradient-hero" />
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Trend data visualization coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
