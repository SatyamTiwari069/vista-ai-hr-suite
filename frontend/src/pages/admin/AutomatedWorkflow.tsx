import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function AutomatedWorkflow() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Automated Workflows"
        description="Create and manage automated HR processes"
        actions={[{ label: 'New Workflow', variant: 'default' }]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Active Workflows</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Leave Request Approval', enabled: true, runs: 234 },
            { name: 'Onboarding Process', enabled: true, runs: 89 },
            { name: 'Performance Review', enabled: false, runs: 45 },
          ].map((workflow, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">{workflow.name}</p>
                  <p className="text-sm text-muted-foreground">{workflow.runs} runs</p>
                </div>
              </div>
              <Button variant="outline" size="sm">{workflow.enabled ? 'Disable' : 'Enable'}</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
