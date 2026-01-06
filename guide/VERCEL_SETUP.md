# Vercel Deployment Setup Guide

This portfolio is configured to work seamlessly with Vercel's deployment platform using GitHub integration for data persistence.

## 🚀 Quick Setup

### 1. Create GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name: `Portfolio Admin Vercel`
4. Set expiration (recommended: 90 days or No expiration for production)
5. Select scopes:
   - ✅ `repo` (Full control of private repositories) - if your repo is private
   - ✅ `public_repo` (Access public repositories) - if your repo is public
6. Click "Generate token"
7. **Copy the token immediately** (you won't be able to see it again!)

### 2. Configure Environment Variables in Vercel

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to: **Settings > Environment Variables**
3. Add the following variables:

| Variable Name         | Value                             | Environment                      |
| --------------------- | --------------------------------- | -------------------------------- |
| `NODE_ENV`            | `production`                      | Production                       |
| `ADMIN_USERNAME`      | Your admin username               | Production, Preview, Development |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of your password      | Production, Preview, Development |
| `GITHUB_TOKEN`        | Your GitHub personal access token | Production, Preview, Development |
| `GITHUB_OWNER`        | Your GitHub username or org       | Production, Preview, Development |
| `GITHUB_REPO`         | Your repository name              | Production, Preview, Development |

### 3. Generate Password Hash

Run locally to generate a bcrypt hash:

```bash
npm run generate-hash "YourPasswordHere"
```

Copy the generated hash to use as `ADMIN_PASSWORD_HASH` in Vercel.

### 4. Deploy

Once environment variables are set:

```bash
# Using Vercel CLI
vercel --prod

# Or push to your GitHub repository
git push origin main
```

Vercel will automatically deploy on push if you've connected your GitHub repository.

## 🔧 How It Works

### Local Development

- Uses filesystem operations (fs, writeFile, etc.)
- **Auto-commits to git** with descriptive messages
- Data saved to `public/data/portfolio.json`
- Images saved to `public/project/`
- Git commands run automatically after saves

### Vercel Production

- Detects Vercel environment via `process.env.VERCEL === "1"`
- Uses GitHub API for all file operations
- Commits changes directly to your repository
- Each save/upload/delete creates a new commit
- Vercel automatically redeploys on commit (optional: can disable auto-deploy)

## 📁 API Routes

All admin API routes automatically switch between local and Vercel modes:

### Save Data (`/api/admin/save-data`)

- **Local**: Writes to `portfolio.json` file + `git commit`
- **Vercel**: Commits JSON changes to GitHub via API

### Upload Image (`/api/admin/upload-image`)

- **Local**: Saves to `public/project/` folder + `git commit`
- **Vercel**: Uploads to GitHub `public/project/` directory via API

### Delete Image (`/api/admin/delete-image`)

- **Local**: Deletes file from filesystem + `git commit`
- **Vercel**: Deletes file from GitHub repository via API

## 🛡️ Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` by default
2. **Rotate tokens regularly** - Update GitHub token every 90 days
3. **Use strong passwords** - Generate with `npm run generate-hash`
4. **Restrict token scope** - Only grant necessary permissions
5. **Enable 2FA** - On both GitHub and Vercel accounts

## 🔍 Troubleshooting

### "GitHub not configured" error

- Verify all three variables are set: `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`
- Check token hasn't expired
- Ensure token has correct scopes (`repo` or `public_repo`)

### "Failed to fetch current file from GitHub"

- Check repository exists and is accessible
- Verify `GITHUB_OWNER` and `GITHUB_REPO` are correct
- Ensure token has read permissions

### "GitHub commit failed"

- Token may have expired - generate a new one
- Check if branch name is correct (default: `main`)
- Verify you have write access to the repository

### Changes not appearing after save

- Check Vercel deployment logs for errors
- Wait 1-2 minutes for redeployment
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Authentication fails on Vercel

- Verify `ADMIN_PASSWORD_HASH` is set correctly
- Re-generate hash using `npm run generate-hash`
- Check `NODE_ENV=production` is set

### Git commands fail locally

- Ensure git is installed and configured
- Check that you're in a git repository
- Verify you have write permissions to the repo
- Make sure git user.name and user.email are configured

## 📊 Deployment Flow

### Local Development

```
Admin saves data in dashboard
    ↓
API route saves to local filesystem
    ↓
Git commit command runs automatically
    ↓
Changes committed to local repository
    ↓
Push to GitHub when ready
```

### Vercel Production

```
Admin saves data in dashboard
    ↓
API route detects Vercel environment
    ↓
Fetches current file SHA from GitHub
    ↓
Commits new content to GitHub via API
    ↓
GitHub triggers Vercel webhook (if enabled)
    ↓
Vercel redeploys with new content
    ↓
Changes live on your domain
```

## 🎯 Testing

### Test Locally

```bash
npm run dev
# Visit http://localhost:3000/admin/login
# Make changes and check git log for auto-commits
```

### Test on Vercel

1. Make a small change in the admin dashboard
2. Save the changes
3. Check GitHub repository for new commit
4. Wait for Vercel to redeploy (check deployment status)
5. Verify changes appear on live site

## 📚 Additional Resources

- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [Vercel Git Integration](https://vercel.com/docs/deployments/git)
- [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

## 💡 Pro Tips

1. **Disable Auto-Deploy**: If you don't want Vercel to redeploy on every admin change, disable auto-deploy in Vercel settings
2. **Preview Deployments**: Test changes on preview deployments before merging to main
3. **Backup Data**: Periodically backup `portfolio.json` - it's already in git history
4. **Monitor Commits**: Set up GitHub notifications for commits to track admin changes
5. **Branch Protection**: Consider enabling branch protection rules on main branch
6. **Local Testing**: Test all admin features locally before deploying to production
7. **Git History**: Use `git log --oneline` to see all auto-commit messages from admin changes

## 🔄 Migration from Local to Vercel

If you've been using the admin system locally and want to deploy to Vercel:

1. Ensure all local changes are committed and pushed to GitHub
2. Set up environment variables in Vercel (see step 2 above)
3. Deploy to Vercel
4. Test the admin system on Vercel to ensure GitHub integration works
5. From now on, changes made on Vercel will automatically commit to GitHub

---

Need help? Check the [GitHub Integration Quick Reference](./GITHUB_INTEGRATION.md) or [Admin System Guide](./ADMIN_SETUP.md).
