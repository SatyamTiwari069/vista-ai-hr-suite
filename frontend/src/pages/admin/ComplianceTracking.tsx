import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function ComplianceTracking() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Compliance Tracking"
        description="Monitor and manage regulatory compliance"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">95%</p>
            <p className="text-sm text-muted-foreground mt-1">Excellent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">2</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { req: 'GDPR Compliance', status: 'Compliant' },
            { req: 'Data Protection', status: 'Compliant' },
            { req: 'Labor Laws', status: 'Compliant' },
            { req: 'Tax Requirements', status: 'Review Needed' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                {item.status === 'Compliant' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
                <span className="font-medium">{item.req}</span>
              </div>
              <span className="text-sm text-muted-foreground">{item.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
