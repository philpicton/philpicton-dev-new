# Phil Picton Dev Website

This project is a personal website, built with [Nuxt 3](https://nuxt.com).

It's adapted from a previous version which I built a few years ago. I've added a new animation and more content, though the overall design is similar. The old blog posts have been removed as they are out of date.

It uses [Bun](https://bun.sh/) as the runtime, which is a fast all-in-one JavaScript runtime. It is server side rendered.

I've used Tailwind CSS for styling, and [Nuxt Content](https://content.nuxtjs.org/) to enable markdown powered content management. I can add new blog posts and projects by simply adding markdown files to the appropriate folders.

I've used TypeScript for type safety, and [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting.

Deployments and preview builds via GitHub Actions to Nuxt Hub (an interface with Cloudflare Workers).

The contact form POSTs to an api route which is a serverless function to send emails via https.

It features anti spam measures such as a honeypot field and rate limiting via a Cloudflare KV store.

## Setup

Make sure to install dependencies:

```bash
# I'm using bun
bun install
```

Set up environment variables by creating a `.env` file in the root directory. You can refer to the `.env.example` file for the required variables.

## TODOs

- [ ] Add unit tests
- [ ] Portfolio/projects section
- [ ] More content
- [x] Styling is inconsistent, some places have inline tailwind, or @apply, or vanilla css.
- [x] Fix rate limiting bug in contact form API
- [x] Fix contact form reactivity bug
- [x] Add input sanitization to prevent XSS attacks
- [x] Improve form accessibility with ARIA attributes
- [ ] Tidy up the animation TL as its a bit verbose
- [ ] Set up dependabot

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Production

Build the application for production:

```bash
# bun
bun run build
```

Locally preview production build:

```bash
# bun
bun run preview
```

Check out the Nuxt [deployment documentation](https://nuxt.com/docs/getting-started/deployment).
Check out [NuxtHub](https://hub.nuxt.com/docs/getting-started/deploy) for more.
