import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

export default function HelpDesk() {
  const [activeTab, setActiveTab] = React.useState('tickets');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Help Desk"
        description="Get support and submit support tickets"
        actions={[{ label: 'New Ticket', variant: 'default', onClick: () => alert('New support ticket') }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">8</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg Response</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2 hours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Support Tickets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { id: '#TK001', issue: 'Password reset not working', status: 'In Progress', date: 'Nov 18' },
            { id: '#TK002', issue: 'Benefits enrollment issue', status: 'Resolved', date: 'Nov 15' },
            { id: '#TK003', issue: 'Software access request', status: 'Pending', date: 'Nov 12' },
          ].map((ticket, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{ticket.id}: {ticket.issue}</p>
                  <p className="text-sm text-muted-foreground">{ticket.date}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' : ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {ticket.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>FAQs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            'How to request leave?',
            'How to view my payslip?',
            'How to reset password?',
          ].map((faq, i) => (
            <div key={i} className="flex items-center justify-between p-2 border-b last:border-0">
              <span className="text-sm">{faq}</span>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
