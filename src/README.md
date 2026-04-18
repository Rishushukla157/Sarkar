# National Grievance & Appeals Portal

A comprehensive web-based platform for citizen grievances and judicial appeals, designed to enhance governmental transparency and accountability through SLA-based automatic escalation.

## 🎯 Overview

This system provides a unified platform where citizens can submit grievances across administrative, judicial, and legislative domains, while government officials can efficiently manage, review, and resolve cases with built-in accountability mechanisms.

## ✨ Key Features

### For Citizens
- **Secure Registration**: National ID-verified registration system
- **Unified Dashboard**: Track all submissions across different portals
- **Real-Time Tracking**: Monitor case progress with timeline view
- **Transparent Communication**: Receive updates and communicate with officials
- **Multi-Portal Support**: Submit administrative, judicial, or legislative cases

### For Officials
- **Role-Based Access Control (RBAC)**: Officer, Senior Officer, Dept Head, Admin roles
- **Case Queue Management**: Efficient assignment and prioritization
- **Detailed Case View**: Complete case information with audit trail
- **Action Tools**: Update status, add comments, resolve or escalate cases
- **Department Overview**: Monitor all cases within department (for heads)

### For Administrators
- **System Monitoring**: Real-time statistics and health metrics
- **SLA Configuration**: Configure response and resolution times
- **User Management**: Manage system users and roles
- **Department Analytics**: Track performance across departments

## 🔐 Security & Accountability

### National ID Verification
- Secure citizen registration with government ID
- Prevents duplicate accounts and ensures authenticity

### Complete Audit Trail
- Every action logged with timestamp and user information
- Full transparency for citizens and oversight bodies
- Immutable record of case progression

### SLA-Based Escalation Engine
- **Automatic Escalation**: Cases automatically forwarded to senior officers when deadlines expire
- **Guaranteed Accountability**: No case can be ignored or indefinitely delayed
- **Configurable SLAs**: Different timelines based on case type and priority
- **Escalation Hierarchy**: Officer → Senior Officer → Department Head

## 📊 Case Types & SLA

| Case Type | Priority | Response Time | Resolution Time |
|-----------|----------|---------------|-----------------|
| Administrative | Urgent | 2 hours | 3 days |
| Administrative | High | 24 hours | 7 days |
| Administrative | Medium | 48 hours | 15 days |
| Administrative | Low | 72 hours | 30 days |
| Judicial | Urgent | 24 hours | 15 days |
| Judicial | High | 48 hours | 30 days |
| Judicial | Medium | 72 hours | 60 days |
| Judicial | Low | 120 hours | 90 days |
| Legislative | Urgent | 48 hours | 30 days |
| Legislative | High | 72 hours | 45 days |
| Legislative | Medium | 120 hours | 60 days |
| Legislative | Low | 168 hours | 90 days |

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Shadcn/ui
- **State Management**: React Hooks
- **Backend (To Integrate)**: Spring Boot
- **Database (To Integrate)**: PostgreSQL

### Current Implementation
This is a **frontend prototype** with mock data demonstrating all functionality. To connect to your Spring Boot backend:

1. Replace mock data calls in `/lib/mockData.ts` with actual API calls
2. Update authentication in `/lib/auth.ts` to use your backend auth system
3. Implement WebSocket or polling for real-time SLA monitoring
4. Add file upload functionality for case attachments

## 🚀 Getting Started

### Demo Accounts

#### Citizens
- **Rajesh Kumar**: `rajesh.kumar@example.com` or `NID-123456789`
- **Priya Sharma**: `priya.sharma@example.com` or `NID-987654321`

#### Officials
- **Officer**: `amit.patel@gov.in`
- **Senior Officer**: `sunita.verma@gov.in`
- **Department Head**: `vikram.singh@gov.in`
- **Administrator**: `kavita.reddy@gov.in`

**Note**: Password is not required for demo (any password works)

### User Flows

#### Citizen Flow
1. Register with National ID or Login
2. Submit new grievance (select type, department, priority)
3. Track case progress in dashboard
4. View detailed timeline and updates
5. Receive notifications on case status changes

