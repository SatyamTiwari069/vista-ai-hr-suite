import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

export default function ManagerPerformanceAnalysis() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Analysis"
        description="Analyze team and individual performance"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Team Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.3/5</p>
            <p className="text-sm text-muted-foreground mt-1">Excellent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">John Smith</p>
            <p className="text-sm text-muted-foreground mt-1">4.9/5 rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Needs Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">2 members</p>
            <p className="text-sm text-muted-foreground mt-1">Below expectations</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { metric: 'Productivity', score: 85 },
            { metric: 'Quality', score: 90 },
            { metric: 'Collaboration', score: 78 },
            { metric: 'Innovation', score: 72 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{item.metric}</span>
                <span className="text-sm text-muted-foreground">{item.score}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-hero" style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
