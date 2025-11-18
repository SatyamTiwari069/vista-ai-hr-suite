import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export default function DocumentManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Management"
        description="Manage company documents and policies"
        actions={[{ label: 'Upload Document', variant: 'default', onClick: () => alert('Upload document') }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2,450</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">456 GB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">234</p>
            <p className="text-sm text-muted-foreground">New documents</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['Policy Update', 'Q3 Report', 'Training Materials'].map((doc, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">{doc}</p>
                <p className="text-sm text-muted-foreground">Recently uploaded</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
