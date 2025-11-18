import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export default function Policies() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Policies"
        description="Access and review company policies and procedures"
      />

      <Card>
        <CardHeader>
          <CardTitle>Available Policies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { policy: 'Code of Conduct', updated: 'Nov 2024', version: '2.1' },
            { policy: 'Remote Work Policy', updated: 'Sep 2024', version: '1.5' },
            { policy: 'Time Off Policy', updated: 'Aug 2024', version: '2.0' },
            { policy: 'Safety & Security', updated: 'Jul 2024', version: '1.8' },
            { policy: 'Data Privacy', updated: 'Jun 2024', version: '3.0' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">{item.policy}</p>
                  <p className="text-sm text-muted-foreground">Updated {item.updated} (v{item.version})</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Read</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
