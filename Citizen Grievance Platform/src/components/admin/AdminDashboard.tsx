import React, { useState } from 'react';
import { User } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Settings, 
  Users, 
  Database, 
  Activity,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  User as UserIcon,
  HelpCircle
} from 'lucide-react';
import { mockCases, mockUsers, mockSLAConfig } from '../../lib/mockData';
import { isOverdue, formatDate } from '../../lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { HelpDialog } from '../shared/HelpDialog';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-4 border-b-[#FFD700] shadow-sm">
        <div className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] h-1"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1723078543178-2f40f94464d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2hva2ElMjBjaGFrcmElMjBJbmRpYSUyMHN5bWJvbHxlbnwxfHx8fDE3NjAzODEzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="National Emblem"
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-[#000080]">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">System Configuration & Monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border-l-4 border-l-[#000080] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Cases</p>
                  <p className="text-2xl text-[#000080] mt-1">{stats.totalCases}</p>
                </div>
                <Database className="h-8 w-8 text-[#000080]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#FFD700] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl text-[#000080] mt-1">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-[#FFD700]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#138808] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Cases</p>
                  <p className="text-2xl text-[#138808] mt-1">{stats.activeCases}</p>
                </div>
                <Activity className="h-8 w-8 text-[#138808]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-600 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl text-red-600 mt-1">{stats.overdueCases}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#138808] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-2xl text-[#138808] mt-1">{stats.resolvedCases}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-[#138808]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#FF9933] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Escalated</p>
                  <p className="text-2xl text-[#FF9933] mt-1">{stats.escalatedCases}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#FF9933]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="sla">SLA Configuration</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
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
