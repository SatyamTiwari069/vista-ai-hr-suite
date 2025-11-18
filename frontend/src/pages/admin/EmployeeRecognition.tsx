import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';

export default function EmployeeRecognition() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Recognition"
        description="Recognize and reward employee achievements"
        actions={[{ label: 'Give Recognition', variant: 'default', onClick: () => alert('Give recognition') }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">156</p>
            <p className="text-sm text-muted-foreground mt-1">Recognitions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">28</p>
            <p className="text-sm text-muted-foreground mt-1">Multiple recognitions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-muted-foreground mt-1">Recognized</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Recognitions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { employee: 'John Smith', award: 'Outstanding Performance', date: 'Nov 18' },
            { employee: 'Sarah Johnson', award: 'Team Player', date: 'Nov 17' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
              <Award className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="font-medium">{item.employee}</p>
                <p className="text-sm text-muted-foreground">{item.award}</p>
              </div>
              <span className="text-sm text-muted-foreground">{item.date}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
