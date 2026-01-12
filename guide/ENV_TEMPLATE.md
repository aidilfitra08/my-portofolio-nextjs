# Environment Variables Reference

## Next.js App (my-portofolio-nextjs)

### Local Development (`.env.local`)

```
# Auth API Server URL
NEXT_PUBLIC_AUTH_API_URL=http://localhost:3001
```

### Production (`.env.production`)

```
# Auth API Server URL
NEXT_PUBLIC_AUTH_API_URL=https://your-vercel-auth-server.vercel.app
```

---

## Auth Server (vercel-supabase-auth-server)

### Local Development (`.env`)

```
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-me-in-production

# Server Port
PORT=3001
NODE_ENV=development
```

### Production (Vercel Secrets)

Set these in Vercel dashboard under Project → Settings → Environment Variables:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

---

## How to Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Sign in and select your project
3. In the left sidebar: **Settings → API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **Service Role Secret** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

---

## JWT_SECRET Generation

Generate a strong secret (Linux/Mac):

```bash
openssl rand -base64 32
```

Or use an online generator: [randomkeygen.com](https://www.randomkeygen.com/)

**Important:** Use different secrets for dev and production!
