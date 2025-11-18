import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

export default function BenefitsCompensation() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Benefits & Compensation"
        description="Manage employee benefits and compensation packages"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg Compensation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$75,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benefits Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">89%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Benefit Plans</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { plan: 'Health Insurance', members: 1000, cost: '$2.1M/year' },
            { plan: '401(k) Plan', members: 950, cost: '$1.8M/year' },
            { plan: 'Dental Plan', members: 800, cost: '$450K/year' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">{item.plan}</p>
                  <p className="text-sm text-muted-foreground">{item.members} members • {item.cost}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
