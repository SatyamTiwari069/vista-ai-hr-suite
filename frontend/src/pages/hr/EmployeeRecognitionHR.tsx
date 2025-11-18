import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Award } from 'lucide-react';

export default function EmployeeRecognitionHR() {
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
            <CardTitle>Recognitions This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">45</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <p className="font-medium">John Smith</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">72%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Awards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { award: 'Employee of the Month', date: 'Nov 18' },
            { award: 'Outstanding Performance', date: 'Nov 15' },
            { award: 'Team Player Award', date: 'Nov 12' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">{item.award}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
