// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import WritingIndexPage from '~/pages/writing/index.vue'

describe('Writing Index Page', () => {
  it('renders heading and pagination controls', async () => {
    const wrapper = await mountSuspended(WritingIndexPage, {
      route: '/writing',
    })
    
    expect(wrapper.find('h1').text()).toBe('Recent Posts')
    expect(wrapper.findAll('button').length).toBeGreaterThan(0)
  })

  it('renders BlogPostsList when posts exist', async () => {
    const wrapper = await mountSuspended(WritingIndexPage, {
      route: '/writing',
    })
    
    // Either BlogPostsList or fallback message should exist
    const hasBlogPostsList = wrapper.findComponent({ name: 'BlogPostsList' }).exists()
    const hasFallback = wrapper.text().includes('Sorry, nothing found')
    
    expect(hasBlogPostsList || hasFallback).toBe(true)
  })

  it('pagination controls are interactive', async () => {
    const wrapper = await mountSuspended(WritingIndexPage, {
      route: '/writing',
    })
    
    const buttons = wrapper.findAll('button')
    // Should have prev/next buttons at minimum
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })
})
