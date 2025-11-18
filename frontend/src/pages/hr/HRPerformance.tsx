import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

export default function PerformanceManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Management"
        description="Track and manage employee performance"
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Evaluations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">234</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.2/5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">89</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Needs Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">34</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Evaluations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { employee: 'John Smith', rating: '4.8/5', date: 'Nov 15' },
            { employee: 'Jane Doe', rating: '4.3/5', date: 'Nov 14' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{item.employee}</p>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-medium text-green-600">{item.rating}</span>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
