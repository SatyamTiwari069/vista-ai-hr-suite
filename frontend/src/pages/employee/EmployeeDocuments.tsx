import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export default function DocumentLibrary() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Library"
        description="Access company documents and resources"
      />

      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Employee Handbook', type: 'PDF', date: 'Nov 15' },
            { name: 'Training Materials', type: 'ZIP', date: 'Nov 10' },
            { name: 'Benefits Guide', type: 'PDF', date: 'Nov 5' },
            { name: 'Health & Safety', type: 'PDF', date: 'Oct 28' },
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.type} • {doc.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
