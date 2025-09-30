---
title: "My Tech Stack and Coding Skillset"
description: "A big list of jargon and tech I use and have experience with."
date: "2025-09-19" #YYYY-MM-DD
tags: ["tech-stack", "skillset"]
---

I've put this list onto its own page, as no-one wants to read long lists of jargon. But you may be curious, or need to check whether I am experienced with a particular paradigm.

See my [dotfiles](https://github.com/philpicton/dotfiles) repo on GitHub for configurations. The branches [new-personal] and [work-macos] have the most up to date configs.

**tldr;** Senior level frontend developer and computer geek.

## Section 1 - Stuff I use and recommend

### Computer Operating systems

**Daily driver and work machine:** MacOs Sequoia with [Rectangle]() window manager and [Alfred]()

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

I should state at this point that I am very aware of the limitations of, and pitfalls associated with, LLM-based coding tools. At best they are a tool to help you think through a problem, and generate boilerplate or scaffold something. I do not think that heavy reliance on these tools leads to good code, radically better productivity, or personal growth. Current LLMs do not think, or understand. Yet! They are statistics engines tuned to answer the question 'What would a human response to this next question look like, statistically?'. They generate answers based on text/code already written and scraped from the internet.

I think that the huge investments that have been made into this technology are at risk, as there is not as yet a solid business plan to monetise it to the necessary degree. Until high levels of accuracy can be relied upon, I and others will be reluctant to pay good money.

That said, I do not want to be left behind if a big breakthrough occurs. So I do use LLM tools whenever I think they will help. Generating unit tests is a great example.

For security reasons, my current employer does not allow us to use cloud based coding agents/LLMs, so for work I use Ollama to run local models for coding tasks. I use the [gen.nvim](https://github.com/David-Kunz/gen.nvim) Neovim plugin to interact with the models from my editor.
Current choices: Mistral or Deepseek-Coder (very resource heavy).

I use ChatGPT for other prompts.

For personal projects I use Copilot and Copilot chat in Neovim, and am experimenting with other agents and models.

I recently came across the concept of _[spec driven development](https://github.com/github/spec-kit)_, which is fascinating, sort of a machine-readable version of Documentation Driven Development. It relies on the ability of coding agents to produce working code. The code becomes secondary, and the spec is the source of truth. New requirements are added to the spec, and the code is generated/updated. Very interesting, and something I will be exploring more, particularly how to avoid architecting a monstrously complex spec, and creating '**spec debt**'! Or how to ensure that the spec itself follows best engineering practices.

---

### CLI / Terminal

I use Zsh in [kitty](https://sw.kovidgoyal.net/kitty/) as my go-to terminal, and do all of my coding and work there, including writing documents using the Obsidian Neovim plugin. For my config, see my dotfiles.
Other terminal (TUI) apps I use include Yazi, fzf, LazyGit, LazyDocker, Starship to show git status in the prompt, Zsh auto suggestions, Zsh auto-complete, and Zsh syntax highlighting.
Package managers- I use HomeBrew on Mac, and Yay in Arch

---

## Section 2 - Tech Experience/Skillset

Now we come to a big old list of jargon. Everything I list here I have worked with in a professional setting, for a decent amount of time. In some of the things I have a senior engineer level of expertise, particularly frontend tech. NB - this list might not be exhaustive, it's just everything I can think of!

### Graphics/Documents

Adobe Photoshop, Illustrator, Gimp, Inkscape, Figma

Obsidian, LibreOffice, NextCloud, MS Office, Confluence

---

### Developer tooling / Devops

Git, GitHub, BitBucket, Jira, Trello, Docker, CI/CD, AWS, Lambda, TurboRepo, Cloudflare functions, TailScale, Slack

---

### Frontend-ish ecosystem

**Code**
HTML, CSS, JavaScript ES6, JQuery, Vue, TypeScript, React, Nuxt, Vite, Vitest, Jest, Vue Test Utils, Webpack, Gulp, Sass, Less, PostCSS, Tailwind, ESLint, StyleLint, Prettier, Biome, Bun, REST, GraphQL, NPM, Jest, PNPM, Vuetify, BootStrap, GSAP GreenSock, KRPano, HTML Email template development

**Browsers**
All of them! Well, the latest versions of all the major ones anyway. Chrome, Edge, Safari, Firefox plus mobile browsers on iOS and Android via BrowserStack for testing.

---

### Backend-ish ecosystem

Node.js, Express, Nitro, PHP, Laravel, Twig, Blade, WordPress, WooCommerce, Strapi, GraphQL, Python, Go, Redis, MongoDB, Cloudflare workers KV, Firebase, SupaBase
