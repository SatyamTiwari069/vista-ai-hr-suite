import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export default function ManagerDocuments() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Management"
        description="Manage team documents and resources"
        actions={[{ label: 'Upload Document', variant: 'default', onClick: () => alert('Upload document') }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">45</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shared This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2.3 GB</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Q4 Planning', type: 'PDF', date: 'Nov 15' },
            { name: 'Team Guidelines', type: 'DOC', date: 'Nov 10' },
            { name: 'Project Charter', type: 'PDF', date: 'Nov 5' },
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.type} • {doc.date}</p>
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
