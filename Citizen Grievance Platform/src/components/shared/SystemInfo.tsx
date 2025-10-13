import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Shield, 
  Clock, 
  FileText, 
  Users, 
  TrendingUp, 
  CheckCircle2,
  Scale,
  Database
} from 'lucide-react';

export function SystemInfo() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>National Grievance & Appeals Portal</CardTitle>
          <CardDescription>
            A unified platform for citizen grievances and judicial appeals designed to enhance 
            governmental transparency and accountability through SLA-based automatic escalation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Features */}
          <div>
            <h3 className="text-gray-900 mb-4">Core Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">Secure National ID Verification</p>
                  <p className="text-sm text-gray-600">
                    Register and authenticate using government-issued National ID
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">SLA-Based Auto Escalation</p>
                  <p className="text-sm text-gray-600">
                    Automatic case forwarding to senior officers upon deadline expiry
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <FileText className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">Complete Audit Trail</p>
                  <p className="text-sm text-gray-600">
                    Every action logged with timestamp and user information
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Users className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">Role-Based Access Control</p>
                  <p className="text-sm text-gray-600">
                    Officer, Senior Officer, Department Head, and Admin roles
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <TrendingUp className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">Real-Time Case Tracking</p>
                  <p className="text-sm text-gray-600">
                    Citizens can monitor case progress with timeline view
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">Multi-Portal Support</p>
                  <p className="text-sm text-gray-600">
                    Administrative, Judicial, and Legislative case types
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* System Architecture */}
          <div>
            <h3 className="text-gray-900 mb-4">System Architecture</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Scale className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm text-blue-900">
                    <span className="font-medium">Frontend:</span> React + TypeScript + Tailwind CSS
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <Database className="h-5 w-5 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm text-purple-900">
                    <span className="font-medium">Backend:</span> Spring Boot (to be integrated)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <Database className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm text-green-900">
                    <span className="font-medium">Database:</span> PostgreSQL (to be integrated)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Roles */}
          <div>
            <h3 className="text-gray-900 mb-4">User Roles & Access Levels</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div>
                  <Badge variant="outline">CITIZEN</Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    Submit grievances, track cases, view public updates
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div>
                  <Badge variant="outline">OFFICER</Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    Review cases, add comments, change status, resolve issues
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div>
                  <Badge variant="outline">SENIOR_OFFICER</Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    Handle escalated cases, supervise junior officers, approve resolutions
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div>
                  <Badge variant="outline">DEPT_HEAD</Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    View all department cases, manage team, handle critical escalations
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div>
                  <Badge variant="outline">ADMIN</Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    System configuration, SLA settings, user management, full access
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Case Types */}
          <div>
            <h3 className="text-gray-900 mb-4">Case Types</h3>
            <div className="space-y-2">
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-purple-900">
                  <span className="font-medium">ADMINISTRATIVE:</span> Infrastructure, public services, 
                  municipal issues (SLA: 3-30 days based on priority)
                </p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-indigo-900">
                  <span className="font-medium">JUDICIAL:</span> Legal matters, appeals, 
                  court-related issues (SLA: 15-90 days based on priority)
                </p>
              </div>
              <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="text-cyan-900">
                  <span className="font-medium">LEGISLATIVE:</span> Policy feedback, public consultations, 
                  legislative matters (SLA: 30-90 days based on priority)
                </p>
              </div>
            </div>
          </div>

          {/* Escalation Engine */}
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="text-orange-900 mb-2">
              Automated SLA Escalation Engine
            </h3>
            <p className="text-sm text-orange-800">
              The system continuously monitors case SLA deadlines. When a deadline expires without 
              resolution, the case is automatically escalated to the next superior officer in the 
              hierarchy. This ensures accountability and prevents cases from being ignored. All 
              escalations are logged in the audit trail with complete transparency.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
