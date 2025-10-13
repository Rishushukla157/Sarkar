import React, { useState } from 'react';
import { User, Case } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Clock,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  User as UserIcon,
  HelpCircle
} from 'lucide-react';
import { getCasesByCitizenId } from '../../lib/mockData';
import { 
  formatDate, 
  getStatusColor, 
  getPriorityColor, 
  getCaseTypeColor,
  getTimeRemaining,
  isOverdue 
} from '../../lib/utils';
import { CaseDetails } from './CaseDetails';
import { SubmitGrievance } from './SubmitGrievance';
import { HelpDialog } from '../shared/HelpDialog';

interface CitizenDashboardProps {
  user: User;
  onLogout: () => void;
}

export function CitizenDashboard({ user, onLogout }: CitizenDashboardProps) {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const cases = getCasesByCitizenId(user.id);

  // Calculate statistics
  const stats = {
    total: cases.length,
    pending: cases.filter(c => ['SUBMITTED', 'UNDER_REVIEW', 'PENDING_INFO'].includes(c.status)).length,
    escalated: cases.filter(c => c.status === 'ESCALATED').length,
    resolved: cases.filter(c => ['RESOLVED', 'CLOSED'].includes(c.status)).length,
  };

  // Filter cases
  const filteredCases = cases.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesType = filterType === 'all' || c.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  if (selectedCase) {
    return (
      <CaseDetails 
        caseData={selectedCase} 
        user={user}
        onBack={() => setSelectedCase(null)} 
      />
    );
  }

  if (showSubmitForm) {
    return (
      <SubmitGrievance
        user={user}
        onBack={() => setShowSubmitForm(false)}
        onSubmit={(newCase) => {
          setShowSubmitForm(false);
          // In production, would refresh the case list
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-4 border-b-[#FF9933] shadow-sm">
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
                <h1 className="text-[#000080]">Citizen Portal</h1>
                <p className="text-sm text-gray-600">Track and manage your grievances</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-gray-600" />
                <div className="text-right">
                  <p className="text-sm text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.nationalId}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-[#000080] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Cases</p>
                  <p className="text-2xl text-[#000080] mt-1">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-[#000080]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#FF9933] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
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
                  <p className="text-sm text-gray-600">Escalated</p>
                  <p className="text-2xl text-red-600 mt-1">{stats.escalated}</p>
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
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button onClick={() => setShowSubmitForm(true)} className="sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Submit New Grievance
          </Button>

          <div className="flex-1 flex gap-2">
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
                <SelectItem value="ESCALATED">Escalated</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ADMINISTRATIVE">Administrative</SelectItem>
                <SelectItem value="JUDICIAL">Judicial</SelectItem>
                <SelectItem value="LEGISLATIVE">Legislative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredCases.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No cases found</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setShowSubmitForm(true)}
                >
                  Submit Your First Grievance
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredCases.map((caseItem) => (
              <Card 
                key={caseItem.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedCase(caseItem)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
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
                      <span className="text-gray-600">Submitted:</span>
                      <span className="text-gray-900">{formatDate(caseItem.createdAt)}</span>
                    </div>
                    {caseItem.assignedToName && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Assigned to:</span>
                        <span className="text-gray-900">{caseItem.assignedToName}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className={`h-4 w-4 ${isOverdue(caseItem.slaDeadline) ? 'text-red-600' : 'text-gray-600'}`} />
                      <span className={isOverdue(caseItem.slaDeadline) ? 'text-red-600' : 'text-gray-600'}>
                        {getTimeRemaining(caseItem.slaDeadline)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />
    </div>
  );
}
