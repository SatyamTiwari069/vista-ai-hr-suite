import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Lock, Eye, Mail, Shield, Zap } from 'lucide-react';

export default function Settings() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    leaveUpdates: true,
    performanceReviews: true,
    announcements: true,
    payrollAlerts: true,
    twoFactorAuth: false,
  });

  const handleToggle = (key: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences and system settings</p>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                { key: 'leaveUpdates', label: 'Leave Updates', description: 'Get notified about leave requests and approvals' },
                { key: 'performanceReviews', label: 'Performance Reviews', description: 'Notifications about performance cycles' },
                { key: 'announcements', label: 'Company Announcements', description: 'Important company-wide announcements' },
                { key: 'payrollAlerts', label: 'Payroll Alerts', description: 'Alerts about salary and payroll updates' },
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{setting.label}</p>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch
                    checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                    onCheckedChange={() => handleToggle(setting.key)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                SMS Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Push Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Tab */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Email</Label>
                <Input value="john.doe@company.com" disabled />
              </div>

              <div className="space-y-2">
                <Label>Backup Email</Label>
                <Input placeholder="Add a backup email address" />
              </div>

              <div className="space-y-2">
                <Label>Email Digest Frequency</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>Real-time</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <Button className="bg-gradient-hero">Save Email Settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'HR Newsletter', subscribed: true },
                  { name: 'Compliance Updates', subscribed: true },
                  { name: 'Product Updates', subscribed: false },
                  { name: 'Webinar Invitations', subscribed: false },
                ].map((email, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{email.name}</span>
                    <Badge variant={email.subscribed ? 'default' : 'secondary'}>
                      {email.subscribed ? 'Subscribed' : 'Unsubscribed'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Privacy Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Profile Visibility', value: 'Public', description: 'Who can see your profile' },
                { label: 'Activity Status', value: 'Everyone', description: 'Who can see when you are online' },
                { label: 'Search Visibility', value: 'Everyone', description: 'Allow profile to appear in search' },
                { label: 'Performance Data', value: 'Manager Only', description: 'Who can see your performance metrics' },
              ].map((setting, i) => (
                <div key={i} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-sm">{setting.label}</p>
                    <select defaultValue={setting.value} className="text-xs p-1 border rounded">
                      <option>Public</option>
                      <option>Internal</option>
                      <option>Manager Only</option>
                      <option>Private</option>
                    </select>
                  </div>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Download My Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Privacy Policy
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Delete My Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Password & Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Last password change: 60 days ago. We recommend changing your password every 90 days.
                </p>
              </div>

              <Button className="bg-gradient-hero w-full">Change Password</Button>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-3">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Enable 2FA</p>
                    <p className="text-xs text-muted-foreground">Add extra security to your account</p>
                  </div>
                  <Switch
                    checked={notificationSettings.twoFactorAuth}
                    onCheckedChange={() => handleToggle('twoFactorAuth')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { device: 'Chrome on Windows', location: 'New York, NY', lastActive: 'Just now' },
                { device: 'Safari on macOS', location: 'New York, NY', lastActive: '2 hours ago' },
                { device: 'Mobile App', location: 'San Francisco, CA', lastActive: '1 day ago' },
              ].map((session, i) => (
                <div key={i} className="p-3 border rounded-lg flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{session.device}</p>
                    <p className="text-xs text-muted-foreground">{session.location} • {session.lastActive}</p>
                  </div>
                  <Button size="sm" variant="outline">Sign Out</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Connected Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Google Workspace', connected: true, permissions: 'Calendar, Email' },
                { name: 'Slack', connected: true, permissions: 'Messages' },
                { name: 'Microsoft Teams', connected: false, permissions: 'None' },
                { name: 'Zoom', connected: false, permissions: 'None' },
              ].map((app, i) => (
                <div key={i} className="p-3 border rounded-lg flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{app.name}</p>
                    <p className="text-xs text-muted-foreground">{app.permissions}</p>
                  </div>
                  <Button size="sm" variant={app.connected ? 'outline' : 'default'}>
                    {app.connected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Manage API Keys
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View API Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Developer Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
