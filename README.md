# HCM Lite — AI-Assisted Human Capital Management System

An AI-powered Human Capital Management (HCM) web application designed to simplify everyday HR operations through role-based access, employee management, attendance tracking, leave management, payroll, analytics, and an AI assistant.

Built for the **Saylani Mass IT Training (SMIT) Hackathon — 24 October 2026**.

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Application Modules](#application-modules)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [AI Model Configuration](#ai-model-configuration)
- [Running the Application](#running-the-application)
- [API Overview](#api-overview)
- [Authentication and Security](#authentication-and-security)
- [Business Rules](#business-rules)
- [Database Overview](#database-overview)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

HCM Lite is a web-based Human Capital Management system that helps organizations manage their employees and routine HR operations from a centralized application.

The system supports three user roles:

- **Admin:** Manages company settings, users, organization-wide data, and payroll finalization.
- **HR:** Manages employees, attendance, leave requests, salary structures, payroll drafts, and announcements.
- **Employee:** Accesses personal information, attendance, leave requests, payslips, and company announcements.

HCM Lite also integrates an AI assistant intended to answer questions using authorized application data and assist users with HR-related tasks.

The application is designed around a simple principle: **business data should come from actual application activity rather than hardcoded dashboard values or dummy records.**

### Project Goals

- Centralize employee and HR information.
- Reduce repetitive administrative work.
- Improve attendance and leave tracking.
- Simplify monthly payroll processing.
- Provide useful dashboards and analytics.
- Make HR information easier to access through AI.
- Protect sensitive employee information through role-based authorization.

---

## Problem Statement

Managing employee records, attendance, leave requests, salary information, and payroll through separate spreadsheets or manual processes can be time-consuming and error-prone.

HCM Lite addresses these challenges by bringing core HR workflows into one application.

The system aims to provide:

- A centralized employee directory.
- Consistent attendance and leave records.
- A structured approval workflow.
- Monthly payroll processing.
- Role-specific dashboards.
- AI-assisted access to HR information.
- An audit trail for important administrative actions.

---

## Key Features

### 1. Authentication and Access Control

- Secure login.
- JWT-based authentication.
- Password hashing.
- Role-based access for Admin, HR, and Employee.
- Protected application routes.
- Server-side authorization.
- User account management.

### 2. Organization Setup

- Company information.
- Departments and designations.
- Leave types and annual leave quotas.
- Public holidays.
- Office timings and attendance rules.
- Office location and attendance radius, where supported.
- HR and employee account management.

### 3. Employee Management

- Employee registration.
- Employee directory.
- Employee profile management.
- Search and filtering.
- Employment and job information.
- Salary structure management.
- CSV import and export, where implemented.
- Employee-specific data access.

### 4. Attendance Management

- Employee check-in and check-out.
- Daily attendance records.
- Attendance status tracking.
- Late arrival and working-hour calculations.
- Attendance history.
- Attendance correction requests.
- HR review of attendance corrections.

Camera-based attendance and location verification are optional capabilities and should only be considered available when implemented and configured.

### 5. Leave Management

- Leave application.
- Leave balance tracking.
- Leave approval workflow.
- Leave rejection with comments.
- Leave cancellation, where permitted.
- Leave history.
- Leave overlap and holiday validation.
- Annual leave quotas based on organization settings.

### 6. Payroll Management

- Employee salary structures.
- Monthly payroll preparation.
- Salary allowances and deductions.
- Tax calculations based on configured rules.
- Approved unpaid leave deductions, where implemented.
- Payroll review.
- Payroll finalization by Admin.
- Payslip generation and download.

Payroll calculations depend on the business rules implemented in the application. They should be verified before using the system for real salary payments.

### 7. Dashboards and Analytics

Role-specific dashboards can present information such as:

- Total employees.
- Present and absent employees.
- Employees on leave.
- Late arrivals.
- Attendance trends.
- Leave utilization.
- Payroll summaries.
- Department-level statistics.
- Employee-specific attendance and leave balances.

Dashboard figures should be calculated from authorized application records.

### 8. AI Assistant

The AI assistant is designed to help users interact with HR information using natural-language questions.

Potential use cases include:

- Asking about attendance summaries.
- Checking leave-related information.
- Summarizing dashboard metrics.
- Answering company policy questions.
- Assisting with leave applications.
- Retrieving authorized HR information through application tools.

AI functionality depends on the configured LLM provider, supported model, implemented tools, and available application data.

**Important:** AI responses should respect the same role-based data restrictions as ordinary application requests. The AI model must not independently bypass backend authorization.

### 9. Communication and Audit

The project specification includes:

- Company announcements.
- User notifications.
- An audit log of important actions.
- Administrative activity tracking.

These features should be verified against the current implementation before being presented as production-ready.

---

## User Roles

| Feature | Admin | HR | Employee |
|---|---|---|---|
| Company settings | Manage | No access | No access |
| Departments and designations | Manage | As permitted | View relevant information |
| Employee directory | Organization-wide | Manage employees | Own profile |
| Employee registration | As permitted | Manage | Not permitted |
| Attendance | Organization-wide | Manage and review | Own attendance |
| Attendance corrections | Review as configured | Review and process | Request correction |
| Leave applications | Organization-wide access as permitted | Review and approve | Apply and view own requests |
| Salary structures | Organization-wide access | Manage as permitted | View permitted personal information |
| Payroll preparation | Review | Prepare and review | No access to other employees' payroll |
| Payroll finalization | Yes | No | No |
| Payslips | As authorized | As authorized | Own payslips |
| Announcements | Manage | Post as permitted | Read |
| Audit logs | View | Restricted | No access |
| AI assistant | Authorized company data | Authorized HR data | Authorized personal and policy data |

The table describes the intended access model. Actual permissions must be verified in the backend authorization middleware and route handlers.

---

## Application Modules

HCM Lite is organized around nine functional modules.

| Module | Purpose |
|---|---|
| M1 — Authentication and Access | Login, JWT authentication, roles, and authorization |
| M2 — Organization Setup | Company settings, departments, designations, leave types, and holidays |
| M3 — Employees | Employee records, profiles, directory, and data management |
| M4 — Attendance | Check-in, check-out, attendance history, and corrections |
| M5 — Leave | Leave applications, balances, validation, and approvals |
| M6 — Payroll Lite | Salary structures, monthly payroll, calculations, and payslips |
| M7 — Dashboards and Analytics | KPIs, summaries, trends, and role-specific insights |
| M8 — AI Assistant | AI chat, data-assisted answers, summaries, and smart leave assistance |
| M9 — Communication and Audit | Announcements, notifications, and audit history |

---

## Technology Stack

The project uses the MERN ecosystem with an AI integration.

### Frontend

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Vite | Development server and build tooling |
| Ant Design | UI components |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP requests to the backend |
| React Router | Client-side navigation |
| React Icons | Interface icons |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API and middleware |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| JSON Web Token (JWT) | Authentication tokens |
| bcryptjs | Password hashing and verification |
| dotenv | Environment configuration |
| Groq SDK | AI model API integration |

### AI Integration

The AI layer uses a hosted language model through the Groq API.

The configured model is controlled by the backend environment variable:

`AI_MODEL`

The selected model must be supported by the Groq API and by the application's AI implementation.

### Architecture

The intended request flow is:

**React Frontend → Express REST API → Authentication and Authorization → Service Layer → MongoDB**

AI requests follow the application's AI service and tool-calling implementation. The AI service should retrieve information through authorized backend functions rather than unrestricted database access.

---

## Project Architecture

The project is divided into two primary applications:

```text
hcm-lite/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

This is an illustrative structure, not a claim about every directory in the current repository. Keep your existing filenames and entry points if they differ.

### Frontend Responsibilities

- Render the user interface.
- Manage navigation and application state.
- Collect and validate form input.
- Send API requests using Axios.
- Display API responses and errors.
- Present interfaces according to the authenticated user's role.

### Backend Responsibilities

- Expose REST API endpoints.
- Authenticate users.
- Enforce role-based permissions.
- Validate incoming data.
- Apply HR business rules.
- Read and write database records.
- Calculate attendance, leave, and payroll values.
- Generate authorized dashboard summaries.
- Integrate the AI service.
- Record important actions in the audit log.

---

## Prerequisites

Install the following before running the application:

- Node.js and npm.
- MongoDB Atlas or a compatible MongoDB instance.
- A Groq API key if AI features are enabled.
- Git, if cloning the repository.

Check your installations:

```bash
node --version
npm --version
git --version
```

The project has previously been developed with a recent Node.js release. If you encounter dependency compatibility problems, use a supported Node.js LTS release compatible with your project's dependencies.

---

## Installation and Setup

### Step 1 — Clone the Repository

Replace the example repository URL with your actual repository URL.

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

If the project is already on your computer, open its root folder instead.

### Step 2 — Install Backend Dependencies

```bash
cd server
npm install
```

### Step 3 — Configure Backend Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_long_random_secret

GROQ_API_KEY=your_groq_api_key

AI_MODEL=openai/gpt-oss-120b
```

Use the exact variable names expected by your existing backend code. If the project uses a different MongoDB variable name or AI API key variable, update this example to match the implementation.

Do not commit your actual `.env` file.

### Step 4 — Install Frontend Dependencies

Open a second terminal from the project root:

```bash
cd client
npm install
```

### Step 5 — Configure the Frontend API URL

Create a `.env` file inside `client`.

For local development:

```env
VITE_API_URL=http://localhost:8000/api
```

This value assumes the Axios configuration expects the `/api` prefix in its base URL.

For example:

```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;
```

If your existing Axios configuration already adds `/api` to individual request URLs, configure the base URL accordingly to avoid duplicated paths such as `/api/api/auth/login`.

Check your existing code before changing it.

### Step 6 — Start the Backend

In the backend terminal:

```bash
npm run dev
```

If this script does not exist, inspect `server/package.json` and use the development command defined there.

The backend should connect to MongoDB and start listening on its configured port.

### Step 7 — Start the Frontend

In the frontend terminal:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal. It is commonly:

`http://localhost:5173`

### Step 8 — Complete Initial Setup

On a fresh database:

1. Open the application.
2. Complete the organization setup process.
3. Create the initial Admin account.
4. Configure company settings.
5. Create HR accounts.
6. Register employees.
7. Begin using attendance, leave, payroll, and other available modules.

If the database has already been initialized, the application may display the login page instead of the initial setup page.

**Do not repeatedly initialize the database or create duplicate Admin accounts to resolve a login problem.**

---

## Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `PORT` | Backend listening port | Depends on server configuration |
| `MONGODB_URI` | MongoDB connection string | Yes, if this is the variable used by the backend |
| `JWT_SECRET` | Secret used to sign and verify JWTs | Yes |
| `GROQ_API_KEY` | Authenticates requests to Groq | Required for Groq-powered AI |
| `AI_MODEL` | Selects the AI model | Required if the AI service reads this variable |
| `VITE_API_URL` | Frontend API base URL | Required if referenced by the frontend |

Variable names must match the code. These names are examples based on the project's known configuration and should be compared with the existing source files.

### Security Guidelines

- Never publish API keys or JWT secrets.
- Never commit production credentials.
- Use a strong, randomly generated JWT secret.
- Keep AI provider keys on the server.
- Do not put private server secrets in frontend variables beginning with `VITE_`.
- Use separate development and production credentials.
- Restrict database access and use secure database credentials.
- Configure CORS for the frontend origins you actually trust.

---

## AI Model Configuration

HCM Lite integrates with Groq for AI-powered functionality.

### Configure the Model

In `server/.env`:

```env
AI_MODEL=openai/gpt-oss-120b
```

A lighter alternative to test is:

```env
AI_MODEL=openai/gpt-oss-20b
```

These are example model identifiers. Check current Groq availability and account limits before selecting one.

### Read the Model from Environment Variables

The AI service should use the configured variable instead of hardcoding a model identifier.

Example:

```js
const model = process.env.AI_MODEL;

if (!model) {
  throw new Error("AI_MODEL is not configured");
}
```

Use the configured `model` when calling the Groq SDK.

### After Changing the Model

1. Save `server/.env`.
2. Restart the backend.
3. Send a test message through the AI interface.
4. Check the backend logs if the request fails.
5. Verify tool calling separately if the application uses AI tools.

Changing the model name alone does not guarantee that the AI assistant will work. The selected model must support the features used by the application, and the backend must pass the correct request parameters.

### AI Limitations

AI responses can be incorrect or incomplete. Important HR decisions, payroll calculations, and access-control checks must remain under deterministic backend logic rather than relying on an AI-generated answer.

---

## Running the Application

During local development, run the backend and frontend in separate terminals.

**Terminal 1 — Backend**

```bash
cd server
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd client
npm run dev
```

Use the scripts defined in the corresponding `package.json` files if they differ from these examples.

### Verify Backend Connectivity

If the backend listens on port `8000`, open:

`http://localhost:8000/api/setup/status`

A successful response may look like:

```json
{
  "success": true,
  "message": "Setup status retrieved successfully",
  "data": {
    "isInitialized": true,
    "hasAdmin": true,
    "hasCompany": true
  }
}
```

The values depend on your database.

This endpoint checks the setup status. It does not verify that an Admin's login credentials are correct.

### Login Verification

Use the Admin account created during initial setup.

If the login endpoint returns `401 Unauthorized`, verify the submitted email and password, then inspect the existing authentication service and password-verification logic.

Do not disable password verification as a workaround.

---

## API Overview

The backend exposes REST endpoints for authentication and the application's HR modules.

The following endpoint is known from the current project configuration:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/setup/status` | Retrieve initial setup status |
| `POST` | `/api/auth/login` | Authenticate a user |

The following are logical API areas in the project specification. Their exact paths and supported HTTP methods must be confirmed from the backend route files.

| API Area | Purpose |
|---|---|
| Authentication | Login, current-user information, and session handling |
| Organization Setup | Company settings, departments, designations, holidays, and leave types |
| Employees | Employee creation, listing, updating, and profile access |
| Attendance | Check-in, check-out, history, and correction requests |
| Leave | Leave applications, balances, approvals, and cancellations |
| Payroll | Salary structures, monthly runs, and payslips |
| Dashboards | Role-specific KPIs and analytics |
| AI Assistant | AI chat, summaries, and HR-related assistance |
| Communications | Announcements and notifications |
| Audit | Administrative activity records |

### Example: Setup Status

Request:

```http
GET /api/setup/status
```

A successful response indicates whether the application has been initialized and whether the initial Admin and company records exist.

### Example: Login

Request:

```http
POST /api/auth/login
Content-Type: application/json
```

Example request body:

```json
{
  "email": "admin@example.com",
  "password": "your_admin_password"
}
```

The field names and response structure must match the existing backend implementation.

**Note:** This is an illustrative request body, not a real account or default credential.

---

## Authentication and Security

Authentication and authorization are separate responsibilities.

### Authentication

Authentication verifies who the user is.

The intended flow is:

1. The user submits login credentials.
2. The backend finds the corresponding account.
3. The backend verifies the password.
4. The backend issues an authentication token or session according to its implementation.
5. The frontend uses the configured authentication mechanism for protected requests.

### Authorization

Authorization determines what the authenticated user is allowed to do.

The backend must enforce role permissions and data scope on every protected request.

For example:

- Employees should not be able to retrieve another employee's payslip by changing an ID.
- HR users should not be able to finalize payroll if that action is reserved for Admin.
- Employees should not be able to change their own role or salary through a manually constructed API request.
- AI tools should not expose records outside the requesting user's permissions.

Hiding a button in the frontend is not sufficient security.

---

## Business Rules

The intended business rules include:

### Attendance

- Check-in and check-out should create consistent attendance records.
- Late arrival should be calculated using configured office hours and grace periods.
- Attendance corrections should require a reason.
- Authorized HR users should review correction requests.

### Leave

- Leave applications should be validated against configured leave types and balances.
- Overlapping requests should be checked.
- Applicable holidays and weekends should be handled according to company rules.
- Leave approvals and rejections should be recorded.
- Only authorized users should approve requests.

### Payroll

- Payroll should use the configured employee salary structure.
- Applicable allowances, deductions, taxes, and unpaid leave rules should be calculated by the backend.
- HR should prepare and review payroll according to the configured workflow.
- Only Admin should finalize payroll when the project's access rules require it.
- Finalized payroll records should not be editable through unauthorized requests.

These are intended rules. Their implementation should be validated against the actual service and model code.

---

## Database Overview

The project uses MongoDB with Mongoose.

The data model is expected to represent entities such as:

- Users and authentication information.
- Company and organization settings.
- Departments and designations.
- Employee profiles.
- Attendance records.
- Leave types and leave requests.
- Salary structures and payroll records.
- Payslips.
- Announcements and notifications.
- Audit records.
- AI-related logs, if implemented.

The exact collection names and relationships depend on the existing Mongoose models.

### Data Integrity

- Validate input before storing records.
- Use appropriate schema constraints and indexes.
- Prevent unauthorized access to sensitive documents.
- Avoid hardcoded dashboard statistics.
- Use consistent business rules across dashboards and AI tools.
- Record important administrative actions where audit logging is implemented.

---

## Troubleshooting

### 1. `ERR_CONNECTION_REFUSED`

Example:

```text
POST http://localhost:8000/api/auth/login
net::ERR_CONNECTION_REFUSED
```

**Possible cause:** The backend is stopped, has crashed, or is listening on another port.

**What to do:**

1. Open the backend terminal.
2. Start the backend using its configured development script.
3. Check the terminal for startup errors.
4. Open the setup-status endpoint.
5. Confirm the frontend is configured to use the correct backend URL.

### 2. `401 Unauthorized`

Example:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Possible cause:** The credentials are incorrect or the authentication service is rejecting the account.

**What to do:**

1. Verify the email used during initial setup.
2. Check the password carefully.
3. Confirm the backend connects to the expected database.
4. Inspect the user lookup and password-verification logic.
5. Confirm that the setup process stores passwords using the same hashing scheme the login service expects.

Do not expose password hashes, secrets, or database credentials in logs or public issue reports.

### 3. MongoDB Connection Error

**Possible causes:**

- Invalid connection string.
- Database credentials are incorrect.
- Network access is not configured.
- MongoDB is unavailable.

**What to do:**

1. Verify the MongoDB environment variable.
2. Confirm the database service is accessible.
3. Check the MongoDB connection error in the backend terminal.
4. Ensure database credentials are kept private.

### 4. AI Model Error

**Possible causes:**

- The model identifier is unavailable.
- The API key is missing or invalid.
- The account has reached its usage limit.
- The selected model does not support a feature required by the application.
- The AI service uses a hardcoded model instead of `process.env.AI_MODEL`.

**What to do:**

1. Verify the model identifier.
2. Confirm the AI API key is configured on the backend.
3. Restart the backend after editing `.env`.
4. Check the provider's current model documentation and account limits.
5. Review the backend AI service implementation.

### 5. CORS Error

**Possible cause:** The backend does not permit requests from the frontend origin.

**What to do:**

1. Inspect the backend CORS configuration.
2. Add the correct frontend origin.
3. Ensure the configuration matches the authentication mechanism.
4. Restart the backend and test again.

### 6. Frontend Calls `localhost` After Deployment

**Possible cause:** The deployed frontend still uses the local development API URL.

**What to do:**

1. Configure the deployed frontend with the actual backend URL.
2. Verify the Axios base URL.
3. Check whether the `/api` prefix is duplicated or missing.
4. Rebuild and redeploy the frontend.
5. Confirm the deployed backend allows the frontend origin.

Remember that `localhost` refers to the machine making the request, not automatically to your deployed server.

### 7. Ant Design Deprecation Warning

Example:

```text
Warning: [antd: Alert] `message` is deprecated.
```

This warning is separate from API connection and authentication errors.

Check the relevant Ant Design component and update its props according to the installed version's API documentation.

---

## Future Improvements

Potential improvements include:

- Automated tests for authentication and role permissions.
- More comprehensive API integration tests.
- Improved reporting and export options.
- Enhanced payroll validation.
- More detailed audit history.
- Better AI response validation and tool-call testing.
- Optional mobile attendance with camera and location verification.
- Production monitoring and structured logging.
- Deployment automation and CI checks.
- Accessibility and performance improvements.

These are potential enhancements, not claims that they are already implemented.

---

## Contributing

Contributions and suggestions are welcome.

A suggested workflow:

1. Create a branch for your change.
2. Keep changes focused on one feature or bug.
3. Follow the existing folder structure and coding conventions.
4. Validate request data on the backend.
5. Preserve role-based authorization.
6. Test the affected functionality.
7. Document any new environment variables or setup requirements.
8. Submit a pull request with a clear description.

---

## License

No license has been specified in this README.

Before distributing the project, add a `LICENSE` file and update this section with the chosen license. Do not assume that the project is open-source under a particular license without explicitly selecting one.

---

## Acknowledgements

Developed as part of the Saylani Mass IT Training (SMIT) Hackathon.

**Project:** HCM Lite — AI-Assisted Human Capital Management System

**Purpose:** Simplifying HR workflows through centralized employee management, structured business processes, analytics, and AI-assisted interaction.
