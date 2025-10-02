# 📋 TODO - Code Quality Improvements

## Recently Completed ✅

- [x] Fixed rate limiting bug in contact form API
- [x] Fixed contact form reactivity bug
- [x] Added input sanitization to prevent XSS attacks
- [x] Fixed all `no-explicit-any` TypeScript errors
- [x] Improved form accessibility with ARIA attributes
- [x] Fixed SVG accessibility issues
- [x] Added dynamic color mode button labels
- [x] Removed console statements from production code
- [x] Added TypeScript strict mode
- [x] Fixed all linting errors and warnings
- [x] Updated README with completed tasks
- [x] Styling consistency - converted @apply to inline Tailwind

---

## 🚨 High Priority

### Testing Infrastructure
- [ ] **Add Vitest for unit testing**
  - Install: `bun add -D vitest @vue/test-utils happy-dom`
  - Configure vitest.config.ts
  - Add test scripts to package.json
  - Target: 70%+ code coverage

- [ ] **Write critical unit tests**
  - Form validation logic (ContactForm.vue)
  - Email sanitization functions (mail.post.ts)
  - Rate limiting logic (mail.post.ts)
  - Pagination logic (writing/index.vue)
  - Animation respect for prefers-reduced-motion

- [ ] **Add E2E tests with Playwright**
  - Install: `bun add -D @playwright/test`
  - Test contact form submission flow
  - Test navigation between pages
  - Test dark mode toggle
  - Test pagination

### Performance Optimization
- [ ] **Optimize font loading**
  - Remove manual Google Fonts CDN links from app.vue
  - Configure @nuxt/fonts module in nuxt.config.ts
  - Use font subsetting for faster loading
  ```ts
  // nuxt.config.ts
  fonts: {
    families: [
      { name: 'Inter', weights: [300, 400] }
    ]
  }
  ```

- [ ] **Lazy load HomeAnimation component**
  - Only used on homepage
  - 420 lines with large SVG path data
  - Use `defineAsyncComponent` or `<Lazy>` wrapper
  ```vue
  <LazyHomeAnimation ref="animation" />
  ```

- [ ] **Implement pagination optimization**
  - Current: loads all posts upfront
  - Better: server-side pagination for large datasets
  - Add scroll-to-top behavior on page change
  - Add loading states for page transitions

### Architecture Improvements
- [ ] **Create reusable composables**
  - `useContactForm` - Extract form logic from ContactForm.vue
  - `usePagination` - Reusable pagination logic
  - `useFormValidation` - Generic validation logic
  - Move to `composables/` directory

- [ ] **Add error boundaries**
  - Create ErrorBoundary.vue component
  - Wrap critical sections
  - Graceful degradation in production
  - Log errors to monitoring service

---

## ⚠️ Medium Priority

### Code Organization
- [ ] **Refactor HomeAnimation component**
  - Extract SVG path data to separate const/JSON file
  - Split animation logic into composable
  - Reduce component size (currently 420 lines)
  - Improve testability

- [ ] **Create constants file**
  - Create `constants.ts` for magic numbers
  - Define pagination defaults
  - Define validation limits
  - Define rate limiting values

- [ ] **Add API response types**
  - Define shared types for API responses
  - Create `types/api.ts`
  ```ts
  export interface ApiResponse<T = void> {
    success: boolean;
    data?: T;
    error?: string;
  }
  ```

- [ ] **Extract validation logic**
  - Move email regex to constants
  - Create validation utilities
  - Make validation functions testable

### Layout Improvements
- [ ] **Convert layout @apply to inline Tailwind**
  - File: `layouts/default.vue`
  - Currently has 3 instances of @apply
  - Maintain prose overrides for code blocks and headings

### Configuration
- [ ] **Add environment variable validation**
  - Use Nuxt runtime config
  - Validate required env vars on startup
  - Provide helpful error messages
  ```ts
  // nuxt.config.ts
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    mailFrom: process.env.MAIL_FROM || '',
    mailTo: process.env.MAIL_TO || '',
  }
  ```

- [ ] **Improve email validation**
  - Current regex is complex and potentially buggy
  - Consider using a validation library
  - Or use simpler, more robust regex

### Documentation
- [ ] **Add JSDoc comments**
  - Document complex functions in HomeAnimation.vue
  - Document validation functions in mail.post.ts
  - Document composables when created
  - Document complex computed properties

- [ ] **Improve component prop documentation**
  ```ts
  interface Props {
    /** The path to navigate to, or undefined to go back in history */
    to?: string;
  }
  ```

---

## 📝 Low Priority

### User Experience
- [ ] **Add loading states**
  - Skeleton loaders for async data
  - Loading indicators for form submission
  - Loading states for page navigation
  - Spinner components

- [ ] **Add PWA support**
  - Install @vite-pwa/nuxt module
  - Add service worker
  - Enable offline support
  - Add install prompt

- [ ] **Add animation controls**
  - Visible skip/reduce animation button
  - Don't rely only on prefers-reduced-motion
  - User preference persistence

