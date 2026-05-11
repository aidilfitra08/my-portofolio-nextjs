# My Portfolio - Next.js

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This portfolio showcases my projects, skills, and includes interactive features like an AI chat agent and real-time chat rooms.

## 🌟 Features

### 🎨 **Modern Design with Multiple Themes**

- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Multiple Themes** - Switch between Vintage and Neobrutalism themes
  - **Vintage Theme** - Classic retro aesthetic with vintage colors and CRT effects
  - **Neobrutalism Theme** - Bold, raw aesthetic with high contrast and geometric shapes
- **Dark/Light Mode** - Automatic detection with manual override
- **Smooth Theme Switching** - Real-time theme changes with instant feedback
- **Smooth Animations** - Page transitions and scroll effects
- **Modern UI Components** - Clean, professional design

### 🤖 **AI Integration**

- **Simple AI Agent** - Interactive chat with AI assistant
- **Personal Context** - AI remembers user information during conversations
- **Voice Input** - Speech-to-text functionality
- **Markdown Support** - Rich text formatting in AI responses

### 💬 **Real-time Chat**

- **Multi-room Chat** - Join different chat rooms
- **WebSocket Connection** - Real-time messaging
- **User Presence** - See who's online
- **Auto-reconnection** - Handles connection drops gracefully

### 📱 **Interactive Features**

- **Project Showcase** - Detailed project cards with live demos
- **Skills Section** - Animated skill bars and technology icons
- **Contact Forms** - Multiple ways to get in touch
- **Resume Download** - PDF resume download functionality

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/my-portofolio-nextjs-xx.git
   cd my-portofolio-nextjs-xx
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   NEXT_PUBLIC_WEB_SOCKET_URL=ws://localhost:8080/api/v1/ws

   # Optional: Analytics, etc.
   GOOGLE_ANALYTICS_ID=your_ga_id
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 🛠️ Tech Stack

### **Frontend**

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** FontAwesome
- **Fonts:** Geist, Caveat, Kalam
- **State Management:** React Hooks

### **Features & Libraries**

- **AI Chat:** Custom AI integration with markdown support
- **WebSocket:** Native WebSocket for real-time chat
- **Speech Recognition:** Web Speech API
- **Animations:** CSS transitions and transforms
- **Responsive Design:** Mobile-first approach

### **Development Tools**

- **Linting:** ESLint
- **Type Checking:** TypeScript
- **Package Manager:** npm/yarn/pnpm/bun
- **Version Control:** Git

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # Reusable UI components
│   ├── contexts/          # React contexts (Auth, Chat)
│   ├── playground/        # Interactive demos
│   │   ├── simple-ai-agent/   # AI chat feature
│   │   └── chat-room/         # Real-time chat
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── public/               # Static assets
└── README.md            # This file
```

## 🌐 Pages & Features

### **Main Portfolio**

- **Homepage** (`/`) - Hero section, about, skills, projects
- **Projects** - Detailed project showcases with live demos
- **Contact** - Multiple contact methods and forms

### **Interactive Playground**

- **AI Agent** (`/playground/simple-ai-agent`) - Chat with AI assistant
- **Chat Room** (`/playground/chat-room`) - Real-time multi-user chat

## 🔧 Configuration

### **Environment Variables**

```env
# Backend API (required for AI and chat features)
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

# WebSocket server (required for chat rooms)
NEXT_PUBLIC_WEB_SOCKET_URL=ws://localhost:8080/api/v1/ws

# Optional configurations
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### **Backend Requirements**

For full functionality, you'll need a backend server with:

**AI Agent API:**

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `POST /simple-ai-agent` - AI chat endpoint

**WebSocket Chat:**

- WebSocket server at `/api/v1/ws/{roomId}`
- Message broadcasting and room management
- User presence tracking

## 🎨 Customization

### **Theme System**

The portfolio includes a powerful theme system for managing multiple design themes:

#### **Available Themes**

1. **Vintage Theme** - Classic retro aesthetic
   - Vintage colors with CRT screen effects
   - Paper-like cards with textures
   - Terminal-style glow effects
   - Default theme

2. **Neobrutalism Theme** - Bold, raw design
   - High contrast with thick borders
   - Drop shadow effects for depth
   - Bold, uppercase typography
   - Geometric shapes

#### **Switching Themes**

- **Admin Panel**: Go to Dashboard → Theme tab → Select theme
- **Code**: Use `ThemeSwitcher` component anywhere in your app
- **Programmatically**: Import and use `useTheme()` hook

#### **Adding New Themes**

See `guide/THEME_SYSTEM.md` for detailed instructions on:
- Creating theme configuration
- Defining CSS variables
- Adding theme-specific styles
- Maintaining themes

**Quick reference:**

```typescript
import { getTheme, applyThemeVariables } from "@/styles/themes";

// Get theme information
const theme = getTheme("neobrutalism");

// Apply theme
applyThemeVariables("neobrutalism", isDarkMode);
```

### **Colors & Themes**

Edit `tailwind.config.js` and `globals.css` to customize:

- Color schemes
- Dark/light mode colors
- Font families
- Animations

### **Content**

Update personal information in:

- `src/app/page.tsx` - Homepage content
- `src/app/components/` - Individual components
- `public/` - Images and resume

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🚀 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Other Platforms**

The app can be deployed to any platform supporting Next.js:

- Netlify
- AWS Amplify
- Railway
- Docker

### **Build for Production**

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## � Documentation

Comprehensive guides available in the `guide/` folder:

### **Theme System Documentation**

- **[THEME_SYSTEM.md](./guide/THEME_SYSTEM.md)** - Complete theme system guide
  - Architecture and how themes work
  - Adding new themes step-by-step
  - CSS variable system
  - Best practices
  - Troubleshooting

- **[NEOBRUTALISM_THEME.md](./guide/NEOBRUTALISM_THEME.md)** - Neobrutalism theme details
  - Design principles and characteristics
  - Component styling
  - Accessibility considerations
  - Customization examples
  - Migration guide

- **[THEME_QUICK_REF.md](./guide/THEME_QUICK_REF.md)** - Quick reference guide
  - Common tasks and code snippets
  - CSS variables reference
  - Adding new theme checklist
  - File locations

### **Admin System Documentation**

- **[ADMIN_SETUP.md](./guide/ADMIN_SETUP.md)** - Complete admin setup guide
- **[ADMIN_VISUAL_GUIDE.md](./guide/ADMIN_VISUAL_GUIDE.md)** - UI walkthroughs
- **[DOCS_INDEX.md](./guide/DOCS_INDEX.md)** - Complete documentation index

### **Getting Started**

- **[START_HERE.md](./guide/START_HERE.md)** - Overview and introduction
- **[QUICK_START.md](./guide/QUICK_START.md)** - 5-minute setup guide

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**[Your Name]**

- Portfolio: [https://yourportfolio.com](https://yourportfolio.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [FontAwesome](https://fontawesome.com/) - Icons and fonts
- [Vercel](https://vercel.com/) - Deployment platform

---

⭐ **Star this repo if you found it helpful!**
