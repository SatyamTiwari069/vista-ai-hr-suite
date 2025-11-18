import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Upload, FileText, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Candidate {
  id: string;
  name: string;
  email: string;
  matchScore: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

export default function ResumeScreener() {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      matchScore: 92,
      status: 'excellent',
      strengths: ['10+ years React experience', 'Led teams of 5+', 'AWS certified'],
      gaps: ['No TypeScript mentioned'],
      recommendation: 'Highly recommended for interview',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'mchen@email.com',
      matchScore: 78,
      status: 'good',
      strengths: ['Strong backend skills', '5 years Node.js', 'Microservices architecture'],
      gaps: ['Limited frontend experience', 'No management experience'],
      recommendation: 'Good fit for technical role',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      matchScore: 65,
      status: 'fair',
      strengths: ['3 years experience', 'Full-stack developer', 'Quick learner'],
      gaps: ['Lacks enterprise experience', 'No DevOps knowledge'],
      recommendation: 'Consider for junior position',
    },
  ]);

  const handleFileUpload = () => {
    setIsScanning(true);
    toast({
      title: 'Scanning resumes...',
      description: 'AI is analyzing uploaded documents',
    });

    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: 'Scan complete!',
        description: '3 resumes processed and ranked',
      });
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-success text-success-foreground';
      case 'good':
        return 'bg-primary text-primary-foreground';
      case 'fair':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-destructive text-destructive-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          AI Resume Screener
        </h1>
        <p className="text-muted-foreground">
          Automatically evaluate and rank candidates with AI-powered analysis
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upload Resumes</CardTitle>
            <CardDescription>Drop files or click to upload</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop PDF or DOCX files
              </p>
              <Button variant="secondary" size="sm">
                Browse Files
              </Button>
            </div>

            <Button
              className="w-full bg-gradient-ai text-white hover:opacity-90"
              onClick={handleFileUpload}
              disabled={isScanning}
            >
              {isScanning ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  Scanning...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Start AI Screening
                </>
              )}
            </Button>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resumes Uploaded</span>
                <span className="font-medium">124</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Screened Today</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">High Matches</span>
                <span className="font-medium text-success">12</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Candidate Rankings</CardTitle>
            <CardDescription>AI-powered evaluation results</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="excellent">Excellent</TabsTrigger>
                <TabsTrigger value="good">Good</TabsTrigger>
                <TabsTrigger value="fair">Fair</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {candidates.map((candidate) => (
                  <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{candidate.name}</h3>
                            <p className="text-sm text-muted-foreground">{candidate.email}</p>
                          </div>
                          <Badge className={getStatusColor(candidate.status)}>
                            {candidate.status}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Match Score</span>
                            <span className="font-semibold">{candidate.matchScore}%</span>
                          </div>
                          <Progress value={candidate.matchScore} className="h-2" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium mb-2 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-success" />
                              Strengths
                            </p>
                            <ul className="space-y-1">
                              {candidate.strengths.map((strength, i) => (
                                <li key={i} className="text-sm text-muted-foreground pl-6">
                                  • {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2 flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-warning" />
                              Gaps
                            </p>
                            <ul className="space-y-1">
                              {candidate.gaps.map((gap, i) => (
                                <li key={i} className="text-sm text-muted-foreground pl-6">
                                  • {gap}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm font-medium mb-1 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            AI Recommendation
                          </p>
                          <p className="text-sm text-muted-foreground">{candidate.recommendation}</p>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <FileText className="mr-2 h-4 w-4" />
                            View Resume
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Schedule Interview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
