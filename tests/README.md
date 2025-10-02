# Testing

This directory contains tests for this Nuxt application using `@nuxt/test-utils` with Vitest.

## Test Structure

```
tests/
├── components/     # Component unit tests
├── pages/          # Page tests
└── composables/    # Composable tests (future)
```

## Running Tests

```bash
# Run all tests in watch mode
bun run test

# Run all tests once
bun run test run

# Run tests with UI
bun run test:ui
```

## Important Setup Notes

### Nuxt Config

The `nuxt.config.ts` file must explicitly import `defineNuxtConfig` for test compatibility:

```typescript
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // config
});
```

### Test Environment

All tests that use Nuxt features (components, composables, etc.) must specify the Nuxt environment:

```typescript
// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
```

## Writing Tests

### Component Tests

Component tests use `mountSuspended` from `@nuxt/test-utils/runtime` to mount components in a Nuxt environment.

```typescript
// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import MyComponent from "~/components/MyComponent.vue";

describe("MyComponent", () => {
  it("renders correctly", async () => {
    const wrapper = await mountSuspended(MyComponent, {
      props: {
        title: "Test Title",
      },
    });

    expect(wrapper.text()).toContain("Test Title");
  });
});
```

### Path Aliases

The `~` and `@` aliases are configured to point to the project root:

- `~/components/MyComponent.vue` ✅
- `@/components/MyComponent.vue` ✅

## Troubleshooting

### If tests fail to run

1. **Clean install**: Remove `node_modules` and reinstall

   ```bash
   rm -rf node_modules && bun install
   ```

2. **Regenerate Nuxt types**:

   ```bash
   bun run postinstall
   ```

3. **Check for `defineNuxtConfig` import**: Ensure `nuxt.config.ts` explicitly imports it

## Documentation

- [Nuxt Testing Documentation](https://nuxt.com/docs/getting-started/testing)
- [@nuxt/test-utils](https://github.com/nuxt/test-utils)
- [Vitest](https://vitest.dev/)

### Page Tests (E2E with $fetch)

Page tests can use `$fetch` to test server-rendered content:

```typescript
// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

describe("My Page", async () => {
  await setup({
    // test context options
  });

  it("renders page content", async () => {
    const html = await $fetch("/my-page");
    expect(html).toContain("Expected Content");
  });
});
```

### Browser Tests

Browser tests use Playwright to test in a real browser:

```typescript
// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { setup, createPage } from "@nuxt/test-utils/e2e";

describe("Interactive Features", async () => {
  await setup({
    browser: true,
  });

  it("handles user interaction", async () => {
    const page = await createPage("/my-page");

    await page.click("button");
    await expect(page.locator(".result")).toBeVisible();

    await page.close();
  });
});
```
