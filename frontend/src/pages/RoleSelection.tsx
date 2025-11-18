import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Shield, Users, BarChart3, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      title: 'Administrator',
      icon: Shield,
      color: 'from-red-500 to-pink-600',
      description: 'Full system access, user management, settings',
      features: ['System Configuration', 'User Management', 'Audit Logs', 'API Management'],
      email: 'admin@vista.com',
      password: 'admin123',
    },
    {
      id: 'hr',
      title: 'HR Manager',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      description: 'Recruitment, payroll, employee management',
      features: ['Recruitment', 'Payroll', 'Benefits', 'Compliance'],
      email: 'hr@vista.com',
      password: 'hr123',
    },
    {
      id: 'manager',
      title: 'Team Manager',
      icon: BarChart3,
      color: 'from-amber-500 to-orange-600',
      description: 'Team oversight, performance, scheduling',
      features: ['Team Analytics', 'Performance Review', 'Leave Approval', 'Scheduling'],
      email: 'manager@vista.com',
      password: 'manager123',
    },
    {
      id: 'employee',
      title: 'Employee',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-600',
      description: 'Personal dashboard, leave requests, timesheets',
      features: ['Leave Management', 'Timesheet', 'Performance Goals', 'Benefits'],
      email: 'employee@vista.com',
      password: 'employee123',
    },
  ];

  const handleQuickLogin = (email: string, password: string) => {
    navigate('/login', { state: { email, password, autoLogin: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 backdrop-blur-md bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Vista HRMS</h1>
              <p className="text-xs text-slate-400">Enterprise HR Management Suite</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            V1.0 Pro
          </Badge>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full">
            {/* Title */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Welcome to Vista HRMS
              </h2>
              <p className="text-lg text-slate-300 mb-2">
                Select your role to access the system
              </p>
              <p className="text-sm text-slate-400">
                Enterprise-grade HR management platform with AI-powered insights
              </p>
            </div>

            {/* Role Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {roles.map((role) => {
                const Icon = role.icon;
                const gradientClass = role.color;

                return (
                  <Card
                    key={role.id}
                    className="group relative overflow-hidden border border-slate-700 bg-slate-800/50 backdrop-blur hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
                    onClick={() => handleQuickLogin(role.email, role.password)}
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                    <CardHeader className="relative">
                      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg text-white group-hover:text-blue-400 transition-colors">
                        {role.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        {role.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative space-y-4">
                      <div className="space-y-2">
                        {role.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <Button
                        className={`w-full mt-4 bg-gradient-to-r ${gradientClass} text-white border-0 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickLogin(role.email, role.password);
                        }}
                      >
                        Login as {role.title}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>

                      <div className="pt-2 border-t border-slate-700">
                        <p className="text-xs text-slate-500">
                          <strong>{role.email}</strong>
                        </p>
                        <p className="text-xs text-slate-500">
                          Pass: <code className="text-slate-400">{role.password}</code>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Info Section */}
            <Card className="border border-slate-700 bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg text-white">Demo Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white text-sm">Default Accounts</h4>
                    {roles.map((role) => (
                      <div key={role.id} className="text-xs text-slate-400 bg-slate-900/50 p-2 rounded border border-slate-700">
                        <p><strong className="text-slate-200">{role.title}:</strong></p>
                        <p>Email: {role.email}</p>
                        <p>Password: {role.password}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white text-sm">Features Included</h4>
                    <ul className="space-y-2 text-xs text-slate-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>60+ Pre-built Pages</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>AI-Powered Assistant</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Role-Based Access Control</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Real-Time Dashboard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Responsive Design</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>Complete API</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 backdrop-blur-md bg-slate-900/50 px-6 py-4 text-center text-sm text-slate-400">
          <p>© 2024 Vista HRMS. All rights reserved. | Enterprise HR Management Suite</p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
