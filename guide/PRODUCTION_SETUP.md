# Quick Setup: Production Authentication

## For Production Deployment

### 1. Install bcryptjs

```bash
npm install bcryptjs
```

### 2. Generate your password hash

```bash
node scripts/generate-password-hash.js "YourSecurePassword123!"
```

### 3. Set environment variables in your hosting platform

**Vercel:**

- Go to Project Settings → Environment Variables
- Add:
  - `ADMIN_USERNAME` = `admin`
  - `ADMIN_PASSWORD_HASH` = `<your-generated-hash>`

**Netlify:**

- Go to Site Settings → Environment Variables
- Add the same variables

**Other platforms:**

- Add environment variables in your platform's dashboard

### 4. Deploy and test

- Access `/admin/login`
- You should see "PRODUCTION" badge
- Login with your credentials

## For Local Development

No setup needed! Just use:

- Username: `admin`
- Password: `password`

You'll see "DEV MODE" badge on the login page.

---

See [ADMIN_AUTH_SETUP.md](./ADMIN_AUTH_SETUP.md) for detailed documentation.
