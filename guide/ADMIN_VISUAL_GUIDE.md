# Admin Panel Visual Guide

## Login Screen

```
┌─────────────────────────────────────────┐
│  ▯ ▯ ▯      ADMIN PORTAL              │
│            admin_access_▊              │
├─────────────────────────────────────────┤
│                                         │
│  👤 Username                            │
│  [________________________________]      │
│                                         │
│  🔒 Password                            │
│  [________________________________]      │
│                                         │
│  [   🔒 ENTER PORTAL   ]                │
│                                         │
│  » Secure admin access                  │
│  » Default: admin / password            │
│                                         │
└─────────────────────────────────────────┘
```

### Accessing Login

- **URL**: `http://localhost:3000/admin/login`
- **Local**: Works on localhost:3000
- **Vercel**: Works on your deployed domain

---

## Admin Dashboard

```
┌───────────────────────────────────────────────────────────────────┐
│ $ PORTFOLIO ADMIN v1.0          [Save ✓] [💾 Saved] [Logout]    │
├───────────────────────┬───────────────────────────────────────────┤
│ SECTIONS              │  EDIT HEADER / ABOUT SECTION              │
│                       │                                            │
│ ▶ Header / About ✓    │  ✏️ Edit Header / About Section           │
│ ▶ Skills              │                                            │
│ ▶ Education           │  ★ Greeting                               │
│ ▶ Experience          │  [Hello,_________________________]          │
│ ▶ Projects            │                                            │
│                       │  ★ Full Name                              │
│                       │  [Aidil_________________________]          │
│                       │                                            │
│                       │  ★ Professional Title                     │
│                       │  [Computer Science Graduate______]         │
│                       │                                            │
│                       │  ★ Description / Bio                      │
│                       │  [_______________________________]         │
│                       │  [_______________________________]         │
│                       │  [_______________________________]         │
│                       │                                            │
│                       │  ★ Location                               │
│                       │  [Indonesia_____________________]         │
│                       │                                            │
│                       │  PREVIEW                                  │
│                       │  ► Hello, I am Aidil                     │
│                       │  ► Computer Science Graduate              │
│                       │                                            │
└───────────────────────┴───────────────────────────────────────────┘
```

---

## Skills Editor

```
┌────────────────────────────────────────────────┐
│ ✏️ Edit Skills                                 │
├────────────────────────────────────────────────┤
│                                                │
│ ▼ Backend                            5 skills │
│  ├─ Node.js                          [✕]     │
│  ├─ Golang                           [✕]     │
│  ├─ CodeIgniter                      [✕]     │
│  ├─ Express.js                       [✕]     │
│  ├─ Laravel                          [✕]     │
│  │                                            │
│  └─ [Add new skill...________] [+]            │
│                                                │
│ ▶ Frontend                           4 skills │
│                                                │
│ ▶ Database                           4 skills │
│                                                │
│ ▶ Tools                              4 skills │
│                                                │
│ ▶ Others                             1 skill  │
│                                                │
└────────────────────────────────────────────────┘
```

**Actions:**

- Click section header to expand/collapse
- Click ✕ to delete skill
- Type in field and press Enter to add skill
- Use + button as alternative to add

---

## Experience Editor

