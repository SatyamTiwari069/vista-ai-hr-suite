import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access',
      permissions: ['user.create', 'user.read', 'user.update', 'user.delete', 'system.manage'],
      users: 2,
    },
    {
      id: '2',
      name: 'HR Manager',
      description: 'HR operations',
      permissions: ['recruitment.manage', 'payroll.manage', 'training.manage'],
      users: 5,
    },
    {
      id: '3',
      name: 'Manager',
      description: 'Team management',
      permissions: ['team.manage', 'reports.view', 'performance.manage'],
      users: 15,
    },
    {
      id: '4',
      name: 'Employee',
      description: 'Self-service access',
      permissions: ['profile.edit', 'leave.apply', 'attendance.view'],
      users: 1200,
    },
  ]);

  const allPermissions = [
    'user.create', 'user.read', 'user.update', 'user.delete',
    'recruitment.manage', 'payroll.manage', 'training.manage',
    'team.manage', 'reports.view', 'performance.manage',
    'profile.edit', 'leave.apply', 'attendance.view',
    'system.manage', 'audit.view', 'compliance.manage',
  ];

  const [newRole, setNewRole] = useState({ name: '', description: '', permissions: [] as string[] });

  const handleAddRole = () => {
    if (newRole.name) {
      setRoles([
        ...roles,
        {
          id: Date.now().toString(),
          name: newRole.name,
          description: newRole.description,
          permissions: newRole.permissions,
          users: 0,
        },
      ]);
      setNewRole({ name: '', description: '', permissions: [] });
    }
  };

  const handlePermissionToggle = (permission: string) => {
    setNewRole({
      ...newRole,
      permissions: newRole.permissions.includes(permission)
        ? newRole.permissions.filter((p) => p !== permission)
        : [...newRole.permissions, permission],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Role Management</h1>
        <p className="text-muted-foreground">Configure system roles and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Roles
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Role Name</Label>
                    <Input
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      placeholder="e.g., Team Lead"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={newRole.description}
                      onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                      placeholder="Role description"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Permissions</Label>
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                      {allPermissions.map((permission) => (
                        <div key={permission} className="flex items-center gap-2">
                          <Checkbox
                            checked={newRole.permissions.includes(permission)}
                            onCheckedChange={() => handlePermissionToggle(permission)}
                          />
                          <label className="text-sm cursor-pointer">{permission}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleAddRole} className="w-full bg-gradient-hero">
                    Create Role
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role.id} className="p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{role.name}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {role.permissions.slice(0, 3).map((permission) => (
                    <Badge key={permission} variant="secondary" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                  {role.permissions.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{role.permissions.length - 3} more
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{role.users} users assigned</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;
