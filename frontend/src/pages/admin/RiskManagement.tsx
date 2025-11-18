import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RiskManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Risk Management"
        description="Monitor and manage organizational risks"
        actions={[{ label: 'New Risk', variant: 'default', onClick: () => alert('New risk') }]}
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">23</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">High</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Medium</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">16</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Risks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { risk: 'Data Security', level: 'Critical' },
            { risk: 'Compliance', level: 'High' },
            { risk: 'Employee Retention', level: 'High' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">{item.risk}</span>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-1 rounded ${item.level === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {item.level}
                </span>
                <Button variant="outline" size="sm">Mitigate</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
