import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, Users, Briefcase, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function RecruitmentManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm();

  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      status: 'open',
      applicants: 45,
      posted: '2024-05-15',
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      status: 'open',
      applicants: 28,
      posted: '2024-05-20',
    },
    {
      id: 3,
      title: 'Sales Executive',
      department: 'Sales',
      status: 'closed',
      applicants: 32,
      posted: '2024-04-10',
    },
  ];

  const handleCreateJob = async (values: any) => {
    toast.success('Job posting created');
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recruitment Management</h1>
          <p className="text-muted-foreground mt-2">Manage job postings and recruitment pipeline</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Job Posting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>Add a new job position</DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(handleCreateJob)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Senior Engineer" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Engineering" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea {...field} placeholder="Job description" className="w-full border rounded p-2" rows={4} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Create Posting</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="jobs" className="w-full">
        <TabsList>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Open Positions</p>
                  <p className="text-2xl font-bold mt-2">12</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Applicants</p>
                  <p className="text-2xl font-bold mt-2">142</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Avg Time to Hire</p>
                  <p className="text-2xl font-bold mt-2">28 days</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Job Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Applicants</p>
                        <p className="font-bold">{job.applicants}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        job.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {job.status}
                      </span>
                      <Button variant="ghost" size="sm"><Edit2 className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Pipeline</CardTitle>
              <CardDescription>Candidate flow through hiring stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { stage: 'Applied', count: 142 },
                  { stage: 'Shortlisted', count: 45 },
                  { stage: 'Interview', count: 18 },
                  { stage: 'Offer', count: 8 },
                  { stage: 'Hired', count: 5 },
                ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">{item.stage}</p>
                    <p className="text-2xl font-bold mt-2">{item.count}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Alex Chen', position: 'Senior Engineer', stage: 'Interview', score: 92 },
                  { name: 'Sarah Williams', position: 'Product Manager', stage: 'Offer', score: 88 },
                  { name: 'John Martinez', position: 'Sales Executive', stage: 'Interview', score: 85 },
                ].map((candidate, i) => (
                  <div key={i} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">AI Score</p>
                        <p className="font-bold">{candidate.score}%</p>
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">{candidate.stage}</span>
                    </div>
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