#### Official Flow
1. Login to Official Portal
2. View assigned cases in priority order
3. Review case details and citizen information
4. Take actions:
   - Update case status
   - Add public or internal comments
   - Resolve case with notes
   - Escalate to senior officer if needed
5. Monitor SLA deadlines and overdue cases

#### Admin Flow
1. Login as Administrator
2. Monitor system-wide statistics
3. Configure SLA settings by case type and priority
4. Manage users and roles
5. View department performance analytics

## 🔄 Escalation Process

### Automatic Escalation
When a case SLA deadline expires without resolution:
1. System automatically identifies overdue case
2. Case status changed to "ESCALATED"
3. Case reassigned to next higher authority
4. Escalation level incremented
5. All actions logged in audit trail
6. Notifications sent to relevant parties

### Manual Escalation
Officials can manually escalate cases:
1. Open case management view
2. Click "Escalate" button
3. Provide escalation reason
4. Case immediately forwarded to senior officer
5. Full audit trail maintained

## 📝 Case Status Workflow

```
SUBMITTED → UNDER_REVIEW → RESOLVED → CLOSED
              ↓
         PENDING_INFO
              ↓
         ESCALATED → SENIOR_OFFICER_REVIEW → RESOLVED
```

### Status Definitions
- **SUBMITTED**: Case created, awaiting assignment
- **UNDER_REVIEW**: Officer actively working on case
- **PENDING_INFO**: Additional information needed from citizen
- **ESCALATED**: SLA breach or manual escalation to senior officer
- **RESOLVED**: Issue addressed, awaiting closure
- **CLOSED**: Case completed
- **REJECTED**: Case dismissed with reason

## 🔌 Backend Integration Guide

### API Endpoints Needed

```typescript
// Authentication
POST /api/auth/login
POST /api/auth/register
POST /api/auth/verify-national-id
GET /api/auth/current-user

// Cases
GET /api/cases
GET /api/cases/:id
POST /api/cases
PUT /api/cases/:id
GET /api/cases/citizen/:citizenId
GET /api/cases/officer/:officerId
GET /api/cases/department/:deptId

// Actions
POST /api/cases/:id/comments
PUT /api/cases/:id/status
POST /api/cases/:id/escalate
POST /api/cases/:id/resolve

// Audit
GET /api/audit/:caseId

// Admin
GET /api/admin/stats
GET /api/admin/users
PUT /api/admin/sla-config
```

### Database Schema

Key tables needed:
- `users`: User accounts and profiles
- `cases`: Case records
- `audit_logs`: Complete action history
- `comments`: Case comments and updates
- `departments`: Department information
- `sla_config`: SLA settings
- `escalations`: Escalation tracking

## 🎨 Features Implemented

- ✅ National ID verified registration
- ✅ Role-based authentication (RBAC)
- ✅ Citizen portal with case submission
- ✅ Official portal with case management
- ✅ Admin dashboard with system monitoring
- ✅ Complete audit trail display
- ✅ Timeline view for case progress
- ✅ SLA deadline tracking and warnings
- ✅ Manual escalation functionality
- ✅ Status management workflow
- ✅ Internal vs public comments
- ✅ Multi-department support
- ✅ Priority-based case handling
- ✅ Search and filter capabilities
- ✅ Responsive design

## 🔮 Next Steps for Production

1. **Backend Integration**
   - Connect to Spring Boot REST APIs
   - Implement actual authentication/authorization
   - Add database persistence

2. **Real-Time Features**
   - WebSocket for live updates
   - Push notifications for status changes
   - Real-time SLA monitoring daemon

3. **File Management**
   - Document upload/download
   - Attachment storage (S3 or similar)
   - PDF report generation

4. **Advanced Features**
   - Email notifications
   - SMS alerts for critical cases
   - Advanced analytics dashboard
   - Export/reporting tools
   - Mobile app support

5. **Security Enhancements**
   - Government ID API integration
   - 2FA for officials
   - Session management
   - Rate limiting
   - Audit log encryption

## 📄 License

This is a demonstration prototype for a government grievance management system.

## 🤝 Support

For technical documentation on components and implementation details, refer to the inline code comments and component documentation.
