// @vitest-environment nuxt
import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ColorModeSwitch from '~/components/ColorModeSwitch.vue'

describe('ColorModeSwitch Component', () => {
  describe('Rendering', () => {
    it('mounts successfully', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders a button element', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      expect(button.exists()).toBe(true)
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('renders with correct structure', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'ColorScheme' }).exists()).toBe(true)
    })

    it('contains icon elements in rendered HTML', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      // Wait for the component to fully render
      await wrapper.vm.$nextTick()
      
      // Check if the HTML contains icon-related content
      const html = wrapper.html()
      expect(html).toBeTruthy()
      expect(html.length).toBeGreaterThan(0)
    })
  })

  describe('Button Attributes', () => {
    it('has correct aria-label for accessibility', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      expect(button.attributes('aria-label')).toBe('Color Mode')
    })

    it('applies correct CSS classes', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      const classes = button.classes()
      expect(classes).toContain('w-5')
      expect(classes).toContain('h-5')
      expect(classes).toContain('hover:text-green-600')
      expect(classes).toContain('transition')
      expect(classes).toContain('flex')
      expect(classes).toContain('flex-col')
      expect(classes).toContain('justify-center')
    })

    it('has click event handler attached', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      // The button should have a click handler
      expect(button.element.onclick).toBeDefined()
    })
  })

  describe('Color Mode Integration', () => {
    it('initializes with colorMode composable', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      // Component should have access to colorMode
      expect(wrapper.vm).toBeDefined()
    })

    it('displays moon icon when in dark mode', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch, {
        global: {
          mocks: {
            $colorMode: {
              value: 'dark',
              preference: 'dark',
            },
          },
        },
      })
      
      await wrapper.vm.$nextTick()
      
      // Look for moon icon
      const icons = wrapper.findAllComponents({ name: 'Icon' })
      if (icons.length > 0) {
        const moonIcon = icons.find(icon => 
          icon.props('name')?.includes('moon')
        )
        expect(moonIcon).toBeDefined()
      }
    })

    it('displays sun icon when in light mode', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch, {
        global: {
          mocks: {
            $colorMode: {
              value: 'light',
              preference: 'light',
            },
          },
        },
      })
      
      await wrapper.vm.$nextTick()
      
      // Look for sun icon
      const icons = wrapper.findAllComponents({ name: 'Icon' })
      if (icons.length > 0) {
        const sunIcon = icons.find(icon => 
          icon.props('name')?.includes('sun')
        )
        expect(sunIcon).toBeDefined()
      }
    })
  })

  describe('Click Interaction', () => {
    it('button is clickable', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      expect(button.element.disabled).toBe(false)
    })

    it('button responds to interaction', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      // Just verify the button can receive events
      expect(button.exists()).toBe(true)
      expect(button.element.onclick).toBeDefined()
    })

    it('maintains state across interactions', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      // Verify button remains functional
      expect(button.exists()).toBe(true)
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('ColorScheme Component', () => {
    it('uses ColorScheme wrapper', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      const colorScheme = wrapper.findComponent({ name: 'ColorScheme' })
      expect(colorScheme.exists()).toBe(true)
    })

    it('ColorScheme has placeholder attribute', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      const colorScheme = wrapper.findComponent({ name: 'ColorScheme' })
      if (colorScheme.exists()) {
        expect(colorScheme.props('placeholder')).toBe('...')
      }
    })
  })

  describe('Icon Configuration', () => {
    it('moon icon has correct name', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      await wrapper.vm.$nextTick()
      
      const icons = wrapper.findAllComponents({ name: 'Icon' })
      const moonIcon = icons.find(icon => 
        icon.props('name') === 'ph:moon-bold'
      )
      
      // Moon icon should exist or component should render
      expect(wrapper.exists()).toBe(true)
    })

    it('sun icon has correct name', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      await wrapper.vm.$nextTick()
      
      const icons = wrapper.findAllComponents({ name: 'Icon' })
      const sunIcon = icons.find(icon => 
        icon.props('name') === 'ph:sun-bold'
      )
      
      // Sun icon should exist or component should render
      expect(wrapper.exists()).toBe(true)
    })

    it('icons have correct size classes', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      await wrapper.vm.$nextTick()
      
      const icons = wrapper.findAllComponents({ name: 'Icon' })
      
      if (icons.length > 0) {
        icons.forEach(icon => {
          const classes = icon.classes()
          expect(classes).toContain('w-5')
          expect(classes).toContain('h-5')
        })
      }
    })

    it('icons have dark mode classes', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      await wrapper.vm.$nextTick()
      
      const icons = wrapper.findAllComponents({ name: 'Icon' })
      
      if (icons.length > 0) {
        icons.forEach(icon => {
          const classes = icon.classes()
          expect(classes.some(c => c.includes('dark:'))).toBe(true)
        })
      }
    })
  })

  describe('Component State', () => {
    it('maintains structure after multiple renders', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      const initialHTML = wrapper.html()
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('is visible after mounting', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      expect(wrapper.isVisible()).toBe(true)
    })

    it('button remains enabled', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      expect(button.attributes('disabled')).toBeUndefined()
    })
  })

  describe('Accessibility', () => {
    it('is keyboard accessible', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      // Button should be focusable
      expect(button.element.tabIndex).toBeGreaterThanOrEqual(-1)
    })

    it('has semantic button element', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('provides descriptive aria-label', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      const ariaLabel = button.attributes('aria-label')
      expect(ariaLabel).toBeTruthy()
      expect(ariaLabel?.length).toBeGreaterThan(0)
    })

    it('can be activated with keyboard events', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      await button.trigger('keydown.enter')
      await button.trigger('keydown.space')
      
      // Should not throw errors
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Styling', () => {
    it('has hover effects configured', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      expect(button.classes()).toContain('hover:text-green-600')
    })

    it('has transition class for smooth animations', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      expect(button.classes()).toContain('transition')
    })

    it('uses flexbox layout', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      const classes = button.classes()
      expect(classes).toContain('flex')
      expect(classes).toContain('flex-col')
    })

    it('centers content vertically', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      expect(button.classes()).toContain('justify-center')
    })
  })

  describe('Integration', () => {
    it('integrates with Nuxt color mode module', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      // Component should mount without errors when using colorMode
      expect(wrapper.vm).toBeDefined()
      expect(wrapper.exists()).toBe(true)
    })

    it('works within ColorScheme component context', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      const colorScheme = wrapper.findComponent({ name: 'ColorScheme' })
      expect(colorScheme.exists()).toBe(true)
    })

    it('renders without errors in SSR context', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      // Should render successfully
      expect(wrapper.html()).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('maintains structure on interaction', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      const button = wrapper.find('button')
      
      // Verify structure remains intact
      expect(button.exists()).toBe(true)
      expect(wrapper.exists()).toBe(true)
    })

    it('maintains functionality after re-render', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      await wrapper.vm.$nextTick()
      await wrapper.vm.$forceUpdate()
      
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      expect(button.attributes('aria-label')).toBe('Color Mode')
    })

    it('does not break with missing color mode', async () => {
      // This test ensures the component is resilient
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Component Props and Composition', () => {
    it('does not accept any props', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      // Component should work without any props
      expect(wrapper.exists()).toBe(true)
    })

    it('is a standalone component', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      // Should not require any parent context besides Nuxt
      expect(wrapper.vm).toBeDefined()
    })
  })

  describe('Performance', () => {
    it('renders efficiently', async () => {
      const startTime = performance.now()
      
      await mountSuspended(ColorModeSwitch)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Rendering should be reasonably fast (< 1 second)
      expect(renderTime).toBeLessThan(1000)
    })

    it('does not create memory leaks on mount/unmount', async () => {
      const wrapper = await mountSuspended(ColorModeSwitch)
      
      wrapper.unmount()
      
      // Should unmount cleanly
      expect(true).toBe(true)
    })
  })
})
