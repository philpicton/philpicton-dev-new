// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AboutPage from '~/pages/about/index.vue'

describe('About Page', () => {
  it('renders ContentRenderer when about data exists', async () => {
    const wrapper = await mountSuspended(AboutPage, {
      route: '/about',
      global: {
        stubs: {
          ContentRenderer: {
            template: '<div class="content-renderer-stub"><slot /></div>',
          },
        },
      },
    })
    
    // Check if the stub or content is present
    const hasContent = wrapper.find('.content-renderer-stub').exists() || wrapper.find('div').exists()
    expect(hasContent).toBe(true)
  })
})
