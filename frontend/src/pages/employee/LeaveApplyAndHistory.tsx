import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle } from 'lucide-react';

export default function LeaveApplyAndHistory() {
  const [activeTab, setActiveTab] = React.useState('apply');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Management"
        description="Apply for leave and view your leave history"
        actions={[{ label: 'Apply for Leave', variant: 'default', onClick: () => alert('Apply for leave') }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">1</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">8</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Remaining Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { type: 'Vacation', dates: 'Nov 1-5', status: 'Approved', days: 5 },
            { type: 'Sick Leave', dates: 'Nov 8', status: 'Approved', days: 1 },
            { type: 'Personal', dates: 'Dec 1', status: 'Pending', days: 1 },
          ].map((leave, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{leave.type}</p>
                  <p className="text-sm text-muted-foreground">{leave.dates} • {leave.days} days</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${leave.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {leave.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
