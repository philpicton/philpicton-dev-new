---
title: "Portfolio and personal website"
description: "An opportunity to show off frontend chops"
thumbnail: "/images/projects/philpicton-thumb.jpg"
heroImage: "/images/projects/philpicton-hero-lol.jpg"
tech: ["Nuxt", "Typescript", "Vue", "Vitest", "GSAP", "Tailwind"]
date: "2025"
---

## Overview

In today's world, employers want you to show them what you can do, a CV just isn't enough. So this website has had a recent uplift, after being neglected and semi broken for a year or two.
I've added various enterprise level features, and expanded the content. It is still a work in progress, I want to do the following:

- Browser UI testing
- disable all UI animations when user has `prefers reduced motion`
- Login area
- CSRF tokens
- Extract hard coded colours into theme vars
- Upgrade to Nuxt 4. (I haven't done this yet as I recall upgrading from v2 to v3 beta was not fun!)
- Write some new blog posts
- Fork and create a template version for others to use

## Features

- Markdown powered content, all the pages and content are simple Markdown files, updating the site is as simple as editing a file, committing and pushing.
- CI/CD via GitHub Actions to NuxtHub / Cloudflare workers
- Server side rendered on the edge, so its fast
- Contact form with anti-spam and rate limiting, sending messages to an API endpoint which sends out via Resend
- Server and Client side validation
- Unit test suite and code quality checks in CI/CD pipelines and PRs
- Fully typesafe in strict mode
- Optimised images
- SVG animations
- Dark/Light mode switch with OS detection and localstorage
- Nuxt devtools and Sourcemaps

## Stack

- Nuxt 3
- Bun
- Vitest & Nuxt test utils
- GSAP
- SVG
- Tailwind CSS
- GitHub Actions
- Typescript
- ESLint
- Prettier
- Nuxt Content, Icons, Images, Fonts
- Cloudflare KV store
- Nuxthub
