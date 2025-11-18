import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building, Plus, Edit2, Trash2, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const DepartmentHierarchy = () => {
  const [departments, setDepartments] = useState([
    { id: '1', name: 'Engineering', parent: null, head: 'Sarah Johnson', employees: 45, budget: 1200000 },
    { id: '2', name: 'Product', parent: null, head: 'Mike Chen', employees: 12, budget: 400000 },
    { id: '3', name: 'Design', parent: null, head: 'Emma Davis', employees: 8, budget: 250000 },
    { id: '4', name: 'HR', parent: null, head: 'James Wilson', employees: 6, budget: 150000 },
    { id: '5', name: 'Finance', parent: null, head: 'Lisa Brown', employees: 5, budget: 180000 },
  ]);

  const [newDept, setNewDept] = useState({ name: '', head: '', employees: '', budget: '' });

  const handleAddDept = () => {
    if (newDept.name && newDept.head) {
      setDepartments([
        ...departments,
        {
          id: Date.now().toString(),
          name: newDept.name,
          parent: null,
          head: newDept.head,
          employees: parseInt(newDept.employees) || 0,
          budget: parseInt(newDept.budget) || 0,
        },
      ]);
      setNewDept({ name: '', head: '', employees: '', budget: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Department Hierarchy</h1>
        <p className="text-muted-foreground">Manage organizational structure and departments</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Departments ({departments.length})
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Department</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Department Name</Label>
                    <Input
                      value={newDept.name}
                      onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                      placeholder="e.g., Engineering"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Department Head</Label>
                    <Input
                      value={newDept.head}
                      onChange={(e) => setNewDept({ ...newDept, head: e.target.value })}
                      placeholder="Head name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Number of Employees</Label>
                    <Input
                      type="number"
                      value={newDept.employees}
                      onChange={(e) => setNewDept({ ...newDept, employees: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Annual Budget</Label>
                    <Input
                      type="number"
                      value={newDept.budget}
                      onChange={(e) => setNewDept({ ...newDept, budget: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <Button onClick={handleAddDept} className="w-full bg-gradient-hero">
                    Create Department
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Head: {dept.head}</p>
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
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{dept.employees} Employees</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Budget: </span>
                    <span className="font-bold">${(dept.budget / 1000000).toFixed(2)}M</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentHierarchy;
