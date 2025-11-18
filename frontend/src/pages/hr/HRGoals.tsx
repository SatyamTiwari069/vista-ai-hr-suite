import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GoalTrackingHR() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Goal Tracking"
        description="Set and monitor employee and organizational goals"
        actions={[{ label: 'New Goal', variant: 'default', onClick: () => alert('New HR goal') }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">456</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>On Track</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">389</p>
            <p className="text-sm text-muted-foreground mt-1">85%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">67</p>
            <p className="text-sm text-muted-foreground mt-1">15%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Team's Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { title: 'Revenue Growth', owner: 'Sales Team', progress: 75 },
            { title: 'Customer Retention', owner: 'Customer Success', progress: 82 },
            { title: 'Product Development', owner: 'Engineering', progress: 60 },
          ].map((goal, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{goal.title}</p>
                <p className="text-sm text-muted-foreground">{goal.owner}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{goal.progress}%</span>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
