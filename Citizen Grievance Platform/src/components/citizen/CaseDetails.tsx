import React from 'react';
import { Case, User } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ArrowLeft, FileText, Clock, User as UserIcon, Building, Calendar } from 'lucide-react';
import { 
  getAuditLogsByCaseId, 
  getCommentsByCaseId 
} from '../../lib/mockData';
import { 
  formatDate, 
  formatDateTime,
  getStatusColor, 
  getPriorityColor, 
  getCaseTypeColor,
  getTimeRemaining,
  isOverdue,
  getDaysSinceSubmission 
} from '../../lib/utils';
import { CaseTimeline } from '../shared/CaseTimeline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface CaseDetailsProps {
  caseData: Case;
  user: User;
  onBack: () => void;
}

export function CaseDetails({ caseData, user, onBack }: CaseDetailsProps) {
  const auditLogs = getAuditLogsByCaseId(caseData.id);
  const comments = getCommentsByCaseId(caseData.id).filter(c => !c.isInternal);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
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
                <Clock className={`h-5 w-5 mt-0.5 ${isOverdue(caseData.slaDeadline) ? 'text-red-600' : 'text-gray-600'}`} />
                <div>
                  <p className="text-sm text-gray-600">SLA Deadline</p>
                  <p className={isOverdue(caseData.slaDeadline) ? 'text-red-600' : 'text-gray-900'}>
                    {formatDate(caseData.slaDeadline)}
                  </p>
                  <p className={`text-xs ${isOverdue(caseData.slaDeadline) ? 'text-red-600' : 'text-gray-600'}`}>
                    {getTimeRemaining(caseData.slaDeadline)}
                  </p>
                </div>
              </div>

              {caseData.assignedToName && (
                <div className="flex items-start gap-3">
                  <UserIcon className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Assigned To</p>
                    <p className="text-gray-900">{caseData.assignedToName}</p>
                    {caseData.department && (
                      <p className="text-xs text-gray-600">{caseData.department}</p>
                    )}
                  </div>
                </div>
              )}

              {!caseData.assignedToName && caseData.department && (
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="text-gray-900">{caseData.department}</p>
                    <p className="text-xs text-gray-600">Pending assignment</p>
                  </div>
                </div>
              )}
            </div>

            {caseData.resolvedAt && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-900">
                  <strong>Resolved on {formatDate(caseData.resolvedAt)}</strong>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="timeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="timeline">Timeline & Activity</TabsTrigger>
            <TabsTrigger value="updates">Updates & Comments</TabsTrigger>
            <TabsTrigger value="details">Complete Details</TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Case Timeline</CardTitle>
                <CardDescription>
                  Complete audit trail of all actions taken on this case
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

          {/* Updates Tab */}
          <TabsContent value="updates">
            <Card>
              <CardHeader>
                <CardTitle>Updates & Comments</CardTitle>
                <CardDescription>
                  Public updates and communications regarding your case
                </CardDescription>
              </CardHeader>
              <CardContent>
                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-gray-900">{comment.userName}</p>
                            <p className="text-sm text-gray-600">{comment.userRole.replace('_', ' ')}</p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {formatDateTime(comment.timestamp)}
                          </p>
                        </div>
                        <p className="text-gray-700">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">No updates yet</p>
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
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">Assignment Information</h3>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="text-gray-900">{caseData.department || 'Not assigned'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Assigned Officer</p>
                      <p className="text-gray-900">{caseData.assignedToName || 'Pending assignment'}</p>
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
    </div>
  );
}
