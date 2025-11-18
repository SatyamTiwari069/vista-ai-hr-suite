import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function EngagementRecognitionHR() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Engagement"
        description="Monitor and improve employee engagement"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">7.8/10</p>
            <p className="text-sm text-muted-foreground mt-1">+0.5 from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Survey Response</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">68%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recognition Given</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">234</p>
            <p className="text-sm text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Initiatives</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { initiative: 'Team Building Events', status: 'Active' },
            { initiative: 'Wellness Program', status: 'Active' },
            { initiative: 'Mentorship Program', status: 'Planned' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">{item.initiative}</span>
              <span className={`text-xs px-2 py-1 rounded ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
