import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BurnoutAndRisk() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Burnout & Risk Management"
        description="Monitor wellbeing and manage organizational risks"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>At Risk Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">45</p>
            <p className="text-sm text-muted-foreground mt-1">4% of workforce</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Healthy Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">8.1/10</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organizational Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Medium</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Factors & Mitigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { factor: 'High Overtime', employees: 23 },
            { factor: 'Low Engagement', employees: 15 },
            { factor: 'High Turnover Risk', employees: 7 },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{item.factor}</p>
                <p className="text-sm text-muted-foreground">{item.employees} employees</p>
              </div>
              <Button variant="outline" size="sm">Mitigate</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
