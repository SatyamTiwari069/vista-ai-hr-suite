import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, Calendar } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

export default function ManagerTeamOverview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Overview"
        description="Manage and monitor your team"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Team Size"
          value="12"
          change="All active"
          icon={Users}
          trend="neutral"
        />
        <StatCard
          title="Avg Performance"
          value="4.3/5"
          change="+0.2 from last month"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="On Leave"
          value="2"
          change="This week"
          icon={Calendar}
          trend="neutral"
        />
        <StatCard
          title="Overdue Tasks"
          value="5"
          change="3 from last week"
          icon={TrendingUp}
          trend="down"
        />
      </div>

      <Tabs defaultValue="team">
        <TabsList>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'John Smith', role: 'Senior Developer', status: 'Active' },
                { name: 'Jane Doe', role: 'Designer', status: 'Active' },
                { name: 'Bob Wilson', role: 'Product Manager', status: 'On Leave' },
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {member.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Performance analytics coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Team Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Task tracking coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
