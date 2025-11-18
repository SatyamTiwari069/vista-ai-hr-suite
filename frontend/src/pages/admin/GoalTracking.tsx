import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function GoalTracking() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Goal Tracking"
        description="Set and monitor organizational and individual goals"
        actions={[{ label: 'Create Goal', variant: 'default', onClick: () => alert('Create goal') }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">234</p>
            <p className="text-sm text-muted-foreground mt-1">Active goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>On Track</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">189</p>
            <p className="text-sm text-muted-foreground mt-1">80.8% completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">45</p>
            <p className="text-sm text-muted-foreground mt-1">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: 'Q4 Revenue Target', progress: 85 },
            { title: 'Customer Satisfaction', progress: 72 },
            { title: 'Team Development', progress: 90 },
          ].map((goal, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <p className="font-medium">{goal.title}</p>
                <span className="text-sm text-muted-foreground">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
