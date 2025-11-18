import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare } from 'lucide-react';

export default function TaskManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Task Management"
        description="Manage your tasks and assignments"
        actions={[{ label: 'New Task', variant: 'default', onClick: () => alert('New task') }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">9</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">3</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { task: 'Complete project report', due: 'Nov 20', priority: 'High', status: 'In Progress' },
            { task: 'Review documentation', due: 'Nov 22', priority: 'Medium', status: 'Not Started' },
            { task: 'Team meeting prep', due: 'Nov 19', priority: 'High', status: 'Completed' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{item.task}</p>
                  <p className="text-sm text-muted-foreground">Due: {item.due}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {item.priority}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
