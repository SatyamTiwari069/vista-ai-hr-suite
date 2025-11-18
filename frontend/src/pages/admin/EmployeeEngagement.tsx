import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function EmployeeEngagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Engagement"
        description="Monitor engagement metrics and employee feedback"
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Engagement Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">7.8/10</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Surveys</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">68%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Feedback Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">156</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['Culture improvement needed', 'Great work-life balance', 'Career growth opportunities'].map((feedback, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <p className="font-medium">{feedback}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
