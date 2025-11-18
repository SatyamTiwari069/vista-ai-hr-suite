import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderKanban, CheckCircle } from 'lucide-react';

export default function ProjectManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Management"
        description="Manage team projects and deliverables"
        actions={[{ label: 'New Project', variant: 'default', onClick: () => alert('New project') }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>On Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">4</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">1</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Website Redesign', status: 'On Track', progress: 75 },
            { name: 'Mobile App Development', status: 'On Track', progress: 60 },
            { name: 'Cloud Migration', status: 'At Risk', progress: 45 },
          ].map((project, i) => (
            <div key={i} className="space-y-2 p-3 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{project.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${project.status === 'On Track' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {project.status}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-hero" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
