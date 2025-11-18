import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HRDepartments() {
  const [activeTab, setActiveTab] = React.useState('all');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Department Management"
        description="Manage organizational departments and teams"
        actions={[{ label: 'New Department', variant: 'default', onClick: () => alert('New department') }]}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Departments</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {['Engineering', 'Sales', 'HR', 'Operations', 'Marketing', 'Finance'].map((dept, i) => (
            <Card key={i}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-lg">{dept}</p>
                  <p className="text-sm text-muted-foreground">234 employees</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Manage</Button>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="structure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Hierarchy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Department structure visualization
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
