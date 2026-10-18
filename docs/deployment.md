
# CloudForge Deployment Guide

## 1. Home Frontend

- Cloudflare Pages project: `cloudforge-home`
- Repository: `cloudforge`
- Root directory: `apps/home`
- Build command: leave empty for the current static frontend.
- Build output directory: `.`

## 2. API Worker

- Worker name: `cloudforge-api`
- Entry point: `services/api/src/index.js`
- Keep the currently deployed health-check implementation until a replacement has been tested.

## 3. Deployment Verification

1. Open the deployed Home website.
2. Confirm the dashboard loads.
3. Enter the API Worker base URL in the API connection setting.
4. Run the connection check.
5. Verify that `/api/health` returns a successful JSON response.

## 4. Security Checklist

- Verify access protection on the production Home hostname.
- Verify that unauthorized visitors cannot access protected pages.
- Require backend authentication for management APIs.
- Keep Cloudflare API tokens in Worker secrets.
- Never commit secrets to the repository.
- Test changes before connecting real resource-management operations.

## 5. Change Management

- Make small changes.
- Commit each completed file.
- Test after changing the API Worker.
- Keep a record of deployment changes.
- Do not overwrite a working deployment without a recovery plan.
