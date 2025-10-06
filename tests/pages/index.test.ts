// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

const mockHome = {
  title: 'Phil Picton - Developer',
  description: 'Welcome to my portfolio',
  body: { type: 'root', children: [] }
}

mockNuxtImport('useAsyncData', () => {
  return () => ({
    data: ref(mockHome),
    pending: ref(false),
    error: ref(null),
    refresh: () => {}
  })
})

describe('Index Page', () => {
  it('renders HomeAnimation component', async () => {
    const wrapper = await mountSuspended(IndexPage, {
      route: '/',
      global: {
        stubs: {
          ContentRenderer: {
            template: '<div class="content-renderer-stub" data-testid="content-renderer"><slot /></div>',
          },
          HomeAnimation: {
            template: '<div class="home-animation-stub" />',
          },
        },
      },
    })
    
    expect(wrapper.find('.home-animation-stub').exists()).toBe(true)
  })

  it('renders ContentRenderer when home data exists', async () => {
    const wrapper = await mountSuspended(IndexPage, {
      route: '/',
      global: {
        stubs: {
          ContentRenderer: {
            template: '<div class="content-renderer-stub" data-testid="content-renderer"><slot /></div>',
          },
          HomeAnimation: {
            template: '<div class="home-animation-stub" />',
          },
        },
      },
    })
    
    // Check if the ContentRenderer stub is present
    expect(wrapper.find('[data-testid="content-renderer"]').exists()).toBe(true)
  })
})
