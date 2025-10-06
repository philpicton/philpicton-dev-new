// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

describe('Index Page', () => {
  it('renders HomeAnimation component', async () => {
    const wrapper = await mountSuspended(IndexPage, {
      route: '/',
      global: {
        stubs: {
          ContentRenderer: {
            template: '<div class="content-renderer-stub"><slot /></div>',
          },
          HomeAnimation: {
            template: '<div class="home-animation-stub" />',
          },
        },
      },
    })
    
    expect(wrapper.find('.home-animation-stub').exists()).toBe(true)
  })
})
