# 🔐 Portfolio Admin Panel

A lightweight, Git-based admin panel for editing your portfolio without touching code. Perfect for Vercel deployments!

## ✨ Features

- ✅ **No Database Required** - Uses JSON files stored in `/public/data/`
- ✅ **Git Integration** - Auto-commits changes to your repository
- ✅ **Vercel Ready** - Works seamlessly with Vercel deployments
- ✅ **Styled UI** - Matches your portfolio's retro terminal aesthetic
- ✅ **Mobile Friendly** - Responsive admin interface
- ✅ **Simple Auth** - Token-based authentication
- ✅ **Easy Updates** - Edit header, skills, education, experience, projects

## 🚀 Quick Setup

### 1. Set Environment Variables

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD_HASH=5d41402abc4b2a76b9719d911017c592
```

Default credentials:

- **Username**: `admin`
- **Password**: `password`

⚠️ **Change these immediately in production!**

### 2. Access Admin Panel

```
http://localhost:3000/admin/login
```

### 3. Start Editing!

Login and navigate to `/admin/dashboard` to edit:

- Header / About section
- Skills & technologies
- Education details
- Work experience
- Projects

## 🎯 How It Works

```
User Edits Form → Save Data → JSON File Updated → Git Commit
                    ↓
            /public/data/portfolio.json
                    ↓
            Portfolio Components Load Data
```

### File Structure

```
public/
└── data/
    └── portfolio.json    ← All your portfolio data here
```

All portfolio sections load this single JSON file on page load.

## 🔑 Generate Custom Password

Use the provided script:

```bash
node scripts/generate-password-hash.js "your-new-password"
```

Then update `.env.local` with the generated hash.

## 📱 Admin Panel Routes

- `GET /admin/login` - Login page
- `GET /admin/dashboard` - Main admin panel (requires auth)
- `POST /api/admin/save-data` - Save portfolio data (protected)

## 🛡️ Security

- Token-based authentication
- Session stored in browser localStorage
- API route requires Bearer token
- Environment variables protect credentials
- No sensitive data in version control

## 🚀 Deployment on Vercel

1. Add environment variables in Vercel dashboard:

   ```
   NEXT_PUBLIC_ADMIN_USERNAME=admin
   NEXT_PUBLIC_ADMIN_PASSWORD_HASH=your_hash
   ```

2. Deploy as usual

**Note**: Git commits will fail on Vercel (no git access), but data saves locally. For production auto-commits, implement GitHub API integration (see `ADMIN_SETUP.md`).

## 📊 Data Structure

Your portfolio data is organized in `/public/data/portfolio.json`:

```json
{
  "header": {
    /* Hero section */
  },
  "skills": [
    /* Skill categories */
  ],
  "education": {
    /* Education info */
  },
  "experience": [
    /* Job experiences */
  ],
  "projects": [
    /* Portfolio projects */
  ]
}
```

Each section can be edited independently in the admin panel.

## 🎨 UI Matching

The admin interface uses your portfolio's color scheme:

- Retro terminal aesthetic
- Matching fonts and colors
- Responsive grid layouts
- CRT scanline effects

## 💾 Automatic Git Commits

When you save data, the system:

1. Updates `/public/data/portfolio.json`
2. Stages the file in git
3. Creates a commit with timestamp

```bash
git commit -m "Updated portfolio data: 2024-01-05T10:30:00.000Z"
```

## 🐛 Troubleshooting

### Login Issues

- Check username/password
- Clear browser localStorage
- Verify environment variables

### Data Not Saving

- Check file permissions on `/public/data/`
- Verify API response in browser devtools
- Check console for errors

### Git Commit Failed

- This is normal on Vercel (no git access)
- Data still saves to JSON file
- Consider GitHub API integration for production

## 📚 Learn More

See [`ADMIN_SETUP.md`](./ADMIN_SETUP.md) for:

- Detailed configuration
- GitHub API integration
- Advanced security
- Password management
- Full troubleshooting guide

## 🔄 Workflow

1. **Local Development**

   ```bash
   npm run dev
   # Edit at http://localhost:3000/admin/login
   # Git auto-commits changes
   ```

2. **Production (Vercel)**
   ```bash
   # Edits save to JSON file
   # Manual GitHub API integration recommended
   # Push changes manually if needed
   ```

## 🎓 Example Workflow

```
1. Login → /admin/login
2. Dashboard → /admin/dashboard
3. Edit Skills → Click "Skills" tab
4. Add Node.js → Enter text & press Enter
5. Save → Click "Save" button
6. Commit → Automatically committed to git
7. View Changes → Refresh portfolio site
```

## ⚡ Performance

- **Loading**: JSON fetched once on page load
- **Editing**: Real-time form updates
- **Saving**: Single API call with full dataset
- **Git Commit**: Background operation

## 🔐 Best Practices

1. ✅ Change default password immediately
2. ✅ Use strong, unique passwords
3. ✅ Regularly commit changes to git
4. ✅ Backup your JSON file periodically
5. ✅ Test changes before deploying

## 🚫 Limitations

- Single file JSON storage (good for small portfolios)
- No real-time multi-user editing
- Git commits don't work on Vercel (by design)
- No image upload feature (use CDN links)
- No draft/preview mode

## 🚀 Future Ideas

- Drag-to-reorder projects
- Real-time preview
- Undo/Redo
- Multiple users
- Email notifications
- Automatic backups
- Version history

## 📝 License

Same as main portfolio project

---

**Remember**: This is a simple solution perfect for solo portfolios. For complex projects, consider a proper headless CMS like Sanity, Contentful, or Ghost.
