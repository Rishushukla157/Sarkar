import React from 'react';
import { AuditLog } from '../../types';
import { formatDateTime } from '../../lib/utils';
import { 
  FileText, 
  UserPlus, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Edit, 
  ArrowUpCircle,
  MessageSquare,
  Clock
} from 'lucide-react';

interface CaseTimelineProps {
  auditLogs: AuditLog[];
}

export function CaseTimeline({ auditLogs }: CaseTimelineProps) {
  const getIcon = (action: string) => {
    switch (action) {
      case 'CASE_CREATED':
        return <FileText className="h-4 w-4" />;
      case 'CASE_ASSIGNED':
      case 'CASE_REASSIGNED':
        return <UserPlus className="h-4 w-4" />;
      case 'CASE_ESCALATED':
        return <ArrowUpCircle className="h-4 w-4" />;
      case 'STATUS_CHANGED':
        return <Edit className="h-4 w-4" />;
      case 'CASE_RESOLVED':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'CASE_REJECTED':
        return <XCircle className="h-4 w-4" />;
      case 'COMMENT_ADDED':
        return <MessageSquare className="h-4 w-4" />;
      case 'SLA_WARNING':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CASE_CREATED':
        return 'bg-blue-100 text-blue-700';
      case 'CASE_ASSIGNED':
      case 'CASE_REASSIGNED':
        return 'bg-purple-100 text-purple-700';
      case 'CASE_ESCALATED':
        return 'bg-red-100 text-red-700';
      case 'STATUS_CHANGED':
        return 'bg-yellow-100 text-yellow-700';
      case 'CASE_RESOLVED':
        return 'bg-green-100 text-green-700';
      case 'CASE_REJECTED':
        return 'bg-red-100 text-red-700';
      case 'COMMENT_ADDED':
        return 'bg-gray-100 text-gray-700';
      case 'SLA_WARNING':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const sortedLogs = [...auditLogs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedLogs.map((log, index) => (
        <div key={log.id} className="flex gap-4">
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div className={`rounded-full p-2 ${getActionColor(log.action)}`}>
              {getIcon(log.action)}
            </div>
            {index < sortedLogs.length - 1 && (
              <div className="w-0.5 h-full min-h-[40px] bg-gray-200 my-2" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-gray-900">{log.details}</p>
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  <span>{log.userName}</span>
                  <span>•</span>
                  <span>{formatDateTime(log.timestamp)}</span>
                </div>
                {log.metadata && (
                  <div className="mt-2 text-sm text-gray-600">
                    {Object.entries(log.metadata).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium">{key}: </span>
                        <span>{String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
