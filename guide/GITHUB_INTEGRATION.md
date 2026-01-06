# GitHub Integration Quick Reference

## Environment Variables Required

```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=your-github-username
GITHUB_REPO=my-portofolio-nextjs
```

## How to Get GitHub Token

1. Visit: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: `Portfolio Admin Vercel`
4. Scopes needed:
   - ✅ `repo` (for private repos)
   - ✅ `public_repo` (for public repos)
5. Click "Generate token"
6. Copy token immediately

## Setting Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add each variable
5. Apply to: Production, Preview, Development

## Testing GitHub Integration

### Test Data Save

```bash
# In admin dashboard:
1. Make any change to portfolio data
2. Click Save
3. Check GitHub repo for new commit
4. Message will be: "Update portfolio data - [timestamp]"
```

### Test Image Upload

```bash
# In admin dashboard:
1. Upload an image in Projects section
2. Check GitHub repo → public/project/
3. New file should appear with commit message: "Upload image: [filename]"
```

### Test Image Delete

```bash
# In admin dashboard:
1. Delete an image from a project
2. Check GitHub repo → public/project/
3. File should be removed with commit message: "Delete image: [filename]"
```

## API Endpoints Behavior

| Endpoint                  | Local Mode           | Vercel Mode             |
| ------------------------- | -------------------- | ----------------------- |
| `/api/admin/save-data`    | `fs.writeFileSync()` | GitHub API PUT          |
| `/api/admin/upload-image` | `fs.writeFile()`     | GitHub API PUT (base64) |
| `/api/admin/delete-image` | `fs.unlink()`        | GitHub API DELETE       |

## Environment Detection

All APIs automatically detect environment:

```typescript
const isVercel = process.env.VERCEL === "1";
```

## Common Issues

### Issue: "GitHub not configured"

**Solution**: Set all 3 variables (TOKEN, OWNER, REPO)

### Issue: "Failed to fetch current file"

**Solution**:

- Check repo name is correct
- Verify token has `repo` or `public_repo` scope
- Ensure file exists in repository

### Issue: "GitHub commit failed"

**Solution**:

- Token might be expired - generate new one
- Check branch name (should be `main`)
- Verify write access to repository

### Issue: Changes not appearing

**Solution**:

- Wait 1-2 minutes for Vercel redeployment
- Check Vercel deployment logs
- Hard refresh browser (Ctrl+Shift+R)

## Manual API Testing

### Save Data

```bash
curl -X POST https://your-domain.vercel.app/api/admin/save-data \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
  -d '{"header":{"name":"Test"}}'
```

### Upload Image

```bash
curl -X POST https://your-domain.vercel.app/api/admin/upload-image \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
  -F "file=@image.jpg"
```

### Delete Image

```bash
curl -X DELETE https://your-domain.vercel.app/api/admin/delete-image \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
  -d '{"imagePath":"/project/12345-image.jpg"}'
```

## Deployment Checklist

- [ ] GitHub token generated with correct scopes
- [ ] All 3 environment variables set in Vercel
- [ ] Variables applied to all environments
- [ ] Password hash generated and set
- [ ] Test login works
- [ ] Test data save creates GitHub commit
- [ ] Test image upload appears in repo
- [ ] Test image delete removes from repo
- [ ] Verify Vercel redeploys after commits

## Security Notes

⚠️ **Never expose your GitHub token**

- Don't commit to repository
- Don't share in logs or screenshots
- Rotate regularly (every 90 days)

⚠️ **Token Permissions**

- Only grant necessary scopes
- Use `public_repo` for public repositories
- Use `repo` only if repository is private

⚠️ **Branch Protection**

- Consider enabling branch protection on `main`
- Require status checks before merging
- Prevent force pushes

---

For full setup guide, see [VERCEL_SETUP.md](./VERCEL_SETUP.md)
