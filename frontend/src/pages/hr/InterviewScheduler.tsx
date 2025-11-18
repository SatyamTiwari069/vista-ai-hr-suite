import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export default function InterviewScheduler() {
  const [view, setView] = useState('calendar');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interview Scheduler"
        description="Schedule and manage candidate interviews"
        actions={[{ label: 'Schedule Interview', variant: 'default', onClick: () => alert('Schedule interview') }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">45</p>
            <p className="text-sm text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.2/5</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { candidate: 'John Doe', position: 'Senior Engineer', date: 'Nov 20, 2:00 PM', interviewer: 'Sarah' },
            { candidate: 'Jane Smith', position: 'Product Manager', date: 'Nov 21, 10:00 AM', interviewer: 'Mike' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{item.candidate}</p>
                  <p className="text-sm text-muted-foreground">{item.position} • {item.date}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Reschedule</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
