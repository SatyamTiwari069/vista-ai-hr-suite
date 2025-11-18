import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SystemAnnouncements() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="System Announcements"
        description="Create and manage company-wide announcements"
        actions={[{ label: 'New Announcement', variant: 'default' }]}
      />

      <div className="space-y-3">
        {[
          { title: 'Holiday Schedule', date: 'Nov 18', priority: 'High' },
          { title: 'Office Closure Notice', date: 'Nov 17', priority: 'High' },
          { title: 'New Benefits Program', date: 'Nov 15', priority: 'Medium' },
        ].map((item, i) => (
          <Card key={i}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className={`text-xs px-2 py-1 rounded ${item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {item.priority}
                </span>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
