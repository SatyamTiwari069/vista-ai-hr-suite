import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CustomReportBuilder() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Custom Report Builder"
        description="Create and manage custom reports"
        actions={[{ label: 'New Report', variant: 'default', onClick: () => alert('New report') }]}
      />

      <Card>
        <CardHeader>
          <CardTitle>My Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Employee Demographics', updated: 'Nov 15', shared: 3 },
            { name: 'Payroll Summary', updated: 'Nov 10', shared: 5 },
            { name: 'Performance Analysis', updated: 'Nov 8', shared: 2 },
          ].map((report, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{report.name}</p>
                <p className="text-sm text-muted-foreground">Updated {report.updated}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['Employee Report', 'Payroll Report', 'Performance Report', 'Attendance Report'].map((template, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">{template}</span>
              <Button variant="outline" size="sm">Use</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
