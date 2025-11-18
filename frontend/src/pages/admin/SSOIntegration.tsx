import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function SSOMaintenance() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="SSO Integration"
        description="Configure Single Sign-On providers"
        actions={[{ label: 'Add Provider', variant: 'default', onClick: () => alert('Add SSO provider') }]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Providers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['Google', 'Microsoft', 'Okta'].map((provider, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{provider}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Disable</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium">Client ID</label>
              <Input placeholder="Enter client ID" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Client Secret</label>
              <Input type="password" placeholder="Enter client secret" className="mt-1" />
            </div>
            <Button className="w-full bg-gradient-hero">Save Configuration</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
