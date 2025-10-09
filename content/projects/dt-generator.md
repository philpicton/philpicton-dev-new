---
title: "Backoffice CRUD pages generator"
description: "Tackling tech debt with an ambitious project to generate backoffice CMS pages from config files"
thumbnail: "/images/projects/generator-thumb.jpg"
heroImage: "/images/projects/generator-hero.jpg"
tech: ["Vue", "Vitest", "Pinia", "Typescript", "GraphQL"]
date: "2025"
---

## Overview

This project began in 2024 as a initiative to move large parts of a codebase away from a legacy Windows Vista application called PHPMaker which generated PHP code using a GUI. This was necessary as working on those affected parts of the codebase required developers to run a Windows VM and jump through various hoops to get the app to work. This tech debt was having a detrimental effect on the team's ability to ship new features.

There were so many CRUD pages in the application that simply rebuilding them as Vue3 PWAs, as we do for new features, would take years. I worked collaboratively with a colleague to implement a solution, a page generator which generates the pages from config files. Each new page is defined in the config and has a List table, and Edit and Create forms. The config files provide the app with info on the page layout which is component based. We used GraphQL to communicate with a new Laravel powered API endpoint, which acts as a data layer and interface to the main application. So the definition of each new page requires config files and GraphQL query/mutation files.

## Key features

- Fully typesafe frontend using GraphQL and Typescript
- Robust architecture using flat configs without complex nesting
- Library of re-useable UI components
- Separation of concerns, components handle additional requests
- State management
- Front end validation and reactive UI improvements
- Full unit test coverage
- Maintainability via simple semantic architecture and documentation
- Code splitting/async components ensuring no performance issues
- Code quality enforcement, security audits, typechecking and schema validation in CI/CD pipelines

## Tech stack

- Vue 3
- Typescript
- SASS
- Pinia
- Apollo GraphQL
- Vitest & Vue test utils
- Laravel Lighthouse
- Docker

## Business impact

This project is near complete and has enabled us to ship new CRUD pages in hours instead of weeks. Moving away from PHPMaker is a huge payoff of Technical Debt and will allow features to be shipped much more rapidly.
