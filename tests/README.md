# Testing

This directory contains focused, functional tests for this Nuxt application using `@nuxt/test-utils` with Vitest.

## Testing Philosophy

These tests are designed to:
- **Detect broken functionality** - Tests verify that components and pages work correctly
- **Be concise and readable** - Each test is minimal and tests one specific behavior
- **Avoid implementation details** - Tests don't check CSS classes, styling, or internal structure unless critical
- **Focus on user-facing behavior** - Tests verify what users see and can interact with

**What we DON'T test:**
- Styling and CSS classes (unless they affect functionality)
- Implementation details (private methods, internal state)
- Trivial things (component mounts successfully, element exists)
- Framework behavior (Nuxt/Vue internals)

## Test Structure

```
tests/
├── components/     # Component unit tests
└── pages/          # Page tests
```

## Running Tests

```bash
# Run all tests in watch mode
npm test

# Run all tests once
npm test run
```

## Writing Tests

### Component Tests

Component tests use `mountSuspended` and verify key functionality:

```typescript
// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MyComponent from '~/components/MyComponent.vue'

describe('MyComponent', () => {
  it('displays provided title and description', async () => {
    const wrapper = await mountSuspended(MyComponent, {
      props: {
        title: 'Test Title',
        description: 'Test Description',
      },
    })

    expect(wrapper.text()).toContain('Test Title')
    expect(wrapper.text()).toContain('Test Description')
  })

  it('emits event when button is clicked', async () => {
    const wrapper = await mountSuspended(MyComponent)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('submit')).toBeTruthy()
  })
})
```

### Page Tests

Page tests verify that pages render with expected content:

```typescript
// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MyPage from '~/pages/my-page.vue'

describe('My Page', () => {
  it('renders heading and main content', async () => {
    const wrapper = await mountSuspended(MyPage, {
      route: '/my-page',
    })

    expect(wrapper.find('h1').text()).toBe('Expected Heading')
    expect(wrapper.findComponent({ name: 'MyComponent' }).exists()).toBe(true)
  })
})
```

## Key Principles

1. **One assertion per concept** - Each test should verify one thing
2. **Test behavior, not implementation** - Focus on what the component does, not how
3. **Keep tests DRY but readable** - Extract common setup, but keep tests clear
4. **Use meaningful test descriptions** - Describe what is being tested, not how

## Test Environment

All tests must specify the Nuxt environment:

```typescript
// @vitest-environment nuxt
```

Path aliases work as expected:
- `~/components/MyComponent.vue` ✅
- `@/components/MyComponent.vue` ✅

## Documentation

- [Nuxt Testing Documentation](https://nuxt.com/docs/getting-started/testing)
- [@nuxt/test-utils](https://github.com/nuxt/test-utils)
- [Vitest](https://vitest.dev/)
