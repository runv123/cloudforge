
# CloudForge Architecture

## 1. Project Overview

CloudForge is a private personal development console for managing Cloudflare resources.

The system uses multiple independently deployed websites and a shared API service.

## 2. Deployment Architecture

- `apps/home`: main dashboard and navigation.
- `services/api`: shared backend Worker.
- `apps/admin`: future project management interface.
- `apps/code`: future code editing interface.
- `apps/data`: future database and storage management interface.
- `apps/deploy`: future deployment management interface.
- `packages/ui`: shared UI components.
- `packages/api-client`: shared API client.
- `packages/shared`: shared utilities and constants.
- `docs`: project documentation.

## 3. Core Principles

- Personal use only.
- No public user registration.
- Prefer free Cloudflare services within applicable limits.
- Keep frontend applications independently deployable.
- Use one shared backend API for authorized management operations.
- Never expose Cloudflare API tokens in frontend code.
- Keep secrets in backend secret storage.
- Require authentication and authorization for management APIs.
- Confirm destructive operations before execution.

## 4. Security

- Protect the dashboard with Cloudflare Access or an equivalent access-control layer.
- Validate identity and permissions on the backend.
- Restrict cross-origin requests to trusted origins where appropriate.
- Validate all input received by management endpoints.
- Do not treat a private source repository as website access protection.
- Do not connect real Cloudflare resource-management tokens until authentication is implemented and tested.

## 5. Development Stages

### Stage 1: Foundation

- Deploy the Home frontend.
- Deploy the shared API Worker.
- Verify the API health endpoint.
- Complete the initial project structure.

### Stage 2: Access Security

- Configure access protection.
- Implement backend authentication and authorization.
- Store secrets securely.
- Test unauthorized access rejection.

### Stage 3: Resource Management

- List Cloudflare projects.
- Manage KV, D1, and R2 resources as supported.
- Add project creation and deployment workflows.
- Add operation logs and error handling.

### Stage 4: Development Tools

- Add code editing and preview.
- Add API testing.
- Add resource data browsing.
- Add monitoring and diagnostics.

## 6. Current Status

Home, the API Worker, and Cloudflare Pages have been deployed.
The API health check has succeeded.

Access protection and additional management features remain to be verified or implemented.
