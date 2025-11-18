import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ChatModerator() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Chat Moderator"
        description="Manage and moderate company chat channels"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flagged Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['general', 'announcements', 'engineering', 'sales'].map((channel, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">#{channel}</span>
              <Button variant="outline" size="sm">Moderate</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
