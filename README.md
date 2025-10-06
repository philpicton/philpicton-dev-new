# Phil Picton - Personal Website

[![CI](https://github.com/philpicton/philpicton-dev-new/actions/workflows/ci.yml/badge.svg)](https://github.com/philpicton/philpicton-dev-new/actions/workflows/ci.yml)
[![Deploy to NuxtHub](https://github.com/philpicton/philpicton-dev-new/actions/workflows/nuxthub.yml/badge.svg)](https://github.com/philpicton/philpicton-dev-new/actions/workflows/nuxthub.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Nuxt](https://img.shields.io/badge/Nuxt-3.0-00DC82?logo=nuxt.js)](https://nuxt.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, performant personal website built with Nuxt 3, featuring a blog, portfolio, and contact form. Deployed on Cloudflare Workers via NuxtHub.

## Features

### Core Technologies

- **Nuxt 3** - Vue 3 framework with server-side rendering
- **Bun** - Fast JavaScript runtime and package manager
- **Tailwind CSS v4** - Utility-first CSS framework
- **Nuxt Content** - Markdown-powered content management
- **TypeScript** - Full type safety with strict mode
- **GSAP** - Professional-grade animation library

### Content Management

- Markdown-powered blog posts and pages
- Tag system for content categorization
- Syntax highlighting with GitHub Dark theme
- Responsive, mobile-first design

### Contact Form

- Email delivery via Resend API
- Honeypot anti-spam protection
- Rate limiting with Cloudflare KV
- Input sanitization and XSS prevention
- Serverless backend on Cloudflare Workers

### Developer Experience

- ESLint and Prettier for code quality
- Nuxt DevTools for debugging
- Dark mode support
- Self-hosted font optimization
- Automated image optimization

### CI/CD & Quality Assurance

- Automated linting, formatting, and type checking
- Unit test suite
- Dependabot with auto-merge for safe updates
- Weekly security vulnerability audits
- Branch protection with required status checks
- Automated deployment pipeline

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- GitHub account for deployment
- [NuxtHub](https://hub.nuxt.com/) account for hosting

### Installation

```bash
# Clone the repository
git clone https://github.com/philpicton/philpicton-dev-new.git
cd philpicton-dev-new

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
bun run dev
```

Visit `http://localhost:3000`

## Environment Variables

Create a `.env` file with the following:

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

## Development

### Available Commands

```bash
# Development
bun run dev              # Start development server
bun run preview          # Preview production build locally

# Testing
bun run test             # Run unit tests in watch mode
bun run test -- --run    # Run tests once (CI mode)

# Code Quality
bun run lint             # Run ESLint
bun run format           # Format code with Prettier
bun run format:check     # Check formatting
bun run typecheck        # TypeScript type checking
bun run check            # Run all quality checks

# Building
bun run build            # Build for production
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
│   ├── workflows/       # CI/CD pipelines
│   ├── dependabot.yml   # Dependency updates
│   └── *.md             # Setup documentation
├── assets/
│   └── css/             # Global styles
├── components/          # Vue components
├── content/             # Markdown content
│   └── writing/         # Blog posts
├── layouts/             # Page layouts
├── pages/               # File-based routing
├── public/              # Static assets
├── server/
│   └── api/             # Serverless API routes
├── tests/               # Unit test suite
│   ├── components/      # Component tests
│   └── pages/           # Page tests
├── types/               # TypeScript definitions
└── nuxt.config.ts       # Nuxt configuration
```

### Testing

The project includes a comprehensive test suite using Vitest:

- **Unit tests** covering components and pages
- Automatic execution in CI/CD pipelines
- Tests block merges and deployments if failing
- Run tests locally before pushing changes

```bash
# Run all tests
bun run test

# Run specific test file
bun run test -- BackButton.test.ts

# Run tests in CI mode
bun run test -- --run
```

### Adding Content

**Create a Blog Post:**

```bash
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

**Create a Page:**

```bash
touch pages/my-page.vue
```

## Deployment

### Automated Deployment

Every push to the repository triggers:

1. Quality checks (lint, format, typecheck)
2. Unit test execution
3. Build verification
4. Preview deployment to NuxtHub/Cloudflare

Push to `main` branch deploys to production.

### Manual Deployment

```bash
# Build the project
bun run build

# Deploy to NuxtHub
npx nuxthub deploy

# Deploy preview
npx nuxthub preview
```

### Initial Setup

1. **Create NuxtHub Project**
   - Visit [hub.nuxt.com](https://hub.nuxt.com)
   - Create new project and link Cloudflare account
   - Set up environment vars for production in hub settings

2. **Configure GitHub Secrets**
   - Go to Repository → Settings → Secrets → Actions
   - Add `NUXTHUB_TOKEN` from hub.nuxt.com

3. **Configure Repository Settings**
   - See `.github/GITHUB_SETTINGS.md` for detailed instructions
   - Enable branch protection with required status checks
   - Enable Dependabot for dependency updates
   - Configure Actions permissions (read/write)

## Security

### Branch Protection

- Require pull request reviews (configurable)
- Require status checks to pass (lint, test, typecheck, build)
- Block direct pushes to main
- Prevent force pushes and branch deletion

### Automated Security Measures

- Dependabot for automated dependency updates
- Weekly security vulnerability audits
- Automated vulnerability alerts
- Auto-merge for safe patch and minor updates
- Unit tests prevent broken code from reaching production

### Contact Form Security

- Honeypot field for bot prevention
- Client-side validation
- Server-side rate limiting via Cloudflare KV
- Input sanitization
- XSS prevention
- RFC 5322 email validation

## Technology Stack

| Category      | Technology                   |
| ------------- | ---------------------------- |
| **Framework** | Nuxt 3, Vue 3                |
| **Runtime**   | Bun                          |
| **Styling**   | Tailwind CSS v4              |
| **Content**   | Nuxt Content (Markdown)      |
| **Animation** | GSAP, SVG, CSS               |
| **Language**  | TypeScript (strict mode)     |
| **Testing**   | Vitest                       |
| **Linting**   | ESLint, Prettier             |
| **Hosting**   | Cloudflare Workers (NuxtHub) |
| **Database**  | Cloudflare D1 (NuxtHub)      |
| **KV Store**  | Cloudflare KV                |
| **Email**     | Resend API                   |
| **CI/CD**     | GitHub Actions               |

## Documentation

- [GitHub Settings Guide](.github/GITHUB_SETTINGS.md) - Complete repository setup
- [Quick Reference](.github/SETTINGS_QUICK_REFERENCE.md) - Fast setup guide
- [Dependabot Guide](.github/DEPENDABOT.md) - Dependency management

## Contributing

This is a personal project, but contributions and forks are welcome. Feel free to use this as a template for your own site.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Phil Picton**

- Website: [philpicton.dev](https://philpicton.dev)
- GitHub: [@philpicton](https://github.com/philpicton)

---

Built with ❤️ using Nuxt 3 and deployed on Cloudflare Workers
