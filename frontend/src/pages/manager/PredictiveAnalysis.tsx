import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

export default function PredictiveAnalysis() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Predictive Analysis"
        description="AI-powered insights for team management"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">7</p>
            <p className="text-sm text-muted-foreground mt-1">Active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">89%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Insights This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Predictions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { prediction: 'Turnover Risk', probability: 'High', employee: 'Bob Wilson' },
            { prediction: 'Promotion Readiness', probability: 'High', employee: 'John Smith' },
            { prediction: 'Training Need', probability: 'Medium', employee: 'Jane Doe' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{item.prediction}</p>
                <p className="text-sm text-muted-foreground">{item.employee}</p>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-1 rounded ${item.probability === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {item.probability}
                </span>
                <Button variant="outline" size="sm">Action</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
