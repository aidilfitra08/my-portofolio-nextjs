# Portfolio Admin Panel Setup Guide

## Overview

This admin panel allows you to edit your portfolio data without touching the code. All data is stored in JSON files and can be automatically committed to Git.

## 🚀 Quick Start

### 1. Environment Variables

Create a `.env.local` file in your project root:

```env
# Admin credentials - Change these immediately!
# Default: admin / password
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD_HASH=5d41402abc4b2a76b9719d911017c592

# Optional: GitHub token for automatic commits (recommended for Vercel)
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_portfolio_repo_name
```

### 2. Generate Password Hash

The password is hashed using a simple algorithm. To generate your password hash:

```bash
node -e "console.log(Math.abs(require('crypto').createHash('md5').update('your_password').digest('hex')).toString(16).slice(0, 32))"
```

Or use this simple Node.js script:

```javascript
const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
};

console.log(hashPassword("your_password"));
```

### 3. Access the Admin Panel

- **Login URL**: `/admin/login`
- **Dashboard URL**: `/admin/dashboard`
- **Default credentials**: `admin` / `password`

## 📊 Data Structure

All portfolio data is stored in `/public/data/portfolio.json`:

```json
{
  "header": {
    "greeting": "Hello,",
    "name": "Your Name",
    "title": "Your Title",
    "description": "Your bio",
    "location": "Your Location"
  },
  "skills": [
    {
      "category": "Backend",
      "items": ["Node.js", "Golang"],
      "color": "text-accent-green",
      "bgColor": "bg-accent-green",
      "icon": "faServer"
    }
  ],
  "education": {
    "university": "University Name",
    "degree": "Degree",
    "gpa": "3.60/4.00",
    "startDate": "August 2019",
    "endDate": "August 2024",
    "location": "Indonesia"
  },
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "Location",
      "startDate": "Feb 2022",
      "endDate": "July 2022",
      "responsibilities": ["Task 1", "Task 2"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "tech": "Tech Stack",
      "description": "Project description",
      "github": "https://github.com/...",
      "live": "https://...",
      "image": "/project/image.png"
    }
  ]
}
```

## 🎨 Color Scheme

The admin panel uses your portfolio's color scheme:

- **Accent Green**: `text-accent-green` / `bg-accent-green` - Primary accent
- **Cyan**: `text-[#00d9ff]` / `bg-[#00d9ff]` - Headers & titles
- **Orange**: `text-[#ffb000]` / `bg-[#ffb000]` - Dates & secondary info
- **Red**: `text-[#ff6b6b]` / `bg-[#ff6b6b]` - Highlights & errors
- **Purple**: `text-[#bd93f9]` / `bg-[#bd93f9]` - Education & tertiary elements

## 🔒 Security Features

### Authentication

- Token-based authentication using localStorage
- Session stored in browser
- Auto-logout on tab close (localStorage cleared)

### File Protection

- API route requires Bearer token
- Git commits are atomic
- Original JSON structure validation

### Deployment on Vercel

Since Vercel doesn't allow direct file writing:

1. Git commits are attempted locally
2. If running on Vercel, commits will fail silently
3. **Recommended**: Use GitHub API integration (see Advanced Setup below)

## 🔧 API Endpoints

### Save Portfolio Data

```
POST /api/admin/save-data
Headers:
  - Authorization: Bearer <token>
  - Content-Type: application/json

Body: { ...portfolio data }
```

## 📝 Editing Guide

### Header / About Section

- Update your greeting, name, title, bio, and location
- Changes reflect on the homepage hero section

### Skills

- Add/remove skill categories (Backend, Frontend, etc.)
- Add/remove individual skills from each category
- Click to expand category and add new skills

### Education

- Single education entry
- Update university, degree, GPA, dates, and location

### Experience

- Multiple experience entries
- Add new experiences or delete old ones
- Add responsibilities with the + button
- Each responsibility displays as a bullet point

### Projects

- Multiple projects
- Add project name, tech stack, description
- Link GitHub repository and live demo
- Add project image (path relative to public folder)
- Click preview to see image

## 🚀 Advanced Setup: GitHub API Integration

For production on Vercel, enable automatic GitHub commits:

### 1. Create GitHub Personal Access Token

- Go to GitHub → Settings → Developer settings → Personal access tokens
- Create a token with `repo` scope
- Copy the token

### 2. Add to Vercel Environment Variables

```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxx
GITHUB_OWNER=your_username
GITHUB_REPO=your_portfolio_repo
```

### 3. Update API Route (Optional Enhancement)

You can enhance `/api/admin/save-data` to use GitHub API:

```typescript
// Option 1: Use GitHub REST API to commit
// Option 2: Use Octokit library
// Option 3: Use GitHub GraphQL

// This ensures changes persist on Vercel
```

## 📦 Building & Deployment

### Local Development

```bash
npm run dev
# Access http://localhost:3000/admin/login
```

### Production Build

```bash
npm run build
npm start
```

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

⚠️ **Note**: File system writes work locally but not on Vercel. For production:

- Option 1: Implement GitHub API integration
- Option 2: Use a serverless database (Firebase, Supabase)
- Option 3: Use static site generation with webhooks

## 🔐 Password Security

**Default password hash** (`5d41402abc4b2a76b9719d911017c592`) is for password "password".

### Change Password Immediately

1. Decide your new password
2. Generate its hash using the formula above
3. Update `.env.local`:
   ```
   NEXT_PUBLIC_ADMIN_PASSWORD_HASH=your_new_hash
   ```
4. Redeploy to Vercel

⚠️ **Important**: Store hash in Vercel environment variables, NOT in git.

## 🐛 Troubleshooting

### Can't Login

- Check username matches `NEXT_PUBLIC_ADMIN_USERNAME`
- Verify password hash is correct
- Clear browser localStorage and try again

### Changes Not Saving

- Check browser console for errors
- Verify API route exists at `/api/admin/save-data`
- Check file permissions on `/public/data/`

### Git Commit Failed

- This is expected on Vercel (no git access)
- Implement GitHub API integration for production

### JSON File Not Loading

- Check `/public/data/portfolio.json` exists
- Verify JSON syntax is valid
- Check browser network tab for 404 errors

## 🚀 Future Enhancements

- [ ] Real-time preview of changes
- [ ] Undo/Redo functionality
- [ ] Multiple admin users
- [ ] Email notifications on changes
- [ ] Database backup system
- [ ] Version history / changelog
- [ ] Image upload to CDN
- [ ] Content scheduling

## 📄 License

Same as main portfolio project.

## 🤝 Support

For issues or questions:

1. Check troubleshooting section
2. Review environment variables
3. Check browser console for errors
4. Check file permissions

---

**Remember**: This admin panel is meant for quick edits. For complex changes, edit the JSON file directly or modify components as needed.
