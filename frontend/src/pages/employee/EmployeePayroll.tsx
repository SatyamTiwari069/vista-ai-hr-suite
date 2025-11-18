import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function PayrollAndBenefits() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll & Benefits"
        description="View your salary and benefits information"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Monthly Salary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$5,000</p>
            <p className="text-sm text-muted-foreground mt-1">Gross</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">Nov 15, 2025</p>
            <p className="text-sm text-muted-foreground mt-1">Status: Processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benefits Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">Active</p>
            <p className="text-sm text-muted-foreground mt-1">3 plans enrolled</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Benefits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { benefit: 'Health Insurance', type: 'Medical', status: 'Active' },
            { benefit: '401(k) Plan', type: 'Retirement', status: 'Active' },
            { benefit: 'Dental Plan', type: 'Medical', status: 'Active' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{item.benefit}</p>
                <p className="text-sm text-muted-foreground">{item.type}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">{item.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payroll History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {['Nov 2025', 'Oct 2025', 'Sep 2025'].map((month, i) => (
            <div key={i} className="flex items-center justify-between p-2 border-b last:border-0">
              <span className="font-medium">{month}</span>
              <Button variant="outline" size="sm">View</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
