import React, { useState } from 'react';
import { User, Case, CaseType, Priority } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ArrowLeft, Upload, FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { generateCaseNumber } from '../../lib/utils';
import { mockCases, mockDepartments } from '../../lib/mockData';

interface SubmitGrievanceProps {
  user: User;
  onBack: () => void;
  onSubmit: (newCase: Case) => void;
}

export function SubmitGrievance({ user, onBack, onSubmit }: SubmitGrievanceProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '' as CaseType,
    priority: 'MEDIUM' as Priority,
    department: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.type) {
      setError('Please select a case type');
      return;
    }

    if (!formData.department) {
      setError('Please select a department');
      return;
    }

    // Calculate SLA deadline based on priority
    const slaHours = {
      URGENT: 48,
      HIGH: 72,
      MEDIUM: 120,
      LOW: 168,
    };

    const slaDeadline = new Date();
    slaDeadline.setHours(slaDeadline.getHours() + slaHours[formData.priority]);

    const newCase: Case = {
      id: `CASE${Date.now()}`,
      caseNumber: generateCaseNumber(formData.type),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      status: 'SUBMITTED',
      priority: formData.priority,
      citizenId: user.id,
      citizenName: user.name,
      citizenEmail: user.email,
      department: formData.department,
      slaDeadline,
      createdAt: new Date(),
      updatedAt: new Date(),
      escalationLevel: 0,
    };

    // Add to mock data
    mockCases.push(newCase);

    setSuccess(true);
    setTimeout(() => {
      onSubmit(newCase);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="py-12 text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Grievance Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your case has been registered and will be assigned to an officer shortly.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border mb-6">
              <p className="text-sm text-gray-600">Case Number</p>
              <p className="text-lg text-gray-900 mt-1">
                Will be generated automatically
              </p>
            </div>
            <Button onClick={onBack}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Official Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border-l-4 border-l-[#FF9933]">
          <div className="flex items-center gap-3">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="National Emblem"
              className="h-12 w-12 object-contain"
            />
            <div>
              <h2 className="text-lg text-[#000080]">Submit New Grievance</h2>
              <p className="text-sm text-gray-600">Government of India</p>
            </div>
          </div>
        </div>

        <Card className="border-l-4 border-l-[#138808] shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-white">
            <CardTitle className="text-[#000080]">Grievance Details</CardTitle>
            <CardDescription>
              Fill in the details below. Your submission will be tracked with complete transparency.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Case Type Selection */}
              <div className="space-y-3">
                <Label>Case Type *</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as CaseType })}
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="ADMINISTRATIVE" id="admin" />
                    <div className="flex-1">
                      <Label htmlFor="admin" className="cursor-pointer">
                        Administrative Grievance
                      </Label>
                      <p className="text-sm text-gray-600">
                        Infrastructure, public services, municipal issues
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="JUDICIAL" id="judicial" />
                    <div className="flex-1">
                      <Label htmlFor="judicial" className="cursor-pointer">
                        Judicial Appeal
                      </Label>
                      <p className="text-sm text-gray-600">
                        Legal matters, appeals, court-related issues
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="LEGISLATIVE" id="legislative" />
                    <div className="flex-1">
                      <Label htmlFor="legislative" className="cursor-pointer">
                        Legislative Submission
                      </Label>
                      <p className="text-sm text-gray-600">
                        Policy feedback, public consultations, legislative matters
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Department Selection */}
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDepartments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.name}>
                        {dept.name} ({dept.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value) => setFormData({ ...formData, priority: value as Priority })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low - General feedback (30 days)</SelectItem>
                    <SelectItem value="MEDIUM">Medium - Standard issue (15 days)</SelectItem>
                    <SelectItem value="HIGH">High - Important matter (7 days)</SelectItem>
                    <SelectItem value="URGENT">Urgent - Critical issue (3 days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of your grievance"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide complete details about your grievance, including relevant dates, locations, and any previous actions taken..."
                  rows={8}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              {/* Attachments (Mock) */}
              <div className="space-y-2">
                <Label>Attachments (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, Images, Documents (Max 10MB each)
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Grievance
                </Button>
              </div>

              {/* Information */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Once submitted, you can track your case progress in real-time. 
                  SLA-based automatic escalation ensures your case receives timely attention. 
                  All actions are logged in an audit trail for complete transparency.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
