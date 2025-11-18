import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function Attendance() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="View your attendance records and history"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Present This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">18</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Absent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance %</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">90%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { date: 'Nov 18', status: 'Present', inTime: '9:00 AM', outTime: '6:00 PM' },
            { date: 'Nov 17', status: 'Present', inTime: '9:05 AM', outTime: '5:45 PM' },
            { date: 'Nov 16', status: 'Absent', inTime: '-', outTime: '-' },
          ].map((record, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{record.date}</p>
                <p className="text-sm text-muted-foreground">{record.inTime} - {record.outTime}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${record.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {record.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
