import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, ArrowLeft, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const autoLoginEmail = location.state?.email;
  const autoLoginPassword = location.state?.password;
  const autoLogin = location.state?.autoLogin;

  // Auto-login if credentials are provided from role selection
  useEffect(() => {
    if (autoLogin && autoLoginEmail && autoLoginPassword) {
      setEmail(autoLoginEmail);
      setPassword(autoLoginPassword);
      handleAutoLogin(autoLoginEmail, autoLoginPassword);
    }
  }, []);

  const handleAutoLogin = async (emailVal: string, passwordVal: string) => {
    setIsLoading(true);
    const success = await login(emailVal, passwordVal);
    
    if (success) {
      toast({
        title: 'Welcome!',
        description: 'Successfully logged in.',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid credentials.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAutoLogin(email, password);
  };

  const quickLogins = [
    { email: 'admin@vista.com', password: 'admin123', role: 'Admin' },
    { email: 'hr@vista.com', password: 'hr123', role: 'HR' },
    { email: 'manager@vista.com', password: 'manager123', role: 'Manager' },
    { email: 'employee@vista.com', password: 'employee123', role: 'Employee' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 text-slate-300 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Role Selection
        </Button>

        <Card className="shadow-2xl border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader className="text-center">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Login</CardTitle>
            <CardDescription className="text-slate-300">
              Enter your credentials to access Vista HRMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <Loader className="h-8 w-8 text-blue-500 animate-spin" />
                <p className="text-slate-300">Logging in...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            )}

            {!isLoading && (
              <div className="mt-6">
                <p className="text-sm text-slate-400 text-center mb-3">
                  Quick login (demo credentials):
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickLogins.map((account) => (
                    <Button
                      key={account.role}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEmail(account.email);
                        setPassword(account.password);
                      }}
                      className="text-xs border-slate-600 hover:bg-slate-700"
                    >
                      {account.role}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
