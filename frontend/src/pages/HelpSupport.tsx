import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, MessageSquare, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

export default function HelpSupport() {
  const [activeTab, setActiveTab] = useState('faq');
  const [selectedFaq, setSelectedFaq] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: 'How do I clock in and out?',
      answer: 'Navigate to your Employee Dashboard and click the "Clock In" button. You can clock out the same way. Your attendance will be automatically recorded.',
      category: 'Attendance'
    },
    {
      question: 'How can I apply for leave?',
      answer: 'Go to the Leave section in your dashboard, select the type of leave, choose dates, and submit your request. Your manager will review and approve it.',
      category: 'Leave'
    },
    {
      question: 'When will I receive my salary?',
      answer: 'Salaries are processed on the last business day of each month. You can view your payslip in the Payroll section.',
      category: 'Payroll'
    },
    {
      question: 'How do I update my profile information?',
      answer: 'Click on your Profile section and select Edit. Update your information and save changes. Some fields may require HR approval.',
      category: 'Profile'
    },
    {
      question: 'How does the AI Resume Screener work?',
      answer: 'Upload a resume and job description. Our AI analyzes the resume against job requirements and provides a match score with recommendations.',
      category: 'AI Features'
    },
    {
      question: 'What should I do if I forget my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email, and follow the reset instructions sent to your inbox.',
      category: 'Account'
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const supportTickets = [
    { id: 'TKT-001', subject: 'Cannot login to system', status: 'open', created: '2024-01-15' },
    { id: 'TKT-002', subject: 'Payslip not visible', status: 'in_progress', created: '2024-01-14' },
    { id: 'TKT-003', subject: 'Leave approval delay', status: 'resolved', created: '2024-01-10' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
        <p className="text-muted-foreground">Find answers and get help when you need it</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="documentation">Docs</TabsTrigger>
          <TabsTrigger value="support">Support Tickets</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm mb-2">Categories</h3>
                  {['All', 'Attendance', 'Leave', 'Payroll', 'Profile', 'AI Features', 'Account'].map((cat) => (
                    <Button
                      key={cat}
                      variant={cat === 'All' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setSearchTerm(cat === 'All' ? '' : cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>

                <div className="lg:col-span-2 space-y-3">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, i) => (
                      <Card
                        key={i}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedFaq(i)}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-sm">{faq.question}</CardTitle>
                            <Badge variant="outline">{faq.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="pt-6 text-center text-muted-foreground">
                        No FAQs found. Try a different search term.
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="documentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { title: 'Getting Started', description: 'Learn the basics of Vista HRMS' },
                  { title: 'User Guide', description: 'Complete user manual and tutorials' },
                  { title: 'HR Features', description: 'Guide to HR-specific features' },
                  { title: 'Admin Settings', description: 'System configuration and management' },
                  { title: 'API Documentation', description: 'Developer API reference' },
                  { title: 'Security Guide', description: 'Security best practices and compliance' },
                ].map((doc, i) => (
                  <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-sm">{doc.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>
                      <Button size="sm" variant="outline">Read</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tickets Tab */}
        <TabsContent value="support" className="space-y-6">
          <Button className="bg-gradient-hero">+ Create New Ticket</Button>

          <Card>
            <CardHeader>
              <CardTitle>My Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {supportTickets.map((ticket, i) => (
                  <div key={i} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm">{ticket.subject}</p>
                        <p className="text-xs text-muted-foreground">Ticket ID: {ticket.id}</p>
                      </div>
                      <Badge
                        variant={
                          ticket.status === 'open' ? 'destructive' :
                          ticket.status === 'in_progress' ? 'default' :
                          'secondary'
                        }
                      >
                        {ticket.status === 'open' ? 'Open' :
                         ticket.status === 'in_progress' ? 'In Progress' :
                         'Resolved'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Created: {ticket.created}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Us Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="What can we help you with?" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select className="w-full p-2 border rounded-md">
                  <option>General Inquiry</option>
                  <option>Technical Issue</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                  <option>Account Issue</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Please describe your issue in detail..."
                  className="min-h-32"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>

              <Button className="bg-gradient-hero w-full">Submit Support Request</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Hours & Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@vista-hrms.com</p>
                  <p className="text-xs text-muted-foreground">Response time: 24-48 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Live Chat</p>
                  <p className="text-sm text-muted-foreground">Available 9 AM - 6 PM EST</p>
                  <p className="text-xs text-muted-foreground">Monday - Friday</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+1 (800) VISTA-HR</p>
                  <p className="text-xs text-muted-foreground">Monday - Friday, 9 AM - 6 PM EST</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
