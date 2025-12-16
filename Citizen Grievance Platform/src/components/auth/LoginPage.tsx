import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AuthService } from '../../lib/auth';
import { User } from '../../types';
import { AlertCircle, Scale, Users } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onRegister: () => void;
}

export function LoginPage({ onLogin, onRegister }: LoginPageProps) {
  const [citizenId, setCitizenId] = useState('');
  const [officialId, setOfficialId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCitizenLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await AuthService.login(citizenId, password);
      if (user && user.role === 'CITIZEN') {
        onLogin(user);
      } else {
        setError('Invalid credentials or not a citizen account');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOfficialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await AuthService.login(officialId, password);
      if (user && AuthService.canAccessOfficialPortal(user)) {
        onLogin(user);
      } else {
        setError('Invalid credentials or insufficient permissions');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Quick login buttons for demo
  const quickLogin = async (email: string) => {
    const user = await AuthService.login(email, 'demo');
    if (user) {
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Official Header with Emblem */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-t-4 border-[#FF9933]">
          <div className="flex items-center justify-center gap-6 mb-6">
            <img 
    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
    alt="National Emblem of India"
    className="h-20 w-20 object-contain"
/>
            <div className="text-center">
              <h1 className="text-3xl text-[#000080] mb-1">भारत सरकार</h1>
              <h2 className="text-2xl text-gray-800 mb-1">Government of India</h2>
              <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mb-2"></div>
              <h1 className="text-gray-900">National Grievance & Appeals Portal</h1>
              <p className="text-gray-600">सत्यमेव जयते • Truth Alone Triumphs</p>
            </div>
            <img 
    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
    alt="National Emblem of India"
    className="h-20 w-20 object-contain"
/>
          </div>
          <div className="text-center">
            <p className="text-gray-700">Transparent governance through accountability</p>
          </div>
        </div>

        <Tabs defaultValue="citizen" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="citizen" className="gap-2">
              <Users className="h-4 w-4" />
              Citizen Portal
            </TabsTrigger>
            <TabsTrigger value="official" className="gap-2">
              <Scale className="h-4 w-4" />
              Official Portal
            </TabsTrigger>
          </TabsList>

          {/* Citizen Login */}
          <TabsContent value="citizen">
            <Card className="border-l-4 border-l-[#138808] shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-white">
                <CardTitle className="text-[#000080]">Citizen Login</CardTitle>
                <CardDescription>
                  Access your grievances and track submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCitizenLogin} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="citizen-id">Email or National ID</Label>
                    <Input
                      id="citizen-id"
                      type="text"
                      placeholder="email@example.com or NID-XXXXXXXXX"
                      value={citizenId}
                      onChange={(e) => setCitizenId(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="citizen-password">Password</Label>
                    <Input
                      id="citizen-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={onRegister}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      New user? Register with National ID
                    </button>
                  </div>
                </form>

                {/* Demo Accounts */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-3">Demo Accounts (click to login):</p>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => quickLogin('rajesh.kumar@example.com')}
                    >
                      Rajesh Kumar (NID-123456789)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => quickLogin('priya.sharma@example.com')}
                    >
                      Priya Sharma (NID-987654321)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Official Login */}
          <TabsContent value="official">
            <Card className="border-l-4 border-l-[#000080] shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                <CardTitle className="text-[#000080]">Official Portal Login</CardTitle>
                <CardDescription>
                  For government officials and administrators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleOfficialLogin} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="official-id">Official Email</Label>
                    <Input
                      id="official-id"
                      type="email"
                      placeholder="official@gov.in"
                      value={officialId}
                      onChange={(e) => setOfficialId(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="official-password">Password</Label>
                    <Input
                      id="official-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>

                {/* Demo Accounts */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-3">Demo Accounts (click to login):</p>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => quickLogin('amit.patel@gov.in')}
                    >
                      Officer Amit Patel
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => quickLogin('sunita.verma@gov.in')}
                    >
                      Senior Officer Sunita Verma
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => quickLogin('vikram.singh@gov.in')}
                    >
                      Dept Head Vikram Singh
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => quickLogin('kavita.reddy@gov.in')}
                    >
                      Admin Kavita Reddy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* System Info */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] h-1"></div>
          <div className="p-6">
            <div className="text-center mb-4">
              <p className="text-[#000080] font-medium">Secure • Transparent • Accountable</p>
              <p className="text-sm text-gray-600 mt-2">
                This system ensures SLA-based automatic escalation and complete audit trails
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <p className="text-[#000080] font-medium mb-1">National ID Verified</p>
                <p className="text-gray-700 text-xs">Secure authentication</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <p className="text-[#000080] font-medium mb-1">Auto Escalation</p>
                <p className="text-gray-700 text-xs">SLA-based accountability</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <p className="text-[#000080] font-medium mb-1">Complete Audit Trail</p>
                <p className="text-gray-700 text-xs">Full transparency</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Government of India. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
