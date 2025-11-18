import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

export default function ManagerReportingTools() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reporting Tools"
        description="Generate and manage team reports"
        actions={[{ label: 'New Report', variant: 'default' }]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Team Performance', lastGen: 'Nov 15' },
            { name: 'Productivity Metrics', lastGen: 'Nov 10' },
            { name: 'Leave Analysis', lastGen: 'Nov 5' },
            { name: 'Project Status', lastGen: 'Nov 18' },
          ].map((report, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-muted-foreground">Last generated: {report.lastGen}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Generate</Button>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
