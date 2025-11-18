import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';

export default function JobListingsManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Listings Management"
        description="Create and manage job postings"
        actions={[{ label: 'New Job Posting', variant: 'default', onClick: () => alert('New job posting') }]}
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">23</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">18</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">456</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Filled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Job Postings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { title: 'Senior Engineer', dept: 'Engineering', apps: 45 },
            { title: 'Product Manager', dept: 'Product', apps: 32 },
            { title: 'Sales Executive', dept: 'Sales', apps: 28 },
          ].map((job, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-muted-foreground">{job.dept} • {job.apps} applications</p>
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
