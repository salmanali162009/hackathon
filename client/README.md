# HCM Lite — Frontend Application

Modern, enterprise-grade React frontend for the **HCM Lite — AI-Assisted Human Capital Management System**, built for the Saylani Hackathon.

---

## 1. Architecture & Tech Stack

- **Framework:** React 19 with Vite 8
- **UI Component Library:** Ant Design (antd v6) with customized enterprise indigo theme
- **CSS Framework:** Tailwind CSS v4 (`@tailwindcss/vite`) with custom design tokens
- **Routing:** React Router v8 with declarative role-based protected routes
- **Icons:** React Icons (`react-icons/fi`)
- **HTTP Client:** Centralized Axios instance with bearer token interceptors, automatic error notifications, and session expiration handling
- **State Management:** React Context API (`AuthContext`) for shared authentication and company setup state

### Directory Layout

```text
client/
├── index.html
├── vite.config.js
├── package.json
├── .env.example
├── src/
│   ├── main.jsx                    # Vite app root
│   ├── App.jsx                     # Ant Design ConfigProvider & App wrapper
│   ├── index.css                   # Tailwind v4 styles, scrollbars, overrides
│   ├── api/                        # Centralized API service layer
│   │   ├── axios.js                # Axios client with interceptors
│   │   ├── auth.api.js             # Auth, setup status, login, password changes
│   │   ├── company.api.js          # Company settings & business rules
│   │   ├── organization.api.js     # Departments, designations, leave types, holidays
│   │   ├── employees.api.js        # Employee 360, onboarding, CSV dry-run & export
│   │   ├── attendance.api.js       # Live check-in/out, roster board, corrections
│   │   ├── leaves.api.js           # Leave quotas, applications, HR decisions
│   │   ├── payroll.api.js          # Salary structures, runs, finalization, PDF payslips
│   │   ├── dashboard.api.js        # Role-specific dashboard metrics
│   │   ├── ai.api.js               # Groq AI assistant, executive summary, smart leave
│   │   ├── communications.api.js   # Announcements and user notifications
│   │   └── audit.api.js            # Audit log queries
│   ├── contexts/
│   │   └── AuthContext.jsx         # Authentication, active user, setup detection
│   ├── components/
│   │   ├── common/                 # StatusBadge, StatCard, EmptyState, LoadingSkeleton
│   │   ├── layout/                 # AppLayout, Sidebar, Header
│   │   └── ai/                     # AIChatDrawer (Groq assistant widget)
│   ├── pages/
│   │   ├── setup/                  # First-run company initialization wizard
│   │   ├── auth/                   # Login page & Change Password modal
│   │   ├── admin/                  # Admin Dashboard, Settings, Organization, Audit Logs
│   │   ├── hr/                     # HR Dashboard, Employees (360 + CSV), Attendance, Leaves, Payroll
│   │   ├── employee/               # Self-service Desk, My Attendance, Leaves, Payslips, Profile
│   │   └── shared/                 # Announcements, Notifications, 403 & 404 pages
│   ├── routes/
│   │   ├── ProtectedRoute.jsx      # Role & setup gating
│   │   └── AppRouter.jsx           # Route definitions
│   └── utils/
│       └── formatters.js           # Currency (Rs.), date/time, and status color maps
```

---

## 2. Design System

- **Primary Color:** Deep Indigo (`#4338CA`)
- **Background:** `#F8FAFC`
- **Surface / Card Background:** `#FFFFFF`
- **Primary Text:** `#0F172A`
- **Muted Text:** `#64748B`
- **Success:** `#16A34A`
- **Warning:** `#D97706`
- **Error:** `#DC2626`
- **Border Radius:** 10px rounded cards and interactive elements

---

## 3. Environment Configuration

Create a `.env` file in `client/`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## 4. Getting Started

### Development Mode
```bash
npm install
npm run dev
```
The application will launch on `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```
The build produces optimized assets in `dist/`.

---

## 5. Key Frontend Features

1. **First-Run Setup Detection:** Automatically checks `/api/setup-status` and guides the user through initial company & admin account registration.
2. **Role-Based Navigation:** Sidebar and routes dynamically adapt for `ADMIN`, `HR`, and `EMPLOYEE` roles.
3. **Employee 360 & CSV Import:** Interactive employee profile drawer, instant password generation for new recruits, and dry-run CSV validation before committing.
4. **Interactive Attendance Desk:** One-click check-in/check-out with live clock, grace period indicators, and correction request modals.
5. **Smart Leave Application:** AI-assisted natural language leave parser that extracts leave type, dates, and reason directly into the form.
6. **Payroll Center & Payslip PDF:** Comprehensive payroll generation, progressive tax calculation review, and direct download of generated payslip PDFs.
7. **Groq AI Assistant:** Floating chat drawer powered by backend read-only tools with quick suggestion chips.
