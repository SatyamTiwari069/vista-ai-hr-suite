import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/StatCard';
import { AIChatbot } from '@/components/ai/AIChatbot';
import { 
  Users, Briefcase, TrendingUp, Calendar, Brain, 
  FileText, CheckCircle, Clock, Award, Zap 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [aiScore, setAiScore] = useState<number | null>(null);

  const handleScreenResume = async () => {
    if (!resumeText || !jobDescription) {
      alert('Please provide both resume and job description');
      return;
    }
    
    try {
      const GEMINI_API_KEY = 'AIzaSyB3eSwwpGT9nxtqKzjvMGqx8BtY8fkaits';
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an expert HR recruiter. Analyze this resume against the job description and provide a match score from 0-100.

Resume:
${resumeText}

Job Description:
${jobDescription}

Provide:
1. A match score (0-100)
2. 3-4 key strengths
3. 2-3 areas of concern
4. Overall recommendation

Format as JSON.`,
              }],
            }],
            generationConfig: { maxOutputTokens: 500, temperature: 0.7 },
          }),
        }
      );

      const data = await response.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (result) {
        const scoreMatch = result.match(/(\d+)/);
        setAiScore(scoreMatch ? parseInt(scoreMatch[1]) : 75);
      }
    } catch (error) {
      console.error('Error screening resume:', error);
      alert('Failed to screen resume. Please try again.');
    }
  };

  const handleGenerateJobDescription = async () => {
    if (!jobDescription) {
      alert('Please provide job title and requirements');
      return;
    }

    try {
      const GEMINI_API_KEY = 'AIzaSyB3eSwwpGT9nxtqKzjvMGqx8BtY8fkaits';
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Create a professional and compelling job description based on: ${jobDescription}

Include:
- Job title
- About the role
- Key responsibilities (5-7 bullet points)
- Required qualifications
- Preferred qualifications
- Benefits
- Compensation range (suggestion)

Make it engaging and professional.`,
              }],
            }],
            generationConfig: { maxOutputTokens: 1000, temperature: 0.8 },
          }),
        }
      );

      const data = await response.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (result) {
        alert('Job Description Generated:\n\n' + result);
      }
    } catch (error) {
      console.error('Error generating job description:', error);
      alert('Failed to generate job description. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">HR Dashboard</h1>
        <p className="text-muted-foreground">Recruitment, payroll, training, and employee management</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Active Candidates"
              value="145"
              change="+23 this month"
              icon={Users}
              trend="up"
            />
            <StatCard
              title="Open Positions"
              value="12"
              change="3 closing soon"
              icon={Briefcase}
              trend="up"
            />
            <StatCard
              title="Avg. Time to Hire"
              value="28 days"
              change="↓ 5 days vs avg"
              icon={Calendar}
              trend="down"
            />
            <StatCard
              title="Offer Acceptance Rate"
              value="92%"
              change="+8% from last quarter"
              icon={TrendingUp}
              trend="up"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recruitment Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: 'Applied', count: 89, color: 'bg-blue-500' },
                    { stage: 'Screening', count: 34, color: 'bg-purple-500' },
                    { stage: 'Interview', count: 18, color: 'bg-orange-500' },
                    { stage: 'Offer', count: 8, color: 'bg-green-500' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.stage}</span>
                        <Badge>{item.count}</Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full`}
                          style={{ width: `${(item.count / 89) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <AIChatbot />
          </div>
        </TabsContent>

        {/* Recruitment Tab */}
        <TabsContent value="recruitment" className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input placeholder="Search candidates or jobs..." />
            </div>
            <Button className="bg-gradient-hero">+ New Job</Button>
            <Button variant="outline">+ Add Candidate</Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Active Job Postings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Senior Software Engineer', applications: 45, posted: '2 weeks ago' },
                    { title: 'Product Manager', applications: 32, posted: '1 week ago' },
                    { title: 'UX/UI Designer', applications: 28, posted: '3 days ago' },
                    { title: 'Data Analyst', applications: 19, posted: '5 days ago' },
                  ].map((job, i) => (
                    <div key={i} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-xs text-muted-foreground">Posted {job.posted}</p>
                        </div>
                        <Badge variant="outline">{job.applications} applications</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Johnson', role: 'Senior Engineer', status: 'Interview' },
                    { name: 'Mike Chen', role: 'Product Manager', status: 'Screening' },
                    { name: 'Emma Davis', role: 'Designer', status: 'Applied' },
                  ].map((candidate, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.role}</p>
                        </div>
                        <Badge variant="secondary">{candidate.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Tools Tab */}
        <TabsContent value="ai-tools" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Resume Screener
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Resume Text</label>
                  <Textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste resume content here..."
                    className="min-h-32"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Job Description</label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job description here..."
                    className="min-h-32"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleScreenResume} className="bg-gradient-hero">
                    Screen Resume
                  </Button>
                  {aiScore !== null && (
                    <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                      Match Score: {aiScore}%
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  AI Job Description Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Job Details</label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Enter job title, department, key responsibilities, and desired qualifications..."
                    className="min-h-32"
                  />
                </div>
                <Button onClick={handleGenerateJobDescription} className="bg-gradient-hero">
                  Generate Description
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Hiring Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">AI-powered hiring analytics coming soon</p>
                  <Button variant="outline" className="w-full">View Insights</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Total Payroll', amount: '$2,450,000', period: 'This Month' },
                  { label: 'Processed', amount: '$1,890,000', period: 'Paid' },
                  { label: 'Pending', amount: '$560,000', period: 'Awaiting Approval' },
                  { label: 'Budget Usage', amount: '87%', period: 'Of Monthly Budget' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between p-2 bg-muted rounded">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.period}</p>
                    </div>
                    <p className="font-bold">{item.amount}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">Process Payroll</Button>
                <Button variant="outline" className="w-full justify-start">View Payslips</Button>
                <Button variant="outline" className="w-full justify-start">Tax Filings</Button>
                <Button variant="outline" className="w-full justify-start">Salary Reviews</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training" className="space-y-6">
          <div className="flex gap-4">
            <Button className="bg-gradient-hero">+ New Training Program</Button>
            <Button variant="outline">Browse Catalog</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: 'Leadership Development', participants: 24, progress: 65 },
              { title: 'Technical Skills', participants: 45, progress: 42 },
              { title: 'Compliance Training', participants: 150, progress: 78 },
              { title: 'Soft Skills Workshop', participants: 35, progress: 58 },
            ].map((program, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{program.participants} Participants</span>
                    <Badge>{program.progress}% Complete</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-hero h-2 rounded-full"
                      style={{ width: `${program.progress}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Cycles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { cycle: 'Q4 2024', status: 'In Progress', employees: 1234 },
                  { cycle: 'Q3 2024', status: 'Completed', employees: 1234 },
                  { cycle: 'Q2 2024', status: 'Completed', employees: 1198 },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.cycle}</p>
                        <p className="text-xs text-muted-foreground">{item.employees} Employees</p>
                      </div>
                      <Badge variant={item.status === 'Completed' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">Set Team Goals</Button>
                <Button variant="outline" className="w-full justify-start">Track Progress</Button>
                <Button variant="outline" className="w-full justify-start">View 1-on-1 History</Button>
                <Button variant="outline" className="w-full justify-start">Feedback Portal</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
