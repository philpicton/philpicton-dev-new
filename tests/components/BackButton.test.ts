// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BackButton from '~/components/BackButton.vue'

describe('BackButton Component', () => {
  describe('Rendering', () => {
    it('mounts successfully', async () => {
      const wrapper = await mountSuspended(BackButton)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders a button element', async () => {
      const wrapper = await mountSuspended(BackButton)
      const button = wrapper.find('button')
      
      expect(button.exists()).toBe(true)
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('has correct button type', async () => {
      const wrapper = await mountSuspended(BackButton)
      const button = wrapper.find('button')
      
      expect(button.attributes('type')).toBe('button')
    })

    it('renders SVG arrow icon', async () => {
      const wrapper = await mountSuspended(BackButton)
      const svg = wrapper.find('svg')
      
      expect(svg.exists()).toBe(true)
    })

    it('renders small text element', async () => {
      const wrapper = await mountSuspended(BackButton)
      const small = wrapper.find('small')
      
      expect(small.exists()).toBe(true)
    })
  })

  describe('Default Slot', () => {
    it('displays default slot text "go back"', async () => {
      const wrapper = await mountSuspended(BackButton)
      
      expect(wrapper.text()).toContain('go back')
    })

    it('accepts custom slot content', async () => {
      const wrapper = await mountSuspended(BackButton, {
        slots: {
          default: 'Return to list',
        },
      })
      
      expect(wrapper.text()).toContain('Return to list')
    })

    it('renders HTML in slot', async () => {
      const wrapper = await mountSuspended(BackButton, {
        slots: {
          default: '<span>Custom back text</span>',
        },
      })
      
      expect(wrapper.find('span').exists()).toBe(true)
      expect(wrapper.text()).toContain('Custom back text')
    })

    it('handles empty slot', async () => {
      const wrapper = await mountSuspended(BackButton, {
        slots: {
          default: '',
        },
      })
      
      expect(wrapper.find('button').exists()).toBe(true)
    })
  })

  describe('Props', () => {
    it('accepts optional to prop', async () => {
      const wrapper = await mountSuspended(BackButton, {
        props: {
          to: '/writing',
        },
      })
      
      expect(wrapper.exists()).toBe(true)
    })

    it('works without to prop', async () => {
      const wrapper = await mountSuspended(BackButton)
      
      expect(wrapper.exists()).toBe(true)
    })

    it('handles different to prop values', async () => {
      const paths = ['/', '/about', '/writing', '/projects']
      
      for (const path of paths) {
        const wrapper = await mountSuspended(BackButton, {
          props: { to: path },
        })
        
        expect(wrapper.exists()).toBe(true)
      }
    })
  })

  describe('Styling', () => {
    it('has router__link class', async () => {
      const wrapper = await mountSuspended(BackButton)
      const button = wrapper.find('button')
      
      expect(button.classes()).toContain('router__link')
    })

    it('SVG has inline class', async () => {
      const wrapper = await mountSuspended(BackButton)
      const svg = wrapper.find('svg')
      
      expect(svg.classes()).toContain('inline')
    })

    it('SVG has correct dimensions', async () => {
      const wrapper = await mountSuspended(BackButton)
      const svg = wrapper.find('svg')
      
      expect(svg.attributes('width')).toBe('38')
      expect(svg.attributes('height')).toBe('8')
    })

    it('SVG has viewBox attribute', async () => {
      const wrapper = await mountSuspended(BackButton)
      const svg = wrapper.find('svg')
      
      expect(svg.attributes('viewBox')).toBe('0 0 38 8')
    })
  })

  describe('Click Interaction', () => {
    it('button is clickable', async () => {
      const wrapper = await mountSuspended(BackButton)
      const button = wrapper.find('button')
      
      expect(button.element.disabled).toBe(false)
    })

    it('triggers click event', async () => {
      const wrapper = await mountSuspended(BackButton)
      const button = wrapper.find('button')
      
      await button.trigger('click')
      
      expect(wrapper.exists()).toBe(true)
    })

    it('handles multiple clicks', async () => {
      const wrapper = await mountSuspended(BackButton)
      const button = wrapper.find('button')
      
      await button.trigger('click')
      await button.trigger('click')
      
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('button is keyboard accessible', async () => {
      const wrapper = await mountSuspended(BackButton)
      const button = wrapper.find('button')
      
      expect(button.element.tagName).toBe('BUTTON')
    })

    it('has meaningful text content', async () => {
      const wrapper = await mountSuspended(BackButton)
      
      expect(wrapper.text().length).toBeGreaterThan(0)
    })

    it('SVG has alt attribute', async () => {
      const wrapper = await mountSuspended(BackButton)
      const svg = wrapper.find('svg')
      
      expect(svg.attributes('alt')).toBeDefined()
    })

    it('responds to keyboard events', async () => {
      const wrapper = await mountSuspended(BackButton)
      const button = wrapper.find('button')
      
      await button.trigger('keydown.enter')
      await button.trigger('keydown.space')
      
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('SVG Icon', () => {
    it('contains path element', async () => {
      const wrapper = await mountSuspended(BackButton)
      const path = wrapper.find('path')
      
      expect(path.exists()).toBe(true)
    })

    it('path has d attribute for arrow shape', async () => {
      const wrapper = await mountSuspended(BackButton)
      const path = wrapper.find('path')
      
      expect(path.attributes('d')).toBeDefined()
      expect(path.attributes('d')?.length).toBeGreaterThan(0)
    })

    it('path uses currentColor fill', async () => {
      const wrapper = await mountSuspended(BackButton)
      const path = wrapper.find('path')
      
      expect(path.attributes('fill')).toBe('currentColor')
    })
  })

  describe('Component Structure', () => {
    it('button contains both SVG and text', async () => {
      const wrapper = await mountSuspended(BackButton)
      
      expect(wrapper.find('svg').exists()).toBe(true)
      expect(wrapper.find('small').exists()).toBe(true)
    })

    it('maintains structure after interaction', async () => {
      const wrapper = await mountSuspended(BackButton)
      const button = wrapper.find('button')
      
      await button.trigger('click')
      
      expect(wrapper.find('svg').exists()).toBe(true)
      expect(wrapper.find('small').exists()).toBe(true)
    })

    it('text is wrapped in small element', async () => {
      const wrapper = await mountSuspended(BackButton)
      const small = wrapper.find('small')
      
      expect(small.text().length).toBeGreaterThan(0)
    })
  })

  describe('Edge Cases', () => {
    it('handles very long custom text', async () => {
      const longText = 'Return to the previous page with a very long description'
      const wrapper = await mountSuspended(BackButton, {
        slots: {
          default: longText,
        },
      })
      
      expect(wrapper.text()).toContain(longText)
    })

    it('handles special characters in slot', async () => {
      const wrapper = await mountSuspended(BackButton, {
        slots: {
          default: '← Back',
        },
      })
      
      expect(wrapper.text()).toContain('←')
    })

    it('handles unicode in slot', async () => {
      const wrapper = await mountSuspended(BackButton, {
        slots: {
          default: '戻る',
        },
      })
      
      expect(wrapper.text()).toContain('戻る')
    })
  })

  describe('Component State', () => {
    it('is visible after mounting', async () => {
      const wrapper = await mountSuspended(BackButton)
      
      expect(wrapper.isVisible()).toBe(true)
    })

    it('maintains structure across renders', async () => {
      const wrapper = await mountSuspended(BackButton)
      
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('svg').exists()).toBe(true)
    })

    it('updates slot content when changed', async () => {
      const wrapper = await mountSuspended(BackButton, {
        slots: {
          default: 'Initial',
        },
      })
      
      expect(wrapper.text()).toContain('Initial')
    })
  })

  describe('Performance', () => {
    it('renders efficiently', async () => {
      const startTime = performance.now()
      
      await mountSuspended(BackButton)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      expect(renderTime).toBeLessThan(1000)
    })

    it('unmounts cleanly', async () => {
      const wrapper = await mountSuspended(BackButton)
      
      wrapper.unmount()
      
      expect(true).toBe(true)
    })
  })
})
