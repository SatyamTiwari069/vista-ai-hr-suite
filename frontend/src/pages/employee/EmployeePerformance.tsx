import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, CheckCircle } from 'lucide-react';

export default function EmployeePerformance() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Management"
        description="View your performance evaluations and feedback"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Latest Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.5/5</p>
            <p className="text-sm text-muted-foreground mt-1">Excellent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evaluations Done</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-muted-foreground mt-1">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals Achieved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">85%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Evaluations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { period: 'Q3 2025', rating: '4.5/5', comments: 'Great performance', reviewer: 'John Manager' },
            { period: 'Q2 2025', rating: '4.2/5', comments: 'Good overall', reviewer: 'Sarah Lead' },
          ].map((evaluation, i) => (
            <div key={i} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{evaluation.period}</p>
                <span className="text-sm font-bold text-green-600">{evaluation.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground">{evaluation.comments}</p>
              <p className="text-xs text-muted-foreground mt-1">By: {evaluation.reviewer}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
