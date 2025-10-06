---
title: "My Tech Stack and Coding Skillset"
description: "A big list of jargon and tech I use and have experience with."
date: "2025-09-19" #YYYY-MM-DD
tags: ["tech-stack", "skillset"]
---

I've put this list onto its own page, as no-one wants to read long lists of jargon. But you may be curious, or need to check whether I am experienced with a particular paradigm.

See my [dotfiles](https://github.com/philpicton/dotfiles) repo on GitHub for configurations. The branches `new-personal` and `work-macos` have the most up to date configs.

**tldr;** Senior level frontend developer and computer geek.

## Section 1 - Stuff I use and recommend

### Computer Operating systems

**Daily driver and work machine:** MacOs with [Rectangle]() window manager and [Alfred]()

**Preferred dev environment:** [Arch linux](https://wiki.archlinux.org/title/Arch_Linux) with [Hyprland](https://hypr.land) window manager and the [ML4W configuration](https://github.com/mylinuxforwork/hyprland-starter)

**Can use if really necessary:** Windows 10/11👎

**Mobile**: iOS

---

### Code Editor

#### Daily driver and preferred editor

Neovim with my own customisations and using the [LazyVim](https://www.lazyvim.org) distro

#### Before that

VSCode, Sublime Text

#### Can use if necessary

JetBrains IDEs

#### Theme

[Catppuccin Mocha](https://catppuccin.com), [NightOwl](https://github.com/sdras/night-owl-vscode-theme), [Fira Code Font](https://github.com/tonsky/FiraCode).

---

### Keyboard

#### Daily drivers

- Self built [Corne Cherry v2](https://github.com/foostan/crkbd/blob/main/docs/corne-cherry/v2/buildguide_en.md) ergonomic keyboard with my own querty keymap.
- [Keychron K2 mechanical](https://www.keychron.com/products/keychron-k2-wireless-mechanical-keyboard)

---

### Other Peripherals

- [LogiTech MX Master](https://www.logitech.com/en-gb/mx/master-series.html)
- [Sony WM-1000X M3](https://www.sony.co.uk/electronics/headband-headphones/wh-1000xm3/buy/wh1000xm3s.ce7?dtlinfo=wtb|product_tech_specs:wh-1000xm3) headphones

---

### LLMs (aka AI)

For security reasons, my current employer does not allow us to use cloud based coding agents/LLMs, so for work I use [Ollama](https://ollama.com) to run local models for some coding tasks. I use the [gen.nvim](https://github.com/David-Kunz/gen.nvim) Neovim plugin to interact with the models from my editor.
Current choices: Mistral or Deepseek-Coder (very resource heavy).

For other projects I use Copilot and Copilot chat in Neovim (currently with Claude Sonnet 4.5), the [Github Copilot CLI](https://github.com/github/copilot-cli), and run experiments with [GitHib spec-kit](https://github.com/github/spec-kit).
I was an early adopter of the [Warp](https://www.warp.dev) terminal, and participated in beta testing.

I should state at this point that I am very aware of the limitations of, and pitfalls associated with, LLM-based coding tools, and the importance of taking responsibility for all the code shipped. Knowledge and application of sound engineering principles is still vital for serious software projects.

---

### CLI / Terminal

I use Zsh in [kitty](https://sw.kovidgoyal.net/kitty/) as my go-to terminal, and do all of my coding and work there, including writing documents using the Obsidian Neovim plugin. For my config, see my dotfiles.
Other terminal (TUI) apps I use include [Yazi](https://github.com/sxyazi/yazi), [fzf](https://github.com/junegunn/fzf), [LazyGit](https://github.com/jesseduffield/lazygit), [LazyDocker](https://github.com/jesseduffield/lazydocker), [Starship](https://starship.rs) to show git status in the prompt, [Zsh auto suggestions](https://github.com/zsh-users/zsh-autosuggestions), [Zsh auto-complete](https://github.com/marlonrichert/zsh-autocomplete), and [Zsh syntax highlighting](https://github.com/zsh-users/zsh-syntax-highlighting).
Package managers- I use [HomeBrew](https://brew.sh) on Mac, and [Yay](https://github.com/Jguer/yay) in Arch

---

## Section 2 - Tech Experience/Skillset

Now we come to a big old list of jargon. Everything I list here I have worked with in a professional setting, for a decent amount of time. NB - this list might not be exhaustive, it's just everything I can think of!

### Graphics/Documents

Adobe Photoshop, Illustrator, Gimp, Inkscape, Figma

Obsidian, LibreOffice, NextCloud, MS Office, Confluence

---

### Developer tooling / Devops

Git, GitHub, GH Actions, BitBucket Pipelines, Jira, Trello, Docker, CI/CD, AWS, Lambda, TurboRepo, Cloudflare functions, TailScale, Slack, NuxtHub, Vercel, Netlify, Cloudways

---

### Frontend-ish ecosystem

**Code**
HTML, CSS, JavaScript ES6, JQuery, Vue, TypeScript, React, Nuxt, Vite, Vitest, Jest, Vue Test Utils, Webpack, Gulp, Sass, Less, PostCSS, Tailwind, ESLint, StyleLint, Prettier, Biome, Bun, REST, GraphQL, NPM, Jest, PNPM, Vuetify, BootStrap, GSAP GreenSock, KRPano, HTML Email template development

**Browsers**
All of them! Device testing via BrowserStack and emulators. Website performance optimisation, conversion optimisation, SEO, analytics, Sentry, MS Clarity

---

### Backend-ish ecosystem

Node.js, Express, Nitro, PHP, Laravel, Twig, Blade, WordPress, WooCommerce, Strapi, GraphQL, Python, Go, Redis, MongoDB, Cloudflare workers KV, Firebase, SupaBase
