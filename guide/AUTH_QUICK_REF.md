# 🔐 Authentication Quick Reference

## Development

```
Username: admin
Password: password
```

Just run `npm run dev` and login!

## Production Setup

### 1️⃣ Install

```bash
npm install bcryptjs
```

### 2️⃣ Generate Hash

```bash
npm run generate-hash "YourPassword"
```

### 3️⃣ Set Environment Variables

In your hosting platform:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<generated-hash>
```

### 4️⃣ Deploy & Login! 🚀

## Useful Commands

```bash
# Generate password hash
npm run generate-hash "your-password"

# Test authentication setup
npm run test-auth

# Development mode
npm run dev

# Production build
npm run build
npm start
```

## Need Help?

📖 See [AUTH_IMPLEMENTATION_SUMMARY.md](./AUTH_IMPLEMENTATION_SUMMARY.md)  
📖 See [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md)  
📖 See [ADMIN_AUTH_SETUP.md](./ADMIN_AUTH_SETUP.md)
