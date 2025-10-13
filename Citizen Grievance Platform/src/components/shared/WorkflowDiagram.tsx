import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  FileText, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Clock,
  TrendingUp
} from 'lucide-react';

export function WorkflowDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Workflow & Lifecycle</CardTitle>
        <CardDescription>
          Understanding how cases flow through the system with automatic escalation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Main Flow */}
        <div>
          <h3 className="text-gray-900 mb-4">Standard Case Flow</h3>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBox 
              icon={<FileText className="h-5 w-5" />}
              label="SUBMITTED"
              color="blue"
              description="Citizen submits case"
            />
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <StatusBox 
              icon={<Search className="h-5 w-5" />}
              label="UNDER REVIEW"
              color="yellow"
              description="Officer reviews case"
            />
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <StatusBox 
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="RESOLVED"
              color="green"
              description="Issue addressed"
            />
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <StatusBox 
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="CLOSED"
              color="gray"
              description="Case completed"
            />
          </div>
        </div>

        {/* Escalation Flow */}
        <div className="border-t pt-6">
          <h3 className="text-gray-900 mb-4">Escalation Flow (SLA Breach)</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">SLA Deadline Expires</p>
                <p className="text-sm text-gray-600 mt-1">
                  System automatically detects when response/resolution time exceeds configured SLA
                </p>
              </div>
            </div>

            <div className="ml-6 border-l-2 border-orange-300 pl-6 py-2">
              <ArrowRight className="h-5 w-5 text-orange-600 mb-2" />
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">Automatic Escalation</p>
                <p className="text-sm text-gray-600 mt-1">
                  Case status changed to "ESCALATED" and reassigned to next higher authority
                </p>
                <div className="mt-2 p-3 bg-red-50 rounded border border-red-200">
                  <p className="text-sm text-red-900">
                    Officer → Senior Officer → Department Head
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-6 border-l-2 border-red-300 pl-6 py-2">
              <ArrowRight className="h-5 w-5 text-red-600 mb-2" />
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">Audit Trail Updated</p>
                <p className="text-sm text-gray-600 mt-1">
                  All escalation actions logged with timestamp, reason, and involved parties
                </p>
              </div>
            </div>

            <div className="ml-6 border-l-2 border-purple-300 pl-6 py-2">
              <ArrowRight className="h-5 w-5 text-purple-600 mb-2" />
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">Senior Officer Takes Action</p>
                <p className="text-sm text-gray-600 mt-1">
                  Higher authority reviews and resolves the escalated case
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Paths */}
        <div className="border-t pt-6">
          <h3 className="text-gray-900 mb-4">Alternative Paths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <p className="text-orange-900 font-medium">PENDING INFO</p>
              </div>
              <p className="text-sm text-orange-800">
                Officer requests additional information from citizen. Timer paused until response received.
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-900 font-medium">REJECTED</p>
              </div>
              <p className="text-sm text-red-800">
                Case dismissed with detailed reasoning. Citizen can appeal or submit new case.
              </p>
            </div>
          </div>
        </div>

        {/* SLA Examples */}
        <div className="border-t pt-6">
          <h3 className="text-gray-900 mb-4">SLA Examples</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="text-sm text-red-900 font-medium">
                  Administrative - Urgent Priority
                </p>
                <p className="text-xs text-red-700">Water supply failure, emergency road damage</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-red-900 font-medium">2 hours response</p>
                <p className="text-xs text-red-700">3 days resolution</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <p className="text-sm text-orange-900 font-medium">
                  Judicial - High Priority
                </p>
                <p className="text-xs text-orange-700">Property dispute, tax appeal</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-900 font-medium">48 hours response</p>
                <p className="text-xs text-orange-700">30 days resolution</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="text-sm text-blue-900 font-medium">
                  Legislative - Medium Priority
                </p>
                <p className="text-xs text-blue-700">Policy feedback, zoning consultation</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-900 font-medium">5 days response</p>
                <p className="text-xs text-blue-700">60 days resolution</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBox({ 
  icon, 
  label, 
  color, 
  description 
}: { 
  icon: React.ReactNode; 
  label: string; 
  color: string; 
  description: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-900 border-blue-200',
    yellow: 'bg-yellow-100 text-yellow-900 border-yellow-200',
    green: 'bg-green-100 text-green-900 border-green-200',
    gray: 'bg-gray-100 text-gray-900 border-gray-200',
    red: 'bg-red-100 text-red-900 border-red-200',
  };

  return (
    <div className={`flex flex-col items-center p-4 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="mb-2">{icon}</div>
      <p className="font-medium text-sm text-center mb-1">{label}</p>
      <p className="text-xs text-center opacity-80">{description}</p>
    </div>
  );
}
