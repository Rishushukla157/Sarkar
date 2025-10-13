import React, { useState } from 'react';
import { User, Case } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Scale, 
  Search, 
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  User as UserIcon,
  FileText,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { getCasesByOfficerId, mockCases } from '../../lib/mockData';
import { 
  formatDate, 
  getStatusColor, 
  getPriorityColor, 
  getCaseTypeColor,
  getTimeRemaining,
  isOverdue,
  getRoleDisplayName 
} from '../../lib/utils';
import { CaseManagement } from './CaseManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { HelpDialog } from '../shared/HelpDialog';

interface OfficialDashboardProps {
  user: User;
  onLogout: () => void;
}

export function OfficialDashboard({ user, onLogout }: OfficialDashboardProps) {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Get cases assigned to this officer
  const assignedCases = getCasesByOfficerId(user.id);
  
  // Get all cases in department (if dept head or admin)
  const departmentCases = user.role === 'DEPT_HEAD' || user.role === 'ADMIN'
    ? mockCases.filter(c => c.department === user.department || user.role === 'ADMIN')
    : [];

  // Calculate statistics
  const stats = {
    assigned: assignedCases.length,
    pending: assignedCases.filter(c => ['SUBMITTED', 'UNDER_REVIEW', 'PENDING_INFO'].includes(c.status)).length,
    overdue: assignedCases.filter(c => isOverdue(c.slaDeadline) && !['RESOLVED', 'CLOSED'].includes(c.status)).length,
    resolved: assignedCases.filter(c => c.status === 'RESOLVED').length,
    totalDept: departmentCases.length,
  };

  // Filter cases
  const filterCases = (cases: Case[]) => {
    return cases.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           c.citizenName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || c.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  };

  const filteredAssignedCases = filterCases(assignedCases);
  const filteredDepartmentCases = filterCases(departmentCases);

  if (selectedCase) {
    return (
      <CaseManagement
        caseData={selectedCase}
        user={user}
        onBack={() => setSelectedCase(null)}
        onUpdate={(updatedCase) => {
          // In production, would refresh case list
          setSelectedCase(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-4 border-b-[#000080] shadow-sm">
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
                <h1 className="text-[#000080]">Official Portal</h1>
                <p className="text-sm text-gray-600">Case Management & Review</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-gray-600" />
                <div className="text-right">
                  <p className="text-sm text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{getRoleDisplayName(user.role)}</p>
                  {user.department && (
                    <p className="text-xs text-gray-600">{user.department}</p>
                  )}
                </div>
              </div>
              <Button variant="outline" onClick={() => setShowHelp(true)}>
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-l-4 border-l-[#000080] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Assigned to Me</p>
                  <p className="text-2xl text-[#000080] mt-1">{stats.assigned}</p>
                </div>
                <FileText className="h-8 w-8 text-[#000080]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#FF9933] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Action</p>
                  <p className="text-2xl text-[#FF9933] mt-1">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-[#FF9933]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-600 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl text-red-600 mt-1">{stats.overdue}</p>
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
                  <p className="text-2xl text-[#138808] mt-1">{stats.resolved}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-[#138808]" />
              </div>
            </CardContent>
          </Card>

          {(user.role === 'DEPT_HEAD' || user.role === 'ADMIN') && (
            <Card className="border-l-4 border-l-[#FFD700] shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Department Total</p>
                    <p className="text-2xl text-[#000080] mt-1">{stats.totalDept}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-[#000080]" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="SUBMITTED">Submitted</SelectItem>
              <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
              <SelectItem value="PENDING_INFO">Pending Info</SelectItem>
              <SelectItem value="ESCALATED">Escalated</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs for My Cases vs Department Cases */}
        <Tabs defaultValue="assigned" className="space-y-4">
          <TabsList>
            <TabsTrigger value="assigned">My Assigned Cases ({filteredAssignedCases.length})</TabsTrigger>
            {(user.role === 'DEPT_HEAD' || user.role === 'ADMIN') && (
              <TabsTrigger value="department">
                {user.role === 'ADMIN' ? 'All Cases' : 'Department Cases'} ({filteredDepartmentCases.length})
              </TabsTrigger>
            )}
          </TabsList>

          {/* Assigned Cases Tab */}
          <TabsContent value="assigned">
            <CaseList cases={filteredAssignedCases} onSelectCase={setSelectedCase} />
          </TabsContent>

          {/* Department Cases Tab */}
          {(user.role === 'DEPT_HEAD' || user.role === 'ADMIN') && (
            <TabsContent value="department">
              <CaseList cases={filteredDepartmentCases} onSelectCase={setSelectedCase} />
            </TabsContent>
          )}
        </Tabs>
      </div>

      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />
    </div>
  );
}

// Reusable Case List Component
function CaseList({ cases, onSelectCase }: { cases: Case[]; onSelectCase: (c: Case) => void }) {
  if (cases.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No cases found</p>
        </CardContent>
      </Card>
    );
  }

  // Sort by overdue first, then by priority
  const sortedCases = [...cases].sort((a, b) => {
    const aOverdue = isOverdue(a.slaDeadline) && !['RESOLVED', 'CLOSED'].includes(a.status);
    const bOverdue = isOverdue(b.slaDeadline) && !['RESOLVED', 'CLOSED'].includes(b.status);
    
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;
    
    const priorityOrder = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-4">
      {sortedCases.map((caseItem) => {
        const overdueFlag = isOverdue(caseItem.slaDeadline) && !['RESOLVED', 'CLOSED'].includes(caseItem.status);
        
        return (
          <Card 
            key={caseItem.id} 
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              overdueFlag ? 'border-red-300 bg-red-50' : ''
            }`}
            onClick={() => onSelectCase(caseItem)}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {overdueFlag && <AlertTriangle className="h-5 w-5 text-red-600" />}
                    <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                  </div>
                  <CardDescription>{caseItem.description}</CardDescription>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(caseItem.status)}>
                    {caseItem.status.replace('_', ' ')}
                  </Badge>
                  <Badge className={getPriorityColor(caseItem.priority)}>
                    {caseItem.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Case #:</span>
                  <span className="text-gray-900">{caseItem.caseNumber}</span>
                </div>
                <Badge className={getCaseTypeColor(caseItem.type)}>
                  {caseItem.type}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Citizen:</span>
                  <span className="text-gray-900">{caseItem.citizenName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Submitted:</span>
                  <span className="text-gray-900">{formatDate(caseItem.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className={`h-4 w-4 ${overdueFlag ? 'text-red-600' : 'text-gray-600'}`} />
                  <span className={overdueFlag ? 'text-red-600' : 'text-gray-600'}>
                    {getTimeRemaining(caseItem.slaDeadline)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
