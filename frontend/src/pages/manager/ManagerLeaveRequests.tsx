import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export default function LeaveRequests() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Requests"
        description="Manage and approve team leave requests"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approved This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>On Leave Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { employee: 'John Smith', type: 'Vacation', dates: 'Nov 25-28', days: 4 },
            { employee: 'Jane Doe', type: 'Sick Leave', dates: 'Nov 20', days: 1 },
            { employee: 'Bob Wilson', type: 'Personal', dates: 'Dec 1-3', days: 3 },
          ].map((request, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{request.employee}</p>
                <p className="text-sm text-muted-foreground">{request.type} • {request.dates} ({request.days} days)</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-green-600">Approve</Button>
                <Button variant="destructive" size="sm">Reject</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
