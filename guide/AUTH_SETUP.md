# Setting Up Authentication for Simple AI Agent Page

This guide walks you through setting up the login/register flow with Supabase PostgreSQL backing and admin approval workflow.

## Architecture Overview

1. **Stateless Auth Server** (Node.js) — deployed separately to Vercel

   - Handles registration, login, and user approval checks
   - Issues JWT tokens (stateless, no sessions)
   - Connects to Supabase PostgreSQL

2. **AuthGate Component** (Next.js) — wraps protected pages
   - Enforces login before access
   - Shows approval-pending screen if not approved
   - Persists token in localStorage

## Setup Steps

### 1. Create Supabase Database Table

In your Supabase dashboard SQL editor, run:

```sql
create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  password_hash text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Optional: enable RLS
alter table public.app_users enable row level security;
create policy "allow read for anon" on public.app_users
  for select using (true);
```

### 2. Set Up Auth Server

Inside the repo at `vercel-supabase-auth-server/`:

1. Install dependencies:

   ```bash
   cd vercel-supabase-auth-server
   pnpm install
   ```

2. Create `.env` file:

   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   JWT_SECRET=some_random_secure_secret_here
   PORT=3001
   ```

3. Run locally:
   ```bash
   pnpm dev
   ```

### 3. Deploy Auth Server to Vercel

1. Move the `vercel-supabase-auth-server` folder outside this repo (for cleaner monorepo setup):

   ```bash
   mv vercel-supabase-auth-server ../auth-server
   ```

2. Create a Vercel project from that folder:

   ```bash
   cd ../auth-server
   vercel
   ```

3. Set environment variables in Vercel dashboard

4. Note the deployed URL (e.g., `https://auth-server.vercel.app`)

### 4. Configure Next.js App

In your `.env.local` (or `.env.production`):

```
NEXT_PUBLIC_AUTH_API_URL=https://auth-server.vercel.app
```

> `NEXT_PUBLIC_` prefix makes it accessible to the browser

### 5. Protect Pages with AuthGate

The `simple-ai-agent` page is already wrapped. To protect other pages:

```tsx
"use client";

import AuthGate from "@/components/AuthGate";

export default function MyPage() {
  return (
    <AuthGate>
      <div>Protected content here</div>
    </AuthGate>
  );
}
```

## Admin Approval Workflow

As the admin:

1. **Register** a new user (or send invite link)
2. User registers and sees "Awaiting Approval" screen
3. You log into your Supabase dashboard
4. In the `app_users` table, set `approved = true` for that user
5. User logs in again and gains access

To add an admin dashboard for approvals (optional), create an `/admin/approvals` page that fetches all pending users and bulk-updates their `approved` status.

## API Routes

### POST /register

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:** `{ message: "registered, pending approval", userId: "..." }`

### POST /login

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (approved):** `{ token: "jwt...", approved: true }`  
**Response (pending):** `{ approved: false, message: "pending approval" }`

### GET /me

**Headers:** `Authorization: Bearer <token>`  
**Response:** `{ id, email, name, approved }`

## Testing

1. Go to `/playground/simple-ai-agent`
2. Click "Register", fill in details
3. Check Supabase `app_users` table → set `approved = true` for your test user
4. Login with those credentials
5. You should now see the chat page

## Troubleshooting

- **401 Unauthorized on login:** Check JWT_SECRET matches between server and client
- **Connection error:** Verify SUPABASE_URL and SERVICE_ROLE_KEY in `.env`
- **User not found after registration:** Check Supabase table for the email
- **CORS issues:** Auth server has `cors({ origin: true })` to allow all origins
