import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Filter } from 'lucide-react';

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-06-15 14:32:45',
      user: 'John Doe',
      action: 'User Login',
      entityType: 'User',
      entityId: 'USR001',
      details: 'Successful login from IP 192.168.1.100',
      status: 'success',
    },
    {
      id: 2,
      timestamp: '2024-06-15 14:28:12',
      user: 'Jane Smith',
      action: 'User Created',
      entityType: 'User',
      entityId: 'USR002',
      details: 'New user account created',
      status: 'success',
    },
    {
      id: 3,
      timestamp: '2024-06-15 13:45:33',
      user: 'Admin User',
      action: 'Role Changed',
      entityType: 'User',
      entityId: 'USR001',
      details: 'Role changed from Employee to Manager',
      status: 'success',
    },
    {
      id: 4,
      timestamp: '2024-06-15 12:20:11',
      user: 'Mike Johnson',
      action: 'Payroll Updated',
      entityType: 'Payroll',
      entityId: 'PAY001',
      details: 'Payroll for June processed',
      status: 'success',
    },
    {
      id: 5,
      timestamp: '2024-06-15 11:15:42',
      user: 'System',
      action: 'Failed Login Attempt',
      entityType: 'User',
      entityId: 'USR003',
      details: 'Failed login attempt - invalid password',
      status: 'error',
    },
  ];

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground mt-2">System activity and user action logs</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>All system activities and user actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user or action..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="User Login">User Login</SelectItem>
                <SelectItem value="User Created">User Created</SelectItem>
                <SelectItem value="Role Changed">Role Changed</SelectItem>
                <SelectItem value="Payroll Updated">Payroll Updated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Timestamp</th>
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Action</th>
                  <th className="text-left py-3 px-4">Entity Type</th>
                  <th className="text-left py-3 px-4">Details</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-accent">
                    <td className="py-3 px-4 font-mono text-xs">{log.timestamp}</td>
                    <td className="py-3 px-4">{log.user}</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4">{log.entityType}</td>
                    <td className="py-3 px-4">{log.details}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        log.status === 'success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
