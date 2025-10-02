# Phil Picton - Personal Website

Modern, performant personal website built with Nuxt 3, featuring a blog, portfolio (WIP), and contact form. Deployed on Cloudflare Workers via NuxtHub.

[![Deploy to NuxtHub](https://img.shields.io/badge/Deploy-NuxtHub-00DC82?logo=nuxt.js)](https://hub.nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript)](https://www.typescriptlang.org/)

## ✨ Features

### Core

- 🚀 **Nuxt 3** - Vue 3 framework with SSR
- ⚡ **Bun** - Fast JavaScript runtime
- 🎨 **Tailwind CSS v4** - Utility-first styling
- 📝 **Nuxt Content** - Markdown-powered CMS
- 🔷 **TypeScript** - Full type safety
- 🎭 **GSAP** - Smooth animations

### Content Management

- 📄 **Markdown powered content** - Write posts and pages in markdown
- 🏷️ **Tag System** - Categorize and filter content
- 🎨 **Syntax Highlighting** - Code blocks with GitHub Dark theme
- 📱 **Responsive Design** - Mobile-first approach

### Contact Form

- 📧 **Email Integration** - Via Resend API
- 🛡️ **Anti-Spam** - Honeypot field + rate limiting
- 🔒 **Security** - Input sanitization, XSS prevention
- ⚡ **Serverless** - Cloudflare Workers backend

### Developer Experience

- 🔍 **ESLint + Prettier** - Code quality & formatting
- 🔧 **Nuxt DevTools** - Built-in debugging
- 🌗 **Dark Mode** - Theme switching
- 🔤 **Optimized Fonts** - Self-hosted via Nuxt Fonts
- 🖼️ **Image Optimization** - Nuxt Image integration

### CI/CD & Security

- ✅ **Automated Checks** - Lint, format, type check, build
- 🤖 **Dependabot** - Automated dependency updates with auto-merge
- 🔒 **Security Scanning** - Weekly vulnerability audits
- 🚫 **Branch Protection** - Quality checks before deployment
- 📊 **GitHub Actions** - Automated testing & deployment

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- GitHub account (for deployment)
- [NuxtHub](https://hub.nuxt.com/) account (for hosting)

### Installation

```bash
# Clone the repository (you should probably rename it too!)
git clone https://github.com/philpicton/philpicton-dev-new.git
cd philpicton-dev-new

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
# Edit .env with your values

# Start development server
bun run dev

# then make it your own
```

Visit `http://localhost:3000` 🎉

## 📝 Environment Variables

Create a `.env` file with:

```env
# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key
MAIL_FROM=noreply@yourdomain.com
MAIL_TO=your@email.com

# Rate Limiting
MAX_SUBMISSIONS=3
RATE_LIMIT_TTL_SECONDS=3600
```

See `.env.example`.

## 💻 Development

### Available Commands

```bash
# Development
bun run dev              # Start dev server (http://localhost:3000)

# Code Quality
bun run lint             # Run ESLint
bun run format           # Format code with Prettier
bun run format:check     # Check formatting without changes
bun run typecheck        # TypeScript type checking
bun run check            # Run all checks (lint + format + typecheck + build)

# Building
bun run build            # Build for production
bun run preview          # Preview production build locally
bun run generate         # Generate static site

# Security
bun run audit            # Check for vulnerabilities
bun run audit:fix        # Auto-fix vulnerabilities
bun run outdated         # Check for outdated packages
```

### Project Structure

```
.
├── .github/
│   ├── workflows/      # CI/CD pipelines
│   ├── dependabot.yml  # Dependency updates config
│   └── *.md            # Documentation
├── assets/
│   └── css/            # Global styles
├── components/         # Vue components
├── content/            # All content (markdown)
│   └── writing/        # Blog posts (markdown)
├── layouts/            # Page layouts
├── pages/              # File-based routing
├── public/             # Static assets
├── server/
│   └── api/            # API routes (serverless functions)
├── types/              # TypeScript definitions
└── nuxt.config.ts      # Nuxt configuration
```

### Adding Content

**Blog Post:**

```bash
# Create new markdown file
touch content/writing/my-post.md
```

```markdown
---
title: "My Post Title"
description: "Post description"
date: "2024-01-01"
tags: ["nuxt", "typescript"]
image: "/images/post.jpg"
---

Your content here...
```

**Page:**

```bash
# Create new page
touch pages/my-page.vue
```

## 🚢 Deployment

### Automated Deployment

Every push to `origin` (GitHub) triggers:

1. ✅ Quality checks (lint, format, typecheck)
2. 🏗️ Build verification
3. 🚀 Preview Deploy to NuxtHub/Cloudflare

Then make a PR to `main` for production deployment.

### Manual Deployment

```bash
# Build
bun run build

# Deploy to NuxtHub
npx nuxthub deploy

# Or preview
npx nuxthub preview
```

### First-Time Setup

1. **Create NuxtHub Project**
   - Go to [hub.nuxt.com](https://hub.nuxt.com)
   - Create new project
   - Link to your Cloudflare account

2. **Configure GitHub Secrets**

   ```
   Repository → Settings → Secrets → Actions
   Add: NUXTHUB_TOKEN (from hub.nuxt.com)
   ```

3. **Configure GitHub Settings**
   - See `.github/GITHUB_SETTINGS.md` for detailed setup
   - Enable branch protection
   - Enable Dependabot
   - Configure Actions permissions

## 🔒 Security Features

### Branch Protection

- ✅ Require PR reviews (configurable)
- ✅ Require status checks to pass
- ✅ Block force pushes
- ✅ Prevent accidental deletion

### Automated Security

- 🤖 Dependabot for dependency updates
- 🔍 Weekly security audits
- 🚨 Vulnerability alerts
- 🔄 Auto-merge safe updates (patch/minor)

### Contact Form Security

- 🍯 Honeypot field
- ⏱️ Rate limiting (Cloudflare KV)
- 🧹 Input sanitization
- 🛡️ XSS prevention
- 📧 Email validation (RFC 5322)

## 🛠️ Tech Stack

| Category      | Technology                       |
| ------------- | -------------------------------- |
| **Framework** | Nuxt 3, Vue 3                    |
| **Runtime**   | Bun                              |
| **Styling**   | Tailwind CSS v4                  |
| **Content**   | Nuxt Content (Markdown)          |
| **Animation** | GSAP                             |
| **Language**  | TypeScript (strict mode)         |
| **Linting**   | ESLint, Prettier                 |
| **Hosting**   | Cloudflare Workers (via NuxtHub) |
| **Database**  | Cloudflare D1 (via NuxtHub)      |
| **KV Store**  | Cloudflare KV (rate limiting)    |
| **Email**     | Resend API                       |
| **CI/CD**     | GitHub Actions                   |

## 📚 Documentation

- [GitHub Settings Guide](.github/GITHUB_SETTINGS.md) - Repository configuration
- [Quick Reference](.github/SETTINGS_QUICK_REFERENCE.md) - Fast setup guide
- [Dependabot Guide](DEPENDABOT.md) - Dependency management
- [Security Policy](SECURITY.md) - Vulnerability reporting

## 🤝 Contributing

This is a personal project, but feel free to fork it and customize to your needs!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Author

**Phil Picton**

- Website: [philpicton.dev](https://philpicton.dev)
- GitHub: [@philpicton](https://github.com/philpicton)

---

Built with ❤️ using Nuxt 3 and deployed on Cloudflare Workers
