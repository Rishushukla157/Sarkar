// Mock Data for Development and Testing

import { User, Case, AuditLog, Department, SLAConfig, CaseComment } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'C001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    nationalId: 'NID-123456789',
    role: 'CITIZEN',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'C002',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    nationalId: 'NID-987654321',
    role: 'CITIZEN',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'O001',
    name: 'Officer Amit Patel',
    email: 'amit.patel@gov.in',
    nationalId: 'NID-555123456',
    role: 'OFFICER',
    department: 'Public Works',
    position: 'Junior Officer',
    createdAt: new Date('2023-06-10'),
  },
  {
    id: 'O002',
    name: 'Senior Officer Sunita Verma',
    email: 'sunita.verma@gov.in',
    nationalId: 'NID-555987654',
    role: 'SENIOR_OFFICER',
    department: 'Public Works',
    position: 'Senior Officer',
    createdAt: new Date('2022-03-15'),
  },
  {
    id: 'D001',
    name: 'Dept Head Vikram Singh',
    email: 'vikram.singh@gov.in',
    nationalId: 'NID-555111222',
    role: 'DEPT_HEAD',
    department: 'Public Works',
    position: 'Department Head',
    createdAt: new Date('2020-01-20'),
  },
  {
    id: 'A001',
    name: 'Admin Kavita Reddy',
    email: 'kavita.reddy@gov.in',
    nationalId: 'NID-555999888',
    role: 'ADMIN',
    position: 'System Administrator',
    createdAt: new Date('2021-08-05'),
  },
];

// Mock Departments
export const mockDepartments: Department[] = [
  { id: 'D001', name: 'Public Works', code: 'PWD', head: 'D001' },
  { id: 'D002', name: 'Health & Sanitation', code: 'HS', head: 'D001' },
  { id: 'D003', name: 'Revenue', code: 'REV', head: 'D001' },
  { id: 'D004', name: 'Judicial Services', code: 'JUD', head: 'D001' },
  { id: 'D005', name: 'Legislative Affairs', code: 'LEG', head: 'D001' },
];

// Mock Cases
export const mockCases: Case[] = [
  {
    id: 'CASE001',
    caseNumber: 'GRV-2025-001234',
    title: 'Road Damage on Main Street',
    description: 'Multiple potholes on Main Street causing traffic hazards and vehicle damage. The road has been in this condition for over 3 months.',
    type: 'ADMINISTRATIVE',
    status: 'UNDER_REVIEW',
    priority: 'HIGH',
    citizenId: 'C001',
    citizenName: 'Rajesh Kumar',
    citizenEmail: 'rajesh.kumar@example.com',
    assignedTo: 'O001',
    assignedToName: 'Officer Amit Patel',
    department: 'Public Works',
    slaDeadline: new Date('2025-10-16T18:00:00'),
    createdAt: new Date('2025-10-10T10:30:00'),
    updatedAt: new Date('2025-10-12T14:20:00'),
    escalationLevel: 0,
  },
  {
    id: 'CASE002',
    caseNumber: 'GRV-2025-001235',
    title: 'Water Supply Interruption',
    description: 'No water supply in Sector 14 for the past 5 days. Affecting over 200 households.',
    type: 'ADMINISTRATIVE',
    status: 'ESCALATED',
    priority: 'URGENT',
    citizenId: 'C001',
    citizenName: 'Rajesh Kumar',
    citizenEmail: 'rajesh.kumar@example.com',
    assignedTo: 'O002',
    assignedToName: 'Senior Officer Sunita Verma',
    department: 'Public Works',
    slaDeadline: new Date('2025-10-14T09:00:00'),
    createdAt: new Date('2025-10-08T09:15:00'),
    updatedAt: new Date('2025-10-13T11:30:00'),
    escalationLevel: 1,
  },
  {
    id: 'CASE003',
    caseNumber: 'JUD-2025-000456',
    title: 'Appeal Against Property Tax Assessment',
    description: 'Property tax increased by 300% without proper justification. Requesting re-assessment and hearing.',
    type: 'JUDICIAL',
    status: 'SUBMITTED',
    priority: 'MEDIUM',
    citizenId: 'C002',
    citizenName: 'Priya Sharma',
    citizenEmail: 'priya.sharma@example.com',
    department: 'Revenue',
    slaDeadline: new Date('2025-10-20T17:00:00'),
    createdAt: new Date('2025-10-13T08:45:00'),
    updatedAt: new Date('2025-10-13T08:45:00'),
    escalationLevel: 0,
  },
  {
    id: 'CASE004',
    caseNumber: 'GRV-2025-001236',
    title: 'Illegal Construction in Residential Area',
    description: 'Commercial construction ongoing in residential zone violating municipal bylaws. Noise and safety concerns.',
    type: 'ADMINISTRATIVE',
    status: 'RESOLVED',
    priority: 'MEDIUM',
    citizenId: 'C001',
    citizenName: 'Rajesh Kumar',
    citizenEmail: 'rajesh.kumar@example.com',
    assignedTo: 'O001',
    assignedToName: 'Officer Amit Patel',
    department: 'Public Works',
    slaDeadline: new Date('2025-10-05T17:00:00'),
    createdAt: new Date('2025-09-25T11:20:00'),
    updatedAt: new Date('2025-10-05T16:30:00'),
    resolvedAt: new Date('2025-10-05T16:30:00'),
    escalationLevel: 0,
  },
  {
    id: 'CASE005',
    caseNumber: 'LEG-2025-000012',
    title: 'Public Consultation Request for Zoning Changes',
    description: 'Requesting public hearing for proposed zoning changes in Ward 12 that affect residential areas.',
    type: 'LEGISLATIVE',
    status: 'UNDER_REVIEW',
    priority: 'LOW',
    citizenId: 'C002',
    citizenName: 'Priya Sharma',
    citizenEmail: 'priya.sharma@example.com',
    assignedTo: 'O002',
    assignedToName: 'Senior Officer Sunita Verma',
    department: 'Legislative Affairs',
    slaDeadline: new Date('2025-10-25T17:00:00'),
    createdAt: new Date('2025-10-01T14:00:00'),
    updatedAt: new Date('2025-10-08T10:15:00'),
    escalationLevel: 0,
  },
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'AUD001',
    caseId: 'CASE001',
    action: 'CASE_CREATED',
    userId: 'C001',
    userName: 'Rajesh Kumar',
    userRole: 'CITIZEN',
    timestamp: new Date('2025-10-10T10:30:00'),
    details: 'Case submitted by citizen',
  },
  {
    id: 'AUD002',
    caseId: 'CASE001',
    action: 'CASE_ASSIGNED',
    userId: 'SYSTEM',
    userName: 'Auto-Assignment System',
    userRole: 'ADMIN',
    timestamp: new Date('2025-10-10T10:31:00'),
    details: 'Case automatically assigned to Officer Amit Patel',
  },
  {
    id: 'AUD003',
    caseId: 'CASE001',
    action: 'STATUS_CHANGED',
    userId: 'O001',
    userName: 'Officer Amit Patel',
    userRole: 'OFFICER',
    timestamp: new Date('2025-10-12T14:20:00'),
    details: 'Status changed from SUBMITTED to UNDER_REVIEW',
  },
  {
    id: 'AUD004',
    caseId: 'CASE002',
    action: 'CASE_CREATED',
    userId: 'C001',
    userName: 'Rajesh Kumar',
    userRole: 'CITIZEN',
    timestamp: new Date('2025-10-08T09:15:00'),
    details: 'Case submitted by citizen',
  },
  {
    id: 'AUD005',
    caseId: 'CASE002',
    action: 'CASE_ESCALATED',
    userId: 'SYSTEM',
    userName: 'SLA Escalation Engine',
    userRole: 'ADMIN',
    timestamp: new Date('2025-10-13T09:00:00'),
    details: 'Case automatically escalated due to SLA breach. Reassigned to Senior Officer Sunita Verma',
    metadata: { reason: 'SLA_EXPIRED', previousAssignee: 'O001' },
  },
];

