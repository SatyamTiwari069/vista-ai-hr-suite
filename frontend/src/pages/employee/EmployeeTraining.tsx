import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

export default function EmployeeTraining() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Training & Development"
        description="Access training programs and develop your skills"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">8</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">2</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Training Programs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { course: 'Leadership Development', duration: '8 weeks', level: 'Advanced' },
            { course: 'Technical Skills Enhancement', duration: '6 weeks', level: 'Intermediate' },
            { course: 'Communication Masterclass', duration: '4 weeks', level: 'Beginner' },
          ].map((program, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{program.course}</p>
                  <p className="text-sm text-muted-foreground">{program.duration} • {program.level}</p>
                </div>
              </div>
              <Button className="bg-gradient-hero">Enroll</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
