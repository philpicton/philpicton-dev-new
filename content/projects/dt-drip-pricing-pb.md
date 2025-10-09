---
title: "Drip Pricing Compliance"
description: "Implementing complex changes to the customer-facing product to display dynamic surcharges"
thumbnail: "/images/projects/drip-pricing-thumb.jpg"
heroImage: "/images/projects/drip-pricing-hero.jpg"
tech: ["JS", "PHP", "LESS", "jQuery"]
date: "2025"
---

## Overview

I undertook a series of tasks to adapt the customer-facing website of a SAAS ticketing platform to comply fully with new Drip Pricing laws which came into effect recently. Parts of the platform did not show surcharges or delivery fees until the checkout. Due to the dynamic way that these charges can be applied the usual way that the pages are templated would not work. So I implemented a new 'Persistent bar' UI feature to show the items someone has selected, and also make ajax requests to fetch and display the dynamic surcharge info, before the items are added to the cart. This project was complicated by the legacy tech in use in this part of the platform, and the high levels of tech debt.

## Key features

- JS Class to keep the feature separate and namespaced
- Debounced ajax requests
- Reactive UI without frameworks
- Request tracking to prevent race conditions in UI updates
- Error handling
- Analytics integration
- Responsive and accessible design
- Legal compliance

## Stack

- LESS
- Javascript
- jQuery
- PHP

## Business impact

I shipped the feature (including passing peer reviews and QA testing) well before the legal deadline, preventing the company from being in legal hot water. To do so required problem solving skills, effective collaboration and good attention to detail, particularly when testing. I received good management feedback on my performance in shipping this on time.
