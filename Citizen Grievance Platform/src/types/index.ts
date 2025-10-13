// Core Type Definitions for Grievance Management System

export type UserRole = 'CITIZEN' | 'OFFICER' | 'SENIOR_OFFICER' | 'DEPT_HEAD' | 'ADMIN';

export type CaseType = 'ADMINISTRATIVE' | 'JUDICIAL' | 'LEGISLATIVE';

export type CaseStatus = 
  | 'SUBMITTED' 
  | 'UNDER_REVIEW' 
  | 'PENDING_INFO' 
  | 'ESCALATED' 
  | 'RESOLVED' 
  | 'CLOSED' 
  | 'REJECTED';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface User {
  id: string;
  name: string;
  email: string;
  nationalId: string;
  role: UserRole;
  department?: string;
  position?: string;
  createdAt: Date;
}

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  type: CaseType;
  status: CaseStatus;
  priority: Priority;
  citizenId: string;
  citizenName: string;
  citizenEmail: string;
  assignedTo?: string;
  assignedToName?: string;
  department?: string;
  slaDeadline: Date;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  attachments?: string[];
  escalationLevel: number;
}

export interface AuditLog {
  id: string;
  caseId: string;
  action: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  timestamp: Date;
  details: string;
  metadata?: Record<string, any>;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head?: string;
}

export interface CaseComment {
  id: string;
  caseId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  comment: string;
  isInternal: boolean;
  timestamp: Date;
}

export interface SLAConfig {
  caseType: CaseType;
  priority: Priority;
  responseTimeHours: number;
  resolutionTimeDays: number;
}

export interface DashboardStats {
  totalCases: number;
  pendingCases: number;
  resolvedCases: number;
  escalatedCases: number;
  overdueActions: number;
  avgResolutionTime: number;
}
