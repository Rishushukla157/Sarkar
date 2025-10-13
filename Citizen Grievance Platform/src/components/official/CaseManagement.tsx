import React, { useState } from 'react';
import { Case, User, CaseStatus, AuditLog, CaseComment } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  User as UserIcon, 
  Building, 
  Calendar,
  Send,
  CheckCircle2,
  XCircle,
  ArrowUpCircle,
  AlertTriangle
} from 'lucide-react';
import { 
  getAuditLogsByCaseId, 
  getCommentsByCaseId,
  mockAuditLogs,
  mockComments,
  mockUsers
} from '../../lib/mockData';
import { 
  formatDate, 
  formatDateTime,
  getStatusColor, 
  getPriorityColor, 
  getCaseTypeColor,
  getTimeRemaining,
  isOverdue,
  getDaysSinceSubmission,
  getRoleDisplayName 
} from '../../lib/utils';
import { CaseTimeline } from '../shared/CaseTimeline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface CaseManagementProps {
  caseData: Case;
  user: User;
  onBack: () => void;
  onUpdate: (updatedCase: Case) => void;
}

export function CaseManagement({ caseData, user, onBack, onUpdate }: CaseManagementProps) {
  const [comment, setComment] = useState('');
  const [newStatus, setNewStatus] = useState<CaseStatus>(caseData.status);
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  const [showEscalateDialog, setShowEscalateDialog] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [escalationReason, setEscalationReason] = useState('');

  const auditLogs = getAuditLogsByCaseId(caseData.id);
  const allComments = getCommentsByCaseId(caseData.id);
  
  // Show internal comments to officials
  const visibleComments = user.role === 'CITIZEN' 
    ? allComments.filter(c => !c.isInternal)
    : allComments;

  const handleAddComment = () => {
    if (!comment.trim()) return;

    const newComment: CaseComment = {
      id: `COM${Date.now()}`,
      caseId: caseData.id,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      comment: comment.trim(),
      isInternal: isInternalComment,
      timestamp: new Date(),
    };

    mockComments.push(newComment);

    const auditLog: AuditLog = {
      id: `AUD${Date.now()}`,
      caseId: caseData.id,
      action: 'COMMENT_ADDED',
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      timestamp: new Date(),
      details: `${isInternalComment ? 'Internal' : 'Public'} comment added by ${user.name}`,
    };

    mockAuditLogs.push(auditLog);
    setComment('');
    window.location.reload(); // In production, would use state management
  };

  const handleStatusChange = () => {
    if (newStatus === caseData.status) return;

    const auditLog: AuditLog = {
      id: `AUD${Date.now()}`,
      caseId: caseData.id,
      action: 'STATUS_CHANGED',
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      timestamp: new Date(),
      details: `Status changed from ${caseData.status} to ${newStatus}`,
    };

    mockAuditLogs.push(auditLog);
    caseData.status = newStatus;
    caseData.updatedAt = new Date();
    onUpdate(caseData);
  };

  const handleResolveCase = () => {
    if (!resolutionNotes.trim()) {
      alert('Please provide resolution notes');
      return;
    }

    const auditLog: AuditLog = {
      id: `AUD${Date.now()}`,
      caseId: caseData.id,
      action: 'CASE_RESOLVED',
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      timestamp: new Date(),
      details: `Case resolved by ${user.name}. Resolution: ${resolutionNotes}`,
    };

    mockAuditLogs.push(auditLog);
    caseData.status = 'RESOLVED';
    caseData.resolvedAt = new Date();
    caseData.updatedAt = new Date();
    
    setShowResolveDialog(false);
    onUpdate(caseData);
  };

  const handleEscalateCase = () => {
    if (!escalationReason.trim()) {
      alert('Please provide escalation reason');
      return;
    }

    // Find next level officer
    const nextOfficer = mockUsers.find(u => 
      u.department === caseData.department && 
      u.role === 'SENIOR_OFFICER'
    );

    const auditLog: AuditLog = {
      id: `AUD${Date.now()}`,
      caseId: caseData.id,
      action: 'CASE_ESCALATED',
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      timestamp: new Date(),
      details: `Case manually escalated by ${user.name}. Reason: ${escalationReason}`,
      metadata: { 
        reason: escalationReason,
        previousAssignee: caseData.assignedToName 
      },
    };

    mockAuditLogs.push(auditLog);
    caseData.status = 'ESCALATED';
    caseData.escalationLevel += 1;
    if (nextOfficer) {
      caseData.assignedTo = nextOfficer.id;
      caseData.assignedToName = nextOfficer.name;
    }
    caseData.updatedAt = new Date();
    
    setShowEscalateDialog(false);
    onUpdate(caseData);
  };

  const overdueFlag = isOverdue(caseData.slaDeadline) && !['RESOLVED', 'CLOSED'].includes(caseData.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Overdue Alert */}
        {overdueFlag && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This case is overdue! SLA deadline was {formatDateTime(caseData.slaDeadline)}
            </AlertDescription>
          </Alert>
        )}

        {/* Header Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {overdueFlag && <AlertTriangle className="h-6 w-6 text-red-600" />}
                  <CardTitle className="text-2xl">{caseData.title}</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getStatusColor(caseData.status)}>
                    {caseData.status.replace('_', ' ')}
                  </Badge>
                  <Badge className={getPriorityColor(caseData.priority)}>
                    {caseData.priority} PRIORITY
                  </Badge>
                  <Badge className={getCaseTypeColor(caseData.type)}>
                    {caseData.type}
                  </Badge>
                  {caseData.escalationLevel > 0 && (
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      ESCALATED (Level {caseData.escalationLevel})
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-base">
                  {caseData.description}
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={() => setShowResolveDialog(true)} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Resolve Case
                </Button>
                <Button variant="outline" onClick={() => setShowEscalateDialog(true)} className="gap-2">
                  <ArrowUpCircle className="h-4 w-4" />
                  Escalate
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Case Number</p>
                  <p className="text-gray-900">{caseData.caseNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <UserIcon className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Citizen</p>
                  <p className="text-gray-900">{caseData.citizenName}</p>
                  <p className="text-xs text-gray-600">{caseData.citizenEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Submitted</p>
                  <p className="text-gray-900">{formatDate(caseData.createdAt)}</p>
                  <p className="text-xs text-gray-600">
                    {getDaysSinceSubmission(caseData.createdAt)} days ago
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className={`h-5 w-5 mt-0.5 ${overdueFlag ? 'text-red-600' : 'text-gray-600'}`} />
                <div>
                  <p className="text-sm text-gray-600">SLA Deadline</p>
                  <p className={overdueFlag ? 'text-red-600' : 'text-gray-900'}>
                    {formatDate(caseData.slaDeadline)}
                  </p>
                  <p className={`text-xs ${overdueFlag ? 'text-red-600' : 'text-gray-600'}`}>
                    {getTimeRemaining(caseData.slaDeadline)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="actions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="actions">Actions & Status</TabsTrigger>
            <TabsTrigger value="timeline">Complete Timeline</TabsTrigger>
            <TabsTrigger value="details">Full Details</TabsTrigger>
          </TabsList>

          {/* Actions Tab */}
          <TabsContent value="actions" className="space-y-4">
            {/* Status Change Card */}
            <Card>
              <CardHeader>
                <CardTitle>Case Status</CardTitle>
                <CardDescription>Update the case status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newStatus} onValueChange={(value) => setNewStatus(value as CaseStatus)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SUBMITTED">Submitted</SelectItem>
                        <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                        <SelectItem value="PENDING_INFO">Pending Info</SelectItem>
                        <SelectItem value="ESCALATED">Escalated</SelectItem>
                        <SelectItem value="RESOLVED">Resolved</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleStatusChange} disabled={newStatus === caseData.status}>
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comments Card */}
            <Card>
              <CardHeader>
                <CardTitle>Add Comment / Update</CardTitle>
                <CardDescription>
                  Add notes for the citizen or internal notes for other officials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    placeholder="Enter your comment or update..."
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="internal"
                    checked={isInternalComment}
                    onChange={(e) => setIsInternalComment(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="internal" className="cursor-pointer">
                    Internal comment (not visible to citizen)
                  </Label>
                </div>

                <Button onClick={handleAddComment} disabled={!comment.trim()} className="gap-2">
                  <Send className="h-4 w-4" />
                  Add Comment
                </Button>
              </CardContent>
            </Card>

            {/* Comments History */}
            <Card>
              <CardHeader>
                <CardTitle>Comments & Updates</CardTitle>
              </CardHeader>
              <CardContent>
                {visibleComments.length > 0 ? (
                  <div className="space-y-4">
                    {visibleComments.map((c) => (
                      <div 
                        key={c.id} 
                        className={`p-4 rounded-lg border ${
                          c.isInternal ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-gray-900">{c.userName}</p>
                            <p className="text-sm text-gray-600">
                              {getRoleDisplayName(c.userRole)}
                              {c.isInternal && ' • Internal Note'}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {formatDateTime(c.timestamp)}
                          </p>
                        </div>
                        <p className="text-gray-700">{c.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">No comments yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Complete Audit Trail</CardTitle>
                <CardDescription>
                  Full history of all actions taken on this case
                </CardDescription>
              </CardHeader>
              <CardContent>
                {auditLogs.length > 0 ? (
                  <CaseTimeline auditLogs={auditLogs} />
                ) : (
                  <p className="text-gray-600 text-center py-8">No activity yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Complete Case Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-2">Case Information</h3>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Case ID</p>
                      <p className="text-gray-900">{caseData.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Case Number</p>
                      <p className="text-gray-900">{caseData.caseNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="text-gray-900">{caseData.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Priority</p>
                      <p className="text-gray-900">{caseData.priority}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="text-gray-900">{caseData.status.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Escalation Level</p>
                      <p className="text-gray-900">{caseData.escalationLevel}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">Citizen Information</h3>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="text-gray-900">{caseData.citizenName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-900">{caseData.citizenEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Citizen ID</p>
                      <p className="text-gray-900">{caseData.citizenId}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">Assignment</h3>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="text-gray-900">{caseData.department || 'Not assigned'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Assigned Officer</p>
                      <p className="text-gray-900">{caseData.assignedToName || 'Pending'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">Timeline</h3>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Created At</p>
                      <p className="text-gray-900">{formatDateTime(caseData.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Updated</p>
                      <p className="text-gray-900">{formatDateTime(caseData.updatedAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">SLA Deadline</p>
                      <p className="text-gray-900">{formatDateTime(caseData.slaDeadline)}</p>
                    </div>
                    {caseData.resolvedAt && (
                      <div>
                        <p className="text-sm text-gray-600">Resolved At</p>
                        <p className="text-gray-900">{formatDateTime(caseData.resolvedAt)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Resolve Dialog */}
      <AlertDialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resolve Case</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide details about the resolution
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Describe how this case was resolved..."
              rows={6}
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResolveCase}>
              Resolve Case
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Escalate Dialog */}
      <AlertDialog open={showEscalateDialog} onOpenChange={setShowEscalateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Escalate Case</AlertDialogTitle>
            <AlertDialogDescription>
              This will escalate the case to a senior officer. Please provide a reason.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Reason for escalation..."
              rows={4}
              value={escalationReason}
              onChange={(e) => setEscalationReason(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEscalateCase}>
              Escalate Case
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
