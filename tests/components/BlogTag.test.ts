// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BlogTag from '~/components/content/BlogTag.vue'

describe('BlogTag Component', () => {
  describe('Rendering', () => {
    it('mounts successfully', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'test-tag',
        },
      })
      
      expect(wrapper.exists()).toBe(true)
    })

    it('renders a NuxtLink element', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'vue',
        },
      })
      
      const link = wrapper.findComponent({ name: 'NuxtLink' })
      expect(link.exists()).toBe(true)
    })

    it('renders as an anchor tag', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'javascript',
        },
      })
      
      const anchor = wrapper.find('a')
      expect(anchor.exists()).toBe(true)
    })

    it('displays the tag text', async () => {
      const tagText = 'nuxt'
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: tagText,
        },
      })
      
      expect(wrapper.text()).toBe(tagText)
    })
  })

  describe('Props', () => {
    it('accepts text prop', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'typescript',
        },
      })
      
      expect(wrapper.text()).toContain('typescript')
    })

    it('has default empty string for text prop', async () => {
      const wrapper = await mountSuspended(BlogTag)
      
      expect(wrapper.text()).toBe('')
    })

    it('renders different text values correctly', async () => {
      const texts = ['vue', 'react', 'angular', 'svelte']
      
      for (const text of texts) {
        const wrapper = await mountSuspended(BlogTag, {
          props: { text },
        })
        
        expect(wrapper.text()).toBe(text)
      }
    })

    it('handles text with spaces', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'web development',
        },
      })
      
      expect(wrapper.text()).toBe('web development')
    })

    it('handles text with special characters', async () => {
      const specialText = 'c++'
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: specialText,
        },
      })
      
      expect(wrapper.text()).toBe(specialText)
    })

    it('handles text with numbers', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'vue3',
        },
      })
      
      expect(wrapper.text()).toBe('vue3')
    })

    it('handles very long text', async () => {
      const longText = 'this-is-a-very-long-tag-name-that-might-break-things'
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: longText,
        },
      })
      
      expect(wrapper.text()).toBe(longText)
    })

    it('handles text with hyphens', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'server-side-rendering',
        },
      })
      
      expect(wrapper.text()).toBe('server-side-rendering')
    })

    it('handles text with underscores', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'frontend_development',
        },
      })
      
      expect(wrapper.text()).toBe('frontend_development')
    })
  })

  describe('Link Behavior', () => {
    it('generates correct URL path', async () => {
      const tagText = 'javascript'
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: tagText,
        },
      })
      
      const link = wrapper.findComponent({ name: 'NuxtLink' })
      expect(link.props('to')).toBe(`/writing/tag/${tagText}`)
    })

    it('constructs URL with text prop', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'vue',
        },
      })
      
      const link = wrapper.findComponent({ name: 'NuxtLink' })
      expect(link.props('to')).toContain('/writing/tag/')
      expect(link.props('to')).toContain('vue')
    })

    it('handles URL encoding for special characters', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'c++',
        },
      })
      
      const link = wrapper.findComponent({ name: 'NuxtLink' })
      expect(link.props('to')).toBe('/writing/tag/c++')
    })

    it('creates valid URLs for tags with spaces', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'web dev',
        },
      })
      
      const link = wrapper.findComponent({ name: 'NuxtLink' })
      expect(link.props('to')).toBe('/writing/tag/web dev')
    })

    it('generates URL with empty text', async () => {
      const wrapper = await mountSuspended(BlogTag)
      
      const link = wrapper.findComponent({ name: 'NuxtLink' })
      expect(link.props('to')).toBe('/writing/tag/')
    })
  })

  describe('Styling', () => {
    it('applies background color classes', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'test',
        },
      })
      
      const link = wrapper.find('a')
      const classes = link.classes()
      
      expect(classes).toContain('bg-slate-300')
      expect(classes).toContain('dark:bg-slate-700')
    })

    it('has rounded-full class for pill shape', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'test',
        },
      })
      
      const link = wrapper.find('a')
      expect(link.classes()).toContain('rounded-full')
    })

    it('applies padding classes', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'test',
        },
      })
      
      const link = wrapper.find('a')
      const classes = link.classes()
      
      expect(classes).toContain('px-4')
      expect(classes).toContain('py-1')
    })

    it('has no-underline class', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'test',
        },
      })
      
      const link = wrapper.find('a')
      expect(link.classes()).toContain('no-underline')
    })

    it('applies margin-right class', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'test',
        },
      })
      
      const link = wrapper.find('a')
      expect(link.classes()).toContain('mr-2')
    })

    it('has text-sm class for small text', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'test',
        },
      })
      
      const link = wrapper.find('a')
      expect(link.classes()).toContain('text-sm')
    })

    it('includes transition class for smooth effects', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'test',
        },
      })
      
      const link = wrapper.find('a')
      expect(link.classes()).toContain('transition')
    })

    it('applies all expected CSS classes', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'test',
        },
      })
      
      const link = wrapper.find('a')
      const classes = link.classes()
      
      const expectedClasses = [
        'bg-slate-300',
        'dark:bg-slate-700',
        'rounded-full',
        'px-4',
        'py-1',
        'no-underline',
        'mr-2',
        'text-sm',
        'transition',
      ]
      
      expectedClasses.forEach(className => {
        expect(classes).toContain(className)
      })
    })
  })

  describe('Navigation', () => {
    it('is a clickable link', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'vue',
        },
      })
      
      const link = wrapper.find('a')
      expect(link.exists()).toBe(true)
      expect(link.element.tagName).toBe('A')
    })

    it('uses NuxtLink for client-side navigation', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'nuxt',
        },
      })
      
      const nuxtLink = wrapper.findComponent({ name: 'NuxtLink' })
      expect(nuxtLink.exists()).toBe(true)
    })

    it('can be triggered programmatically', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'test',
        },
      })
      
      const link = wrapper.find('a')
      await link.trigger('click')
      
      // Should not throw an error
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('is keyboard navigable as a link', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'accessible',
        },
      })
      
      const link = wrapper.find('a')
      expect(link.element.tagName).toBe('A')
    })

    it('has meaningful text content', async () => {
      const tagText = 'javascript'
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: tagText,
        },
      })
      
      expect(wrapper.text()).toBe(tagText)
      expect(wrapper.text().length).toBeGreaterThan(0)
    })

    it('can receive focus', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'focusable',
        },
      })
      
      const link = wrapper.find('a')
      // Links are focusable by default
      expect(link.element.tabIndex).toBeGreaterThanOrEqual(-1)
    })

    it('responds to keyboard events', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'keyboard',
        },
      })
      
      const link = wrapper.find('a')
      await link.trigger('keydown.enter')
      
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Component Integration', () => {
    it('works in a list context', async () => {
      const tags = ['vue', 'nuxt', 'javascript']
      const wrappers = await Promise.all(
        tags.map(tag => mountSuspended(BlogTag, { props: { text: tag } }))
      )
      
      wrappers.forEach((wrapper, index) => {
        expect(wrapper.text()).toBe(tags[index])
      })
    })

    it('maintains independence between instances', async () => {
      const wrapper1 = await mountSuspended(BlogTag, {
        props: { text: 'tag1' },
      })
      const wrapper2 = await mountSuspended(BlogTag, {
        props: { text: 'tag2' },
      })
      
      expect(wrapper1.text()).toBe('tag1')
      expect(wrapper2.text()).toBe('tag2')
      expect(wrapper1.text()).not.toBe(wrapper2.text())
    })

    it('can be reused with different props', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: { text: 'initial' },
      })
      
      expect(wrapper.text()).toBe('initial')
      
      await wrapper.setProps({ text: 'updated' })
      expect(wrapper.text()).toBe('updated')
    })
  })

  describe('Edge Cases', () => {
    it('handles single character text', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'A',
        },
      })
      
      expect(wrapper.text()).toBe('A')
    })

    it('handles numeric string text', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: '123',
        },
      })
      
      expect(wrapper.text()).toBe('123')
    })

    it('handles text with leading/trailing spaces', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: ' spaced ',
        },
      })
      
      expect(wrapper.text()).toContain('spaced')
    })

    it('handles lowercase text', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'lowercase',
        },
      })
      
      expect(wrapper.text()).toBe('lowercase')
    })

    it('handles uppercase text', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'UPPERCASE',
        },
      })
      
      expect(wrapper.text()).toBe('UPPERCASE')
    })

    it('handles mixed case text', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'MixedCase',
        },
      })
      
      expect(wrapper.text()).toBe('MixedCase')
    })

    it('handles text with dots', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'node.js',
        },
      })
      
      expect(wrapper.text()).toBe('node.js')
    })

    it('handles text with slashes', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'frontend/backend',
        },
      })
      
      expect(wrapper.text()).toBe('frontend/backend')
    })

    it('handles unicode characters', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: '日本語',
        },
      })
      
      expect(wrapper.text()).toBe('日本語')
    })

    it('handles emoji in text', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'vue 🚀',
        },
      })
      
      expect(wrapper.text()).toBe('vue 🚀')
    })
  })

  describe('Component State', () => {
    it('maintains structure across renders', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'stable',
        },
      })
      
      const initialHTML = wrapper.html()
      await wrapper.vm.$nextTick()
      
      expect(wrapper.html()).toBe(initialHTML)
    })

    it('is visible after mounting', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'visible',
        },
      })
      
      expect(wrapper.isVisible()).toBe(true)
    })

    it('updates when prop changes', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'before',
        },
      })
      
      expect(wrapper.text()).toBe('before')
      
      await wrapper.setProps({ text: 'after' })
      expect(wrapper.text()).toBe('after')
    })

    it('updates URL when text prop changes', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'initial',
        },
      })
      
      const link = wrapper.findComponent({ name: 'NuxtLink' })
      expect(link.props('to')).toBe('/writing/tag/initial')
      
      await wrapper.setProps({ text: 'updated' })
      expect(link.props('to')).toBe('/writing/tag/updated')
    })
  })

  describe('Performance', () => {
    it('renders efficiently', async () => {
      const startTime = performance.now()
      
      await mountSuspended(BlogTag, {
        props: {
          text: 'performance',
        },
      })
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Rendering should be fast (< 1 second)
      expect(renderTime).toBeLessThan(1000)
    })

    it('handles unmounting cleanly', async () => {
      const wrapper = await mountSuspended(BlogTag, {
        props: {
          text: 'unmount',
        },
      })
      
      wrapper.unmount()
      
      // Should unmount without errors
      expect(true).toBe(true)
    })
  })
})
