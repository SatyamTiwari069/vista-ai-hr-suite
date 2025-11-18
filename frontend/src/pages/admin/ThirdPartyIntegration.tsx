import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ThirdPartyIntegration() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Third Party Integrations"
        description="Connect external services and platforms"
        actions={[{ label: 'Add Integration', variant: 'default' }]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Connected Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['Slack', 'Google Workspace', 'Microsoft Teams', 'Salesforce'].map((service, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">{service}</span>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Connected</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['Zoom', 'Jira', 'Confluence', 'Asana'].map((service, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">{service}</span>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
