import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, CheckCircle } from 'lucide-react';

export default function CandidateEvaluation() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Candidate Evaluation"
        description="Evaluate and assess candidates for positions"
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">234</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Evaluated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">156</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">56</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Shortlisted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">45</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Evaluations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'John Doe', position: 'Senior Engineer', applied: '3 days ago' },
            { name: 'Jane Smith', position: 'Product Manager', applied: '2 days ago' },
          ].map((candidate, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{candidate.name}</p>
                <p className="text-sm text-muted-foreground">{candidate.position} • {candidate.applied}</p>
              </div>
              <Button className="bg-gradient-hero">Evaluate</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
