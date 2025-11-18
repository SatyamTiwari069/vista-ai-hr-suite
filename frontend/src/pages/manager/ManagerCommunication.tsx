import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export default function CommunicationHub() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Communication Hub"
        description="Communicate with your team effectively"
        actions={[{ label: 'New Message', variant: 'default', onClick: () => alert('New message') }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
            <p className="text-sm text-muted-foreground mt-1">Unread</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8</p>
            <p className="text-sm text-muted-foreground mt-1">Active</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { from: 'John Smith', message: 'Project update available', time: '1h ago' },
            { from: 'Team Channel', message: 'Meeting scheduled for tomorrow', time: '3h ago' },
          ].map((msg, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">{msg.from}</p>
                <p className="text-sm text-muted-foreground">{msg.message}</p>
              </div>
              <span className="text-xs text-muted-foreground">{msg.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
