import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function HiringInsights() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hiring Insights & Analytics"
        description="Analyze recruitment metrics and trends"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Hiring Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12/month</p>
            <p className="text-sm text-muted-foreground mt-1">+20% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg Time to Hire</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">28 days</p>
            <p className="text-sm text-muted-foreground mt-1">-3 days from average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Offer Acceptance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">85%</p>
            <p className="text-sm text-muted-foreground mt-1">Industry average: 75%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hiring Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Hiring trend visualization</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { source: 'Job Boards', apps: 234 },
                { source: 'Direct Referral', apps: 145 },
                { source: 'LinkedIn', apps: 123 },
                { source: 'Campus Hiring', apps: 89 },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-2 border-b">
                  <span className="font-medium">{item.source}</span>
                  <span className="text-sm text-muted-foreground">{item.apps} applications</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recruiter Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Performance metrics here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