### DevOps & CI/CD
- [ ] **Set up Dependabot**
  - Create `.github/dependabot.yml`
  - Configure for npm dependencies
  - Set update schedule
  - Auto-merge patch updates

- [ ] **Add pre-commit hooks**
  - Install husky and lint-staged
  - Run linting on staged files
  - Run type checking
  - Run tests
  ```json
  "lint-staged": {
    "*.{vue,ts,js}": ["eslint --fix", "prettier --write"]
  }
  ```

- [ ] **Add branch-based deployments**
  - Current: deploys on every push to any branch
  - Better: main→production, develop→staging
  - Add branch protection rules
  - Require PR reviews

- [ ] **Add secret scanning**
  - Use GitHub secret scanning
  - Add git-secrets or similar tool
  - Prevent accidental credential commits

- [ ] **Add health check endpoint**
  - Create `/api/health` endpoint
  - Return basic status and version
  - Use for monitoring/alerting

### Security
- [ ] **Add CSRF protection**
  - While honeypot and rate limiting help
  - Consider adding CSRF tokens
  - Or use SameSite cookies

- [ ] **Add CSP headers**
  - Configure Content Security Policy
  - Restrict inline scripts
  - Add nonce for required inline scripts

- [ ] **Add rate limiting to more endpoints**
  - Currently only contact form has rate limiting
  - Add to other API endpoints if added
  - Consider IP-based and user-based limits

### Code Quality
- [ ] **Add type tests**
  - Install tsd for type-level testing
  - Test complex type definitions
  - Ensure type safety in edge cases

- [ ] **Add visual regression testing**
  - Use Percy or Chromatic
  - Test animations don't break
  - Test responsive layouts
  - Test dark mode

- [ ] **Audit and optimize CSS**
  - Check for unused CSS variables
  - Ensure consistent dark mode implementation
  - Verify dark mode class strategy matches Nuxt Color Mode

### Content Management
- [ ] **Add content validation**
  - Validate markdown frontmatter
  - Ensure required fields present
  - Add schema validation for blog posts

- [ ] **Add content preview**
  - Preview unpublished posts
  - Draft mode for content
  - Preview deploy for content changes

---

## 🎯 Future Enhancements

### Features
- [ ] **Add search functionality**
  - Search blog posts
  - Full-text search
  - Use Nuxt Content search

- [ ] **Add RSS feed**
  - For blog posts
  - Use @nuxtjs/feed-module

- [ ] **Add reading time estimates**
  - Calculate from content
  - Display on post cards

- [ ] **Add tags page**
  - List all tags
  - Show post count per tag
  - Filter by multiple tags

- [ ] **Add comments system**
  - Consider GitHub Discussions
  - Or utterances
  - Or giscus

### Analytics & Monitoring
- [ ] **Add analytics**
  - Privacy-friendly analytics
  - Consider Plausible or Fathom
  - Track page views, not users

- [ ] **Add error monitoring**
  - Sentry or similar
  - Track client and server errors
  - Set up alerts

- [ ] **Add performance monitoring**
  - Core Web Vitals tracking
  - Performance budgets
  - Lighthouse CI

### SEO
- [ ] **Add sitemap generation**
  - Auto-generate from content
  - Include blog posts
  - Submit to search engines

- [ ] **Add structured data**
  - JSON-LD for articles
  - Organization schema
  - Breadcrumb schema

- [ ] **Optimize meta tags**
  - Review all pages
  - Add Open Graph images
  - Add Twitter cards

---

## 📊 Metrics & Goals

### Code Quality Metrics
- [x] ~~Linting: 0 errors, 0 warnings~~ ✅
- [x] ~~TypeScript strict mode enabled~~ ✅
- [ ] Test coverage: >70%
- [ ] Bundle size: <500KB gzip
- [ ] Lighthouse score: >95

### Performance Goals
- [ ] First Contentful Paint: <1.5s
- [ ] Time to Interactive: <3s
- [ ] Cumulative Layout Shift: <0.1

### Accessibility Goals
- [ ] WCAG 2.1 AA compliance
- [ ] Lighthouse accessibility: 100
- [ ] Keyboard navigation: 100%

---

## 🔄 Regular Maintenance

### Weekly
- [ ] Review dependabot PRs
- [ ] Check for security alerts
- [ ] Review analytics (when added)

### Monthly
- [ ] Update dependencies
- [ ] Review and update content
- [ ] Check broken links
- [ ] Review performance metrics

### Quarterly
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Accessibility audit
- [ ] Code quality review

---

## 📚 Resources & Documentation

### Useful Links
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Nuxt Content](https://content.nuxt.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)

### Internal Documentation Needed
- [ ] Architecture decision records (ADRs)
- [ ] Component documentation
- [ ] API documentation
- [ ] Deployment guide
- [ ] Contributing guide

---

_Last updated: 2025-01-02_
_Generated after completing quick wins and adding TypeScript strict mode_
