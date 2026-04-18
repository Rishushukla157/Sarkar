import { User } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Users,
  Database,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { mockCases, mockUsers, mockSLAConfig } from '../../lib/mockData';
import { isOverdue, formatDate } from '../../lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  // System-wide statistics
  const stats = {
    totalCases: mockCases.length,
    totalUsers: mockUsers.length,
    activeCases: mockCases.filter(c => !['RESOLVED', 'CLOSED'].includes(c.status)).length,
    overdueCases: mockCases.filter(c => 
      isOverdue(c.slaDeadline) && !['RESOLVED', 'CLOSED'].includes(c.status)
    ).length,
    resolvedCases: mockCases.filter(c => c.status === 'RESOLVED').length,
    escalatedCases: mockCases.filter(c => c.status === 'ESCALATED').length,
  };

  // Cases by department
  const departmentStats = mockCases.reduce((acc, c) => {
    if (c.department) {
      acc[c.department] = (acc[c.department] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Cases by status
  const statusStats = mockCases.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen app-shell">
      {/* Header */}
      <header className="bg-white/85 backdrop-blur border-b-4 border-b-[#FFD700] shadow-md">
        <div className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] h-1"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 header-section">
              <img 
                src="/triseva-logo.jpeg"
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-[#000080] font-display tracking-tight">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">System Configuration & Monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 header-user-info">
                <UserIcon className="h-5 w-5 text-gray-600" />
                <div className="text-right">
                  <p className="text-sm text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">Administrator</p>
                </div>
              </div>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full pt-8">
        <div className="surface-panel banner-image rounded-2xl p-8 mb-6 mt-2 shadow-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="shimmer-card stat-card stat-card--total border-l-4 border-l-[#000080]">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-4">
                <div className="stat-icon stat-icon--total h-11 w-11 rounded-xl shadow-sm flex items-center justify-center">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Total Cases</p>
                  <p className="text-2xl text-[#1d4ed8] mt-1 font-semibold">{stats.totalCases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shimmer-card stat-card stat-card--dept border-l-4 border-l-[#FFD700]">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-4">
                <div className="stat-icon stat-icon--dept h-11 w-11 rounded-xl shadow-sm flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Total Users</p>
                  <p className="text-2xl text-[#ca8a04] mt-1 font-semibold">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shimmer-card stat-card stat-card--active border-l-4 border-l-[#138808]">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-4">
                <div className="stat-icon stat-icon--active h-11 w-11 rounded-xl shadow-sm flex items-center justify-center">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Active Cases</p>
                  <p className="text-2xl text-[#16a34a] mt-1 font-semibold">{stats.activeCases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shimmer-card stat-card stat-card--overdue border-l-4 border-l-red-600">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-4">
                <div className="stat-icon stat-icon--overdue h-11 w-11 rounded-xl shadow-sm flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Overdue</p>
                  <p className="text-2xl text-[#e11d48] mt-1 font-semibold">{stats.overdueCases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shimmer-card stat-card stat-card--resolved border-l-4 border-l-[#138808]">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-4">
                <div className="stat-icon stat-icon--resolved h-11 w-11 rounded-xl shadow-sm flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Resolved</p>
                  <p className="text-2xl text-[#16a34a] mt-1 font-semibold">{stats.resolvedCases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shimmer-card stat-card stat-card--escalated border-l-4 border-l-[#FF9933]">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-4">
                <div className="stat-icon stat-icon--escalated h-11 w-11 rounded-xl shadow-sm flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Escalated</p>
                  <p className="text-2xl text-[#e11d48] mt-1 font-semibold">{stats.escalatedCases}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4 mt-8">
          <TabsList className="portal-toggle--3 w-full">
            <TabsTrigger value="overview" className="portal-toggle__trigger">System Overview</TabsTrigger>
            <TabsTrigger value="sla" className="portal-toggle__trigger">SLA Configuration</TabsTrigger>
            <TabsTrigger value="users" className="portal-toggle__trigger">User Management</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Department Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Cases by Department</CardTitle>
                  <CardDescription>Distribution across departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(departmentStats).map(([dept, count]) => (
                      <div key={dept} className="flex items-center justify-between">
                        <span className="text-gray-900">{dept}</span>
                        <Badge variant="outline">{count} cases</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Status Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Cases by Status</CardTitle>
                  <CardDescription>Current status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(statusStats).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between">
                        <span className="text-gray-900">{status.replace('_', ' ')}</span>
                        <Badge variant="outline">{count} cases</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Key metrics and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.overdueCases > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-red-900">
                        {stats.overdueCases} cases are overdue and require immediate attention
                      </p>
                      <p className="text-sm text-red-700 mt-1">
                        SLA escalation engine will automatically reassign if not resolved
                      </p>
                    </div>
                  </div>
                )}

                {stats.escalatedCases > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-orange-900">
                        {stats.escalatedCases} cases have been escalated to senior officers
                      </p>
                      <p className="text-sm text-orange-700 mt-1">
                        Monitor escalation patterns for process improvements
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-green-900">
                      System is operational with complete audit trail enabled
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      All case actions are logged for transparency and accountability
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SLA Configuration Tab */}
          <TabsContent value="sla">
            <Card>
              <CardHeader>
                <CardTitle>SLA Configuration</CardTitle>
                <CardDescription>
                  Service Level Agreement settings for automatic escalation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Response Time</TableHead>
                      <TableHead>Resolution Time</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSLAConfig.map((config, index) => (
                      <TableRow key={index}>
                        <TableCell>{config.caseType}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{config.priority}</Badge>
                        </TableCell>
                        <TableCell>{config.responseTimeHours} hours</TableCell>
                        <TableCell>{config.resolutionTimeDays} days</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>System users and their roles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{u.role}</Badge>
                        </TableCell>
                        <TableCell>{u.department || '-'}</TableCell>
                        <TableCell>{formatDate(u.createdAt)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
