import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { candidateService, aiService } from '@/lib/api';

interface Candidate {
  id: string;
  name: string;
  email: string;
  matchScore?: number;
  status?: 'excellent' | 'good' | 'fair' | 'poor';
  strengths?: string[];
  gaps?: string[];
  recommendation?: string;
  [key: string]: any;
}

export default function ResumeScreener() {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

  // Load candidates on mount
  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setIsLoading(true);
      const data = await candidateService.getCandidates();
      setCandidates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load candidates:', error);
      toast({
        title: 'Error loading candidates',
        description: 'Failed to fetch candidate data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsScanning(true);
    toast({
      title: 'Screening resumes...',
      description: 'AI is analyzing your documents',
    });

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // In a real scenario, you'd extract text from the file
        // For now, using filename as placeholder
        const resumeText = `Resume: ${file.name} - Uploaded on ${new Date().toLocaleDateString()}`;
        
        // Create candidate record
        const candidate: Candidate = {
          name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          email: `candidate${Date.now()}@example.com`,
          resumeText,
          status: 'pending',
          uploadedAt: new Date().toISOString(),
        };

        const newCandidate = await candidateService.createCandidate(candidate);

        // Screen the resume using AI
        if (newCandidate?.id) {
          try {
            const screeningResult = await aiService.screenResume(
              resumeText,
              'Senior Full-Stack Developer position', // Default job description
              candidate.name
            );
            
            // Update candidate with AI scoring
            await candidateService.updateCandidate(newCandidate.id, {
              matchScore: screeningResult.matchScore || 0,
              strengths: screeningResult.strengths || [],
              gaps: screeningResult.gaps || [],
              recommendation: screeningResult.recommendation || '',
              status: screeningResult.status || 'fair',
            });
          } catch (aiError) {
            console.error('AI screening error:', aiError);
            // Continue even if AI screening fails
          }
        }
      }

      // Reload candidates
      await loadCandidates();
      
      toast({
        title: 'Resumes screened successfully!',
        description: `${files.length} resume(s) have been processed by AI`,
      });
    } catch (error) {
      console.error('File upload error:', error);
      toast({
        title: 'Error uploading resumes',
        description: 'Failed to process your files',
        variant: 'destructive',
      });
    } finally {
      setIsScanning(false);
      if (fileInput) fileInput.value = '';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500 text-white';
      case 'good':
        return 'bg-blue-500 text-white';
      case 'fair':
        return 'bg-amber-500 text-white';
      case 'poor':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (isLoading && candidates.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader className="h-8 w-8 text-primary mx-auto animate-spin mb-4" />
          <p className="text-muted-foreground">Loading candidates...</p>
        </div>
      </div>
    );
  }

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
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
              onClick={() => fileInput?.click()}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop PDF or DOCX files
              </p>
              <input
                ref={setFileInput}
                type="file"
                multiple
                accept=".pdf,.docx,.doc"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button variant="secondary" size="sm" onClick={() => fileInput?.click()}>
                Browse Files
              </Button>
            </div>

            <Button
              className="w-full bg-gradient-ai text-white hover:opacity-90"
              disabled={isScanning || isLoading}
            >
              {isScanning ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  Screening...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  AI Screening Active
                </>
              )}
            </Button>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Candidates</span>
                <span className="font-medium">{candidates.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">High Matches (80%+)</span>
                <span className="font-medium text-green-600">
                  {candidates.filter(c => (c.matchScore || 0) >= 80).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Good Matches (60-79%)</span>
                <span className="font-medium text-blue-600">
                  {candidates.filter(c => (c.matchScore || 0) >= 60 && (c.matchScore || 0) < 80).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Candidate Rankings</CardTitle>
            <CardDescription>AI-powered evaluation results - {candidates.length} candidates</CardDescription>
          </CardHeader>
          <CardContent>
            {candidates.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No candidates yet. Upload resumes to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {candidates
                  .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
                  .map((candidate) => (
                    <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{candidate.name}</h3>
                              <p className="text-sm text-muted-foreground">{candidate.email}</p>
                            </div>
                            {candidate.status && (
                              <Badge className={getStatusColor(candidate.status)}>
                                {candidate.status}
                              </Badge>
                            )}
                          </div>

                          {candidate.matchScore !== undefined && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Match Score</span>
                                <span className="font-semibold">{candidate.matchScore}%</span>
                              </div>
                              <Progress value={candidate.matchScore} className="h-2" />
                            </div>
                          )}

                          {(candidate.strengths || candidate.gaps) && (
                            <div className="grid md:grid-cols-2 gap-4">
                              {candidate.strengths && candidate.strengths.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    Strengths
                                  </p>
                                  <ul className="space-y-1">
                                    {candidate.strengths.map((strength: string, i: number) => (
                                      <li key={i} className="text-sm text-muted-foreground pl-6">
                                        • {strength}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {candidate.gaps && candidate.gaps.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-amber-600" />
                                    Gaps
                                  </p>
                                  <ul className="space-y-1">
                                    {candidate.gaps.map((gap: string, i: number) => (
                                      <li key={i} className="text-sm text-muted-foreground pl-6">
                                        • {gap}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}

                          {candidate.recommendation && (
                            <div className="bg-muted/50 rounded-lg p-3">
                              <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                AI Recommendation
                              </p>
                              <p className="text-sm text-muted-foreground">{candidate.recommendation}</p>
                            </div>
                          )}

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
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