// Mock Comments
export const mockComments: CaseComment[] = [
  {
    id: 'COM001',
    caseId: 'CASE001',
    userId: 'O001',
    userName: 'Officer Amit Patel',
    userRole: 'OFFICER',
    comment: 'Site inspection scheduled for October 14th. Engineering team will assess damage extent.',
    isInternal: false,
    timestamp: new Date('2025-10-12T14:25:00'),
  },
  {
    id: 'COM002',
    caseId: 'CASE001',
    userId: 'O001',
    userName: 'Officer Amit Patel',
    userRole: 'OFFICER',
    comment: 'Requires budget approval from senior officer for emergency repair work.',
    isInternal: true,
    timestamp: new Date('2025-10-12T14:30:00'),
  },
];

// SLA Configuration
export const mockSLAConfig: SLAConfig[] = [
  { caseType: 'ADMINISTRATIVE', priority: 'URGENT', responseTimeHours: 2, resolutionTimeDays: 3 },
  { caseType: 'ADMINISTRATIVE', priority: 'HIGH', responseTimeHours: 24, resolutionTimeDays: 7 },
  { caseType: 'ADMINISTRATIVE', priority: 'MEDIUM', responseTimeHours: 48, resolutionTimeDays: 15 },
  { caseType: 'ADMINISTRATIVE', priority: 'LOW', responseTimeHours: 72, resolutionTimeDays: 30 },
  { caseType: 'JUDICIAL', priority: 'URGENT', responseTimeHours: 24, resolutionTimeDays: 15 },
  { caseType: 'JUDICIAL', priority: 'HIGH', responseTimeHours: 48, resolutionTimeDays: 30 },
  { caseType: 'JUDICIAL', priority: 'MEDIUM', responseTimeHours: 72, resolutionTimeDays: 60 },
  { caseType: 'JUDICIAL', priority: 'LOW', responseTimeHours: 120, resolutionTimeDays: 90 },
  { caseType: 'LEGISLATIVE', priority: 'URGENT', responseTimeHours: 48, resolutionTimeDays: 30 },
  { caseType: 'LEGISLATIVE', priority: 'HIGH', responseTimeHours: 72, resolutionTimeDays: 45 },
  { caseType: 'LEGISLATIVE', priority: 'MEDIUM', responseTimeHours: 120, resolutionTimeDays: 60 },
  { caseType: 'LEGISLATIVE', priority: 'LOW', responseTimeHours: 168, resolutionTimeDays: 90 },
];

// Get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Get cases by citizen ID
export const getCasesByCitizenId = (citizenId: string): Case[] => {
  return mockCases.filter(c => c.citizenId === citizenId);
};

// Get cases assigned to officer
export const getCasesByOfficerId = (officerId: string): Case[] => {
  return mockCases.filter(c => c.assignedTo === officerId);
};

// Get audit logs for a case
export const getAuditLogsByCaseId = (caseId: string): AuditLog[] => {
  return mockAuditLogs.filter(log => log.caseId === caseId);
};

// Get comments for a case
export const getCommentsByCaseId = (caseId: string): CaseComment[] => {
  return mockComments.filter(comment => comment.caseId === caseId);
};