```
┌─────────────────────────────────────────────────┐
│ ✏️ Edit Experience                              │
├─────────────────────────────────────────────────┤
│                                                 │
│ ▼ Back End Developer Intern                [✕] │
│   Vocasia                                       │
│                                                 │
│   ★ Job Title                                   │
│   [Back End Developer Intern_________________] │
│                                                 │
│   ★ Company                                     │
│   [Vocasia__________________________________] │
│                                                 │
│   ★ Location     ★ Start Date    ★ End Date   │
│   [Indonesia]    [Feb 2022]      [July 2022]  │
│                                                 │
│   ★ Responsibilities                            │
│   ├─ Developed and integrated 15 new... [✕]   │
│   ├─ Resolved frontend API fetching...  [✕]   │
│   └─ [Add responsibility...______] [+]        │
│                                                 │
│ ┌────────────────────────────────────────────┐ │
│ │ [+ Add Experience]                         │ │
│ └────────────────────────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Actions:**

- Click card to expand/collapse
- Click ✕ to delete entire experience
- Edit any field directly
- Add responsibilities with Enter key
- Click [+ Add Experience] to add new job

---

## Projects Editor

```
┌──────────────────────────────────────────────────┐
│ ✏️ Edit Projects                                 │
├──────────────────────────────────────────────────┤
│                                                  │
│ ▼ DigimaLearn (LMS)                     [✕]    │
│   React.js, Javascript, PostgreSQL...           │
│                                                  │
│   ★ Project Name                                 │
│   [DigimaLearn (Learning Management...)...]     │
│                                                  │
│   ★ Technology Stack                             │
│   [React.js, Javascript, PostgreSQL...]         │
│                                                  │
│   ★ Description                                  │
│   [Final year project about Learning...]        │
│   [Management System for digital...]            │
│   [...]                                          │
│                                                  │
│   ★ GitHub URL          ★ Live Demo URL         │
│   [https://github...]   [http://digimalearn...] │
│                                                  │
│   ★ Image Path                                   │
│   [/lms.png_____________________]               │
│                                                  │
│   [Preview Image Loading...]                    │
│                                                  │
│ ▶ Vitour (Virtual Tour)                 [✕]    │
│   React.js, Express.js, PostgreSQL...           │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ [+ Add Project]                              │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Saving & Status Indicators

### Success Status

```
✓ Portfolio data saved successfully!
```

### Error Status

```
✗ Failed to save portfolio data
```

### Save Button States

```
[💾 Save]           ← Ready to save
[⟳ Saving...]       ← Currently saving
[✓ Saved]           ← Just saved (green)
```

---

## Workflow Examples

### Edit Your About Section

1. Login at `/admin/login`
2. You're on "Header / About" by default
3. Edit the "Full Name" field
4. Click "Save" button
5. Wait for ✓ confirmation
6. Refresh portfolio to see changes

### Add a New Skill

1. Click "Skills" tab
2. Click on "Backend" to expand
3. Type "Rust" in the input field
4. Press Enter
5. Click "Save"
6. Page reloads with new skill

### Add New Experience

1. Click "Experience" tab
2. Scroll to bottom
3. Click "Add Experience" button
4. New empty experience card appears
5. Fill in all fields
6. Add responsibilities
7. Click "Save"

### Update Project

1. Click "Projects" tab
2. Click project card to expand
3. Update name, tech, description
4. Update GitHub/Live links
5. Upload project image (must be in `/public`)
6. Click "Save"

---

## Color Legend

| Color     | Meaning          | Used For                     |
| --------- | ---------------- | ---------------------------- |
| 🟢 Green  | Primary, Success | Main buttons, active states  |
| 🔵 Cyan   | Info, Titles     | Section headers, input focus |
| 🟡 Orange | Secondary, Dates | Date fields, badges          |
| 🔴 Red    | Danger, Delete   | Delete buttons, errors       |
| 🟣 Purple | Special          | Education section            |

---

## Keyboard Shortcuts

| Action             | Shortcut              |
| ------------------ | --------------------- |
| Add skill          | Enter (in text field) |
| Add responsibility | Enter (in text field) |
| Add project        | Button click          |
| Delete item        | Click ✕ icon          |
| Save changes       | Click Save button     |
| Logout             | Click Logout button   |

---

## Mobile Support

The admin panel is fully responsive:

```
Phone (Mobile):
┌──────────────────┐
│ $ PORTFOLIO ADM  │
├──────────────────┤
│ [Sections ▼]     │
│                  │
│ Header / About   │
│ Skills           │
│ Education        │
│ Experience       │
│ Projects         │
├──────────────────┤
│ [Edit Content]   │
│                  │
│ [Greeting]       │
│ [_____________]  │
│                  │
│ [Name]           │
│ [_____________]  │
│                  │
│ [💾 Save]        │
└──────────────────┘
```

---

## Pro Tips

✨ **Pro Tips for Using the Admin Panel**

1. **Test Locally First**

   - Edit on localhost before deploying
   - See changes in real-time

2. **Keep Backups**

   - `portfolio.json` is your backup
   - Commit regularly to git

3. **Use Meaningful Descriptions**

   - Edit project descriptions clearly
   - Include key technologies

4. **Update Regularly**

   - Add new projects as you complete them
   - Update skills as you learn
   - Keep dates current

5. **Preview Changes**

   - Refresh portfolio site after saving
   - Check all sections display correctly

6. **Password Security**
   - Change default password ASAP
   - Use strong, unique password
   - Store safely (password manager)

---

## Troubleshooting Quick Reference

| Issue                | Solution                              |
| -------------------- | ------------------------------------- |
| Can't login          | Check username/password, clear cache  |
| Changes not saved    | Check console for errors, try again   |
| Page won't load      | Check network tab, verify file exists |
| Git commit failed    | Normal on Vercel, data still saves    |
| Styling looks broken | Check color classes, refresh page     |

---

**Next Steps:**

1. Copy `.env.local.example` to `.env.local`
2. Update credentials with your password hash
3. Navigate to `/admin/login`
4. Start editing!

For more help, see `ADMIN_SETUP.md`
