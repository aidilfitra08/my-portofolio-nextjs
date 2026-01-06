# 🚀 Quick Start - Portfolio Admin Panel

Get your admin panel running in 5 minutes!

## Step 1: Create Environment File (30 seconds)

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD_HASH=5d41402abc4b2a76b9719d911017c592
```

**Default Credentials:**

- Username: `admin`
- Password: `password`

⚠️ Change these immediately!

## Step 2: Start Development Server (1 minute)

```bash
npm run dev
```

Visit: http://localhost:3000

## Step 3: Access Admin Panel (30 seconds)

### Login Page

```
http://localhost:3000/admin/login
```

Enter credentials:

- Username: `admin`
- Password: `password`

### Dashboard

After login, you're at:

```
http://localhost:3000/admin/dashboard
```

## Step 4: Edit Your Portfolio (2 minutes)

### On the Dashboard:

1. **Click "Header / About"** → Edit your name, title, bio
2. **Click "Skills"** → Add/remove skills
3. **Click "Education"** → Update education details
4. **Click "Experience"** → Manage work experience
5. **Click "Projects"** → Update project portfolio

### Save Changes:

Click the **"Save"** button at top right.

You'll see a ✓ confirmation when done.

## Step 5: Deploy to Vercel (3 minutes)

### Option A: Automatic (via Git)

```bash
git add .
git commit -m "Add portfolio admin panel"
git push origin main
```

Your Vercel deployment will auto-update.

### Option B: Manual

1. Go to [Vercel Dashboard](https://vercel.com)
2. Add Environment Variables:
   ```
   NEXT_PUBLIC_ADMIN_USERNAME=admin
   NEXT_PUBLIC_ADMIN_PASSWORD_HASH=your_hash
   ```
3. Redeploy

## 🎯 Common Tasks

### Change Your Password

1. Generate new hash:

   ```bash
   node scripts/generate-password-hash.js "my-new-password"
   ```

2. Copy the hash output

3. Update `.env.local`:

   ```env
   NEXT_PUBLIC_ADMIN_PASSWORD_HASH=your_new_hash
   ```

4. Restart dev server or redeploy

### Edit Your About Section

1. Go to `/admin/dashboard`
2. Default tab is "Header / About"
3. Edit the fields
4. Click Save

### Add a New Skill

1. Click "Skills" tab
2. Click on skill category to expand (e.g., "Backend")
3. Type skill name in text field
4. Press Enter
5. Click Save

### Add Work Experience

1. Click "Experience" tab
2. Scroll down and click "Add Experience"
3. Fill in job details
4. Add responsibilities (press Enter to add)
5. Click Save

### Upload Project Image

1. Upload image to `/public/project/` folder (or any `/public` folder)
2. In Projects editor, enter: `/project/image-name.png`
3. Preview should show image
4. Click Save

## 📁 File Structure

Your data lives here:

```
/public/data/portfolio.json  ← Edit this manually or use admin panel
```

Components that read this:

```
src/app/components/
├── landing-page/section/header/
├── landing-page/section/skill/
├── landing-page/section/education/
├── landing-page/section/experience/
└── landing-page/section/projects/
```

## 🔐 Security Tips

✅ **DO:**

- Change default password immediately
- Use strong passwords
- Keep `.env.local` out of version control
- Backup your JSON file

❌ **DON'T:**

- Commit `.env.local` to Git
- Share your credentials
- Use simple passwords
- Forget to backup data

## 🆘 Quick Troubleshooting

### Can't Login?

```
• Check username (default: admin)
• Check password (default: password)
• Clear browser cache/cookies
• Check .env.local file exists
```

### Changes Not Saving?

```
• Check browser console for errors
• Verify /public/data/ directory exists
• Check file permissions
• Try refreshing page
```

### Git Commit Failed?

```
• This is normal on Vercel
• Data still saves to JSON file
• You can commit manually later
• This is expected behavior
```

### Can't Access Admin Panel?

```
• Make sure npm run dev is running
• Check URL: http://localhost:3000/admin/login
• Verify port 3000 is not blocked
• Check for firewall issues
```

## 📚 More Documentation

- **Full Setup Guide**: See `ADMIN_SETUP.md`
- **Visual Guide**: See `ADMIN_VISUAL_GUIDE.md`
- **Implementation Details**: See `ADMIN_IMPLEMENTATION_SUMMARY.md`

## 💡 Pro Tips

1. **Edit Locally First**

   - Test on localhost before deploying
   - Save changes to Git frequently

2. **Backup Your Data**

   - `portfolio.json` is your backup
   - Commit changes regularly to Git

3. **Keep Descriptions Clear**

   - Write good project descriptions
   - Include key technologies

4. **Use Real Links**

   - Link to actual GitHub repos
   - Link to live demos
   - Test links work

5. **Update Regularly**
   - Add projects as you complete them
   - Update skills as you learn new things
   - Keep dates current

## 🎉 You're All Set!

Your portfolio now has a professional admin panel.

**Next Steps:**

1. ✅ Change your password
2. ✅ Edit your content
3. ✅ Deploy to production
4. ✅ Enjoy easy updates!

---

**Questions?** See the detailed documentation files.

**Ready?** Go to `/admin/login` and start editing!
