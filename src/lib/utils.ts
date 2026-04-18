import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CaseStatus, CaseType, Priority, UserRole } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to readable string
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

// Format date with time
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

// Calculate time remaining until deadline
export function getTimeRemaining(deadline: Date): string {
  const now = new Date();
  const diff = new Date(deadline).getTime() - now.getTime();
  
  if (diff < 0) {
    const hours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} overdue`;
    return `${hours} hour${hours > 1 ? 's' : ''} overdue`;
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} remaining`;
  return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
}

// Check if deadline is overdue
export function isOverdue(deadline: Date): boolean {
  return new Date(deadline).getTime() < new Date().getTime();
}

// Get status badge color
export function getStatusColor(status: CaseStatus): string {
  const colors: Record<CaseStatus, string> = {
    SUBMITTED: 'bg-blue-100 text-blue-800 border-blue-200',
    UNDER_REVIEW: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    PENDING_INFO: 'bg-orange-100 text-orange-800 border-orange-200',
    ESCALATED: 'bg-red-100 text-red-800 border-red-200',
    RESOLVED: 'bg-green-100 text-green-800 border-green-200',
    CLOSED: 'bg-gray-100 text-gray-800 border-gray-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
  };
  return colors[status];
}

// Get priority badge color
export function getPriorityColor(priority: Priority): string {
  const colors: Record<Priority, string> = {
    LOW: 'bg-gray-100 text-gray-800 border-gray-200',
    MEDIUM: 'bg-blue-100 text-blue-800 border-blue-200',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
    URGENT: 'bg-red-100 text-red-800 border-red-200',
  };
  return colors[priority];
}

// Get case type badge color
export function getCaseTypeColor(type: CaseType): string {
  const colors: Record<CaseType, string> = {
    ADMINISTRATIVE: 'bg-purple-100 text-purple-800 border-purple-200',
    JUDICIAL: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    LEGISLATIVE: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  };
  return colors[type];
}

// Get role display name
export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    CITIZEN: 'Citizen',
    OFFICER: 'Officer',
    SENIOR_OFFICER: 'Senior Officer',
    DEPT_HEAD: 'Department Head',
    ADMIN: 'Administrator',
  };
  return names[role];
}

// Format case number
export function formatCaseNumber(caseNumber: string): string {
  return caseNumber;
}

// Calculate days since submission
export function getDaysSinceSubmission(createdAt: Date): number {
  const now = new Date();
  const diff = now.getTime() - new Date(createdAt).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Validate National ID format (mock validation)
export function validateNationalId(nationalId: string): boolean {
  // Mock validation - accepts format like NID-XXXXXXXXX
  return /^NID-\d{9}$/.test(nationalId);
}

// Generate case number
export function generateCaseNumber(type: CaseType): string {
  const prefix = type === 'ADMINISTRATIVE' ? 'GRV' : type === 'JUDICIAL' ? 'JUD' : 'LEG';
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `${prefix}-${year}-${random}`;
}
