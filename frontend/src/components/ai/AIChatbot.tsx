import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Loader, Trash2, Copy, Download, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const MOCK_AI_RESPONSES: { [key: string]: string } = {
  'leave': 'You have 12 paid leave days remaining this year. To request leave, use the Leave Management section. You can request up to 5 consecutive days. Sick leaves are unlimited if documented properly.',
  'vacation': 'Vacation requests: Peak periods are July-August and December. Please apply 30 days in advance. Summer vacation is recommended in June-July.',
  'sick leave': 'Sick leave can be taken on a need basis. Inform your manager within 2 hours and submit medical certificates for leaves exceeding 2 days. Frequent sick leaves may require medical evaluation.',
  'attendance': 'Your attendance: 22 days present, 0 absent. Late arrivals: 2 times. Maintain 95% attendance for excellent record. Biometric attendance is compulsory.',
  'salary': 'Monthly salary: $5000 (Basic: $3500 + Allowances: $1500). Payslip available in Payroll section. Salary is credited on 25th of each month.',
  'performance': 'Last review: 4.2/5. Strengths: Problem-solving, teamwork. Improvement areas: Time management, documentation. Next review in Q2 2024.',
  'training': 'Available training: Leadership, Technical Skills, Communication, Project Management. Enroll through Learning portal. Training certificates are issued upon completion.',
  'policy': 'Company policies: Code of Conduct, Leave Policy, Remote Work, Expense Reimbursement. Full docs in HR Portal. Review policies quarterly.',
  'remote work': 'Remote work: 2 days/week (Tuesday, Thursday). Pre-approval required from manager. VPN access is mandatory for security.',
  'benefits': 'Benefits: Health Insurance, Life Insurance, 401k match (up to 5%), Wellness Program. Dependents covered under health insurance.',
  'promotion': 'Promotions: Reviewed annually. Based on performance, skills, and manager recommendation. Salary increment: 8-12% for promotion.',
  'team building': 'Team activities monthly. Quarterly off-sites planned. Sports day, cultural events, and wellness programs organized.',
  'help': 'I can help with: Leave, Attendance, Payroll, Performance, Training, Policies, Benefits, Promotions, Team Building, and general HR queries.',
  'default': 'Thank you for your query! For specific information, please contact HR or visit the HR Portal. I\'m available 24/7 to help.',
};

const QUICK_SUGGESTIONS = [
  'Leave Balance',
  'Salary Slip',
  'Attendance',
  'Performance',
  'Training Programs',
  'Company Policies',
  'Benefits',
  'Remote Work',
];

export const AIChatbot: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello ${user?.name}! 👋 I'm your Vista HRMS AI Assistant. I can help with HR policies, leave, attendance, payroll, training, and more. How can I assist you today?`,
      timestamp: new Date(),
      suggestions: QUICK_SUGGESTIONS.slice(0, 4),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateMockAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    for (const [keyword, response] of Object.entries(MOCK_AI_RESPONSES)) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return response;
      }
    }
    return MOCK_AI_RESPONSES.default;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const aiResponse = generateMockAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        suggestions: QUICK_SUGGESTIONS.slice(4),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get AI response.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Copied',
      description: 'Message copied to clipboard.',
    });
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Hello ${user?.name}! 👋 I'm your Vista HRMS AI Assistant. How can I help you today?`,
        timestamp: new Date(),
        suggestions: QUICK_SUGGESTIONS.slice(0, 4),
      },
    ]);
    toast({
      title: 'Chat Cleared',
      description: 'Conversation history has been cleared.',
    });
  };

  const handleDownloadChat = () => {
    const chatContent = messages
      .map((msg) => `[${msg.timestamp.toLocaleTimeString()}] ${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(chatContent));
    element.setAttribute('download', `chat-history-${new Date().toISOString().split('T')[0]}.txt`);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: 'Downloaded',
      description: 'Chat history downloaded successfully.',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <Card className="border-0 rounded-b-lg shadow-md">
        <CardHeader className="pb-3 pt-4 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Vista AI Assistant</CardTitle>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Settings Panel */}
      {showSettings && (
        <Card className="mx-4 mt-2 bg-blue-50 border-blue-200">
          <CardContent className="pt-4 px-4 pb-2">
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-red-600 hover:bg-red-50"
                onClick={handleClearChat}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Chat History
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={handleDownloadChat}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn('flex gap-2', message.role === 'user' ? 'justify-end' : 'justify-start')}>
              {message.role === 'assistant' && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              <div className={cn('max-w-xs', message.role === 'user' ? 'order-2' : '')}>
                <div
                  className={cn(
                    'rounded-lg p-3 text-sm',
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={cn('text-xs mt-1', message.role === 'user' ? 'text-blue-100' : 'text-gray-500')}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.role === 'assistant' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1 text-xs"
                    onClick={() => handleCopyMessage(message.content)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                )}

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg rounded-bl-none p-3">
                <Loader className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-sm text-gray-600">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <Card className="border-0 rounded-t-lg shadow-lg">
        <CardContent className="pt-4 px-4 pb-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me about leave, salary, attendance, or policies..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick access buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            {QUICK_SUGGESTIONS.slice(0, 3).map((suggestion, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
