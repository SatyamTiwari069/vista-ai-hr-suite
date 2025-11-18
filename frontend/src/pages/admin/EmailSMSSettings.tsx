import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EmailSMSSettings() {
  const [activeTab, setActiveTab] = useState('email');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Email/SMS Settings"
        description="Configure email and SMS communication settings"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">SMTP Server</label>
                <Input placeholder="smtp.gmail.com" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Port</label>
                <Input placeholder="587" className="mt-1" />
              </div>
              <Button className="w-full bg-gradient-hero">Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SMS Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Provider</label>
                <Input placeholder="Twilio" className="mt-1" />
              </div>
              <Button className="w-full bg-gradient-hero">Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage email templates here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
