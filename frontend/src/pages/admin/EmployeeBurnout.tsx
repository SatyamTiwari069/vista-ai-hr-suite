import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function EmployeeBurnout() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Burnout Analysis"
        description="Monitor and manage employee wellbeing and burnout risks"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Healthy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">892</p>
            <p className="text-sm text-muted-foreground mt-1">72% of workforce</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">234</p>
            <p className="text-sm text-muted-foreground mt-1">19% of workforce</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urgent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">108</p>
            <p className="text-sm text-muted-foreground mt-1">9% of workforce</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Factors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['Overtime hours', 'Sick leave frequency', 'Project overload', 'Low engagement'].map((factor, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">{factor}</span>
              <Button variant="outline" size="sm">Review</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
