// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import WritingTagPage from '~/pages/writing/tag/[slug].vue'

describe('Writing Tag Page', () => {
  it('renders heading with tag name', async () => {
    const wrapper = await mountSuspended(WritingTagPage, {
      route: '/writing/tag/vue',
    })
    
    expect(wrapper.find('h1').text()).toContain('Posts tagged with')
  })

  it('renders BackButton component', async () => {
    const wrapper = await mountSuspended(WritingTagPage, {
      route: '/writing/tag/vue',
    })
    
    expect(wrapper.findComponent({ name: 'BackButton' }).exists()).toBe(true)
  })

  it('renders list of posts when posts exist', async () => {
    const wrapper = await mountSuspended(WritingTagPage, {
      route: '/writing/tag/vue',
    })
    
    expect(wrapper.find('ul').exists()).toBe(true)
  })
})
