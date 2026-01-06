# Admin Authentication Setup

This portfolio uses environment-based authentication for secure access to the admin panel.

## Development Mode

**Credentials (hardcoded for development):**

- Username: `admin`
- Password: `password`

No environment variables needed for development.

## Production Mode

### Step 1: Install bcryptjs

```bash
npm install bcryptjs
```

### Step 2: Generate Password Hash

```bash
node scripts/generate-password-hash.js "your-secure-password"
```

This will output something like:

```
✅ Bcrypt Password Hash Generated Successfully!

Hash:     $2a$10$N9qo8uLOickgx2ZMRZoMye...

Add these to your .env.production:
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$N9qo8uLOickgx2ZMRZoMye...
```

### Step 3: Create .env.production

Create a `.env.production` file in the root directory:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$YourGeneratedHashHere
```

### Step 4: Add to .gitignore

Make sure `.env.production` is in your `.gitignore`:

```
# Environment files
.env*.local
.env.production
```

### Step 5: Deploy

When deploying to production (Vercel, Netlify, etc.), add these environment variables in your hosting platform's settings:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`

## How It Works

### Development (NODE_ENV=development)

- Simple username/password comparison
- No bcrypt needed
- Quick login: admin/password

### Production (NODE_ENV=production)

- Credentials from environment variables
- Bcrypt hash verification via API route
- Secure password storage

## Security Best Practices

1. **Never commit** `.env.production` to git
2. Use a **strong password** (at least 12 characters with mixed case, numbers, symbols)
3. **Rotate credentials** periodically
4. Use **environment variables** in your hosting platform
5. Enable **HTTPS** in production

## Troubleshooting

### "bcryptjs is not installed" error

Run: `npm install bcryptjs`

### Login not working in production

1. Check environment variables are set correctly
2. Verify the password hash was generated correctly
3. Check server logs for detailed errors

### Want to change password?

1. Generate new hash: `node scripts/generate-password-hash.js "new-password"`
2. Update `ADMIN_PASSWORD_HASH` in production environment
3. Restart/redeploy your application
