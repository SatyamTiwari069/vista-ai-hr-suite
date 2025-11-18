import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function SystemMaintenance() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="System Maintenance"
        description="Monitor and manage system health and maintenance tasks"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">Operational</p>
            <p className="text-sm text-muted-foreground mt-1">All systems running normally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">99.99%</p>
            <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">2</p>
            <p className="text-sm text-muted-foreground mt-1">Active alerts</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { task: 'Database Optimization', scheduled: '2025-11-25', duration: '2 hours' },
            { task: 'System Update', scheduled: '2025-12-01', duration: '1 hour' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{item.task}</p>
                <p className="text-sm text-muted-foreground">{item.scheduled} • {item.duration}</p>
              </div>
              <Button variant="outline" size="sm">Reschedule</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
