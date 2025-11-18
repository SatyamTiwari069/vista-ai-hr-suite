import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit2, Trash2, Shield, Download } from 'lucide-react';

export default function BulkUserImportExport() {
  const [activeTab, setActiveTab] = useState('import');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bulk User Import/Export"
        description="Manage bulk user operations and data transfer"
        actions={[
          { label: 'Download Template', variant: 'outline', icon: <Download className="h-4 w-4 mr-2" />, onClick: () => alert('Download template') },
          { label: 'Import Users', variant: 'default', onClick: () => alert('Import users') },
        ]}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="import">Import</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Import Users from CSV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground mb-2">Drag and drop your CSV file here</p>
                <Button variant="outline">Select File</Button>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm"><strong>Required columns:</strong> Email, Name, Department, Role, Position</p>
              </div>
              <Button className="w-full bg-gradient-hero">Import Users</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export User Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { format: 'CSV', description: 'Comma-separated values' },
                  { format: 'Excel', description: 'Microsoft Excel format' },
                  { format: 'JSON', description: 'JSON format' },
                ].map((fmt, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent">
                    <div>
                      <p className="font-medium">{fmt.format}</p>
                      <p className="text-sm text-muted-foreground">{fmt.description}</p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Import/Export History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: 'Import', date: '2025-11-18', users: 45, status: 'Success' },
                  { type: 'Export', date: '2025-11-17', users: 1234, status: 'Success' },
                  { type: 'Import', date: '2025-11-16', users: 23, status: 'Completed with warnings' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.type}</p>
                      <p className="text-sm text-muted-foreground">{item.date} • {item.users} records</p>
                    </div>
                    <span className="text-sm font-medium text-green-600">{item.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
