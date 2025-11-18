import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PartyPopper } from 'lucide-react';

export default function Events() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Event Management"
        description="View and register for company events"
      />

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { event: 'Company Holiday Party', date: 'Dec 15, 2025', location: 'Grand Ballroom', registered: true },
            { event: 'Team Building Day', date: 'Dec 8, 2025', location: 'Adventure Park', registered: false },
            { event: 'Quarterly All-Hands', date: 'Nov 25, 2025', location: 'Main Office', registered: true },
            { event: 'Wellness Workshop', date: 'Nov 22, 2025', location: 'Conference Room A', registered: false },
          ].map((evt, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <PartyPopper className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">{evt.event}</p>
                  <p className="text-sm text-muted-foreground">{evt.date} • {evt.location}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {evt.registered ? (
                  <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Registered</span>
                ) : (
                  <Button variant="outline" size="sm">Register</Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
