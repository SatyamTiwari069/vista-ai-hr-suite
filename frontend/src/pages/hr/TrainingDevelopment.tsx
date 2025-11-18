import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

export default function TrainingDevelopment() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Training & Development"
        description="Create and manage training and development programs"
        actions={[{ label: 'New Program', variant: 'default', onClick: () => alert('New training program') }]}
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">234</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">189</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">45</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Programs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Leadership Development', duration: '8 weeks', enrolled: 45 },
            { name: 'Technical Skills', duration: '6 weeks', enrolled: 67 },
            { name: 'Soft Skills', duration: '4 weeks', enrolled: 89 },
          ].map((program, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{program.name}</p>
                  <p className="text-sm text-muted-foreground">{program.duration} • {program.enrolled} enrolled</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
