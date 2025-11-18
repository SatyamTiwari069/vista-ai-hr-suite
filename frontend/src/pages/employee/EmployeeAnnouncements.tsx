import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export default function CompanyAnnouncements() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Announcements"
        description="Stay updated with company news and announcements"
      />

      <Card>
        <CardHeader>
          <CardTitle>Latest Announcements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: 'Holiday Schedule 2026', date: 'Nov 18', category: 'HR' },
            { title: 'Office Holiday Party', date: 'Nov 17', category: 'Event' },
            { title: 'New Benefits Program', date: 'Nov 15', category: 'Benefits' },
            { title: 'System Upgrade Scheduled', date: 'Nov 12', category: 'IT' },
          ].map((announcement, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{announcement.title}</p>
                  <p className="text-sm text-muted-foreground">{announcement.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">{announcement.category}</span>
                <Button variant="outline" size="sm">Read</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
