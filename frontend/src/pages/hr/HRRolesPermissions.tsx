import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export default function HRRolesPermissions() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="HR Roles & Permissions"
        description="Manage HR-specific roles and access control"
        actions={[{ label: 'New Role', variant: 'default' }]}
      />

      <Card>
        <CardHeader>
          <CardTitle>HR Roles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { role: 'HR Manager', users: 5, permissions: 45 },
            { role: 'Recruiter', users: 3, permissions: 28 },
            { role: 'HR Coordinator', users: 2, permissions: 15 },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{item.role}</p>
                  <p className="text-sm text-muted-foreground">{item.users} users • {item.permissions} permissions</p>
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
