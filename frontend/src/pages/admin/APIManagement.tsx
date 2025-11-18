import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';

export default function APIManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="API Management"
        description="Manage API keys and integrations"
        actions={[{ label: 'Generate Key', variant: 'default', onClick: () => alert('Generate API key') }]}
      />

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Production Key', created: 'Oct 1, 2025', status: 'Active' },
            { name: 'Development Key', created: 'Sep 15, 2025', status: 'Active' },
            { name: 'Old Key', created: 'Jul 1, 2025', status: 'Inactive' },
          ].map((key, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{key.name}</p>
                  <p className="text-sm text-muted-foreground">Created {key.created}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-1 rounded ${key.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {key.status}
                </span>
                <Button variant="destructive" size="sm">Revoke</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline">View Docs</Button>
        </CardContent>
      </Card>
    </div>
  );
}
