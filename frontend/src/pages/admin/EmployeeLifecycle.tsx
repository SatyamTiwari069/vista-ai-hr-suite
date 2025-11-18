import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function EmployeeLifecycle() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Lifecycle Management"
        description="Manage complete employee journey from onboarding to offboarding"
        actions={[{ label: 'New Lifecycle', variant: 'default' }]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {['Recruitment', 'Onboarding', 'Development', 'Performance', 'Offboarding'].map((stage, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-lg">{stage}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Current employees in this stage</p>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-2xl font-bold">234</p>
              </div>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
