import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';

export default function DataBackupRecovery() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Backup & Recovery"
        description="Manage system backups and data recovery"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Last Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Nov 18, 2025</p>
            <p className="text-sm text-muted-foreground mt-1">5:30 AM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup Size</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">234 GB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">90 Days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { date: 'Nov 18, 2025', size: '234 GB', status: 'Success' },
            { date: 'Nov 17, 2025', size: '233 GB', status: 'Success' },
            { date: 'Nov 16, 2025', size: '232 GB', status: 'Success' },
          ].map((backup, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">{backup.date}</p>
                  <p className="text-sm text-muted-foreground">{backup.size}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Restore</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
