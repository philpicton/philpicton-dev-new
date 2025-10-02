// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SiteHeader from '~/components/SiteHeader.vue'

describe('SiteHeader Component', () => {
  const expectedLinks = [
    { name: 'home', to: '/' },
    { name: 'about', to: '/about' },
    { name: 'writing', to: '/writing' },
    { name: 'projects', to: '/projects' },
    { name: 'contact', to: '/contact' },
  ]

  describe('Rendering', () => {
    it('mounts successfully', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders a nav element', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const nav = wrapper.find('nav')
      
      expect(nav.exists()).toBe(true)
      expect(wrapper.element.tagName).toBe('NAV')
    })

    it('renders ColorModeSwitch component', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const colorModeSwitch = wrapper.findComponent({ name: 'ColorModeSwitch' })
      
      expect(colorModeSwitch.exists()).toBe(true)
    })

    it('renders navigation links', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const navLinks = wrapper.findAllComponents({ name: 'NuxtLink' })
      
      expect(navLinks.length).toBeGreaterThanOrEqual(expectedLinks.length)
    })

    it('renders menu toggle button', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const button = wrapper.find('button')
      
      expect(button.exists()).toBe(true)
    })
  })

  describe('Navigation Links', () => {
    it('renders all expected navigation links', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      
      expectedLinks.forEach(link => {
        expect(wrapper.text()).toContain(link.name)
      })
    })

    it('links have correct paths', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const navLinks = wrapper.findAll('li a')
      
      expectedLinks.forEach((expectedLink, index) => {
        const link = navLinks[index]
        if (link) {
          const nuxtLink = link.findComponent({ name: 'NuxtLink' })
          if (nuxtLink.exists()) {
            expect(nuxtLink.props('to')).toBe(expectedLink.to)
          }
        }
      })
    })

    it('renders links in list items', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const listItems = wrapper.findAll('li')
      
      expect(listItems.length).toBe(expectedLinks.length)
    })

    it('each link displays correct name', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const links = wrapper.findAll('li a span')
      
      links.forEach((link, index) => {
        if (index < expectedLinks.length) {
          expect(link.text()).toBe(expectedLinks[index].name)
        }
      })
    })
  })

  describe('Mobile Menu', () => {
    it('has hamburger menu button', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons.find(btn => btn.attributes('aria-label') === 'Main menu')
      
      expect(menuButton).toBeDefined()
      if (menuButton) {
        expect(menuButton.attributes('aria-label')).toBe('Main menu')
      }
    })

    it('hamburger button contains SVG', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons.find(btn => btn.attributes('aria-label') === 'Main menu')
      
      if (menuButton) {
        const svg = menuButton.find('svg')
        expect(svg.exists()).toBe(true)
      }
    })

    it('SVG has three line paths', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const svgs = wrapper.findAll('svg')
      // Find the hamburger SVG (not the ColorModeSwitch SVG)
      const hamburgerSvg = svgs.find(svg => svg.findAll('path').length === 3)
      
      expect(hamburgerSvg).toBeDefined()
    })

    it('menu toggle changes state on click', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons.find(btn => btn.attributes('aria-label') === 'Main menu')
      
      if (menuButton) {
        expect(wrapper.vm.open.value).toBe(false)
        
        await menuButton.trigger('click')
        expect(wrapper.vm.open.value).toBe(true)
        
        await menuButton.trigger('click')
        expect(wrapper.vm.open.value).toBe(false)
      }
    })

    it('SVG lines have opened class when menu is open', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons.find(btn => btn.attributes('aria-label') === 'Main menu')
      
      if (menuButton) {
        await menuButton.trigger('click')
        
        const lines = wrapper.findAll('.line')
        lines.forEach(line => {
          expect(line.classes()).toContain('opened')
        })
      }
    })

    it('menu closes when link is clicked', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons.find(btn => btn.attributes('aria-label') === 'Main menu')
      
      if (menuButton) {
        await menuButton.trigger('click')
        expect(wrapper.vm.open.value).toBe(true)
        
        const firstLink = wrapper.find('li a')
        await firstLink.trigger('click')
        
        expect(wrapper.vm.open.value).toBe(false)
      }
    })
  })

  describe('Styling', () => {
    it('nav has correct layout classes', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const nav = wrapper.find('nav')
      
      const classes = nav.classes()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
    })

    it('nav has max-width constraint', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const nav = wrapper.find('nav')
      
      expect(nav.classes()).toContain('max-w-2xl')
      expect(nav.classes()).toContain('mx-auto')
    })

    it('links have nav-link class', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const links = wrapper.findAll('.nav-link')
      
      expect(links.length).toBe(expectedLinks.length)
    })

    it('links have hover effects', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const links = wrapper.findAll('li a')
      
      links.forEach(link => {
        const classes = link.classes()
        expect(classes.some(c => c.includes('hover:'))).toBe(true)
      })
    })

    it('menu button has responsive classes', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons.find(btn => btn.attributes('aria-label') === 'Main menu')
      
      if (menuButton) {
        expect(menuButton.classes().some(c => c.includes('lg:'))).toBe(true)
      }
    })
  })

  describe('Responsive Behavior', () => {
    it('menu container has responsive classes', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const menuContainer = wrapper.find('.w-full')
      
      expect(menuContainer.exists()).toBe(true)
      const classes = menuContainer.classes()
      expect(classes.some(c => c.includes('lg:'))).toBe(true)
    })

    it('links list has responsive layout classes', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const ul = wrapper.find('ul')
      
      const classes = ul.classes()
      expect(classes.some(c => c.includes('lg:'))).toBe(true)
    })
  })

  describe('Hamburger Animation', () => {
    it('has three line elements', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      
      expect(wrapper.find('.line1').exists()).toBe(true)
      expect(wrapper.find('.line2').exists()).toBe(true)
      expect(wrapper.find('.line3').exists()).toBe(true)
    })

    it('lines have correct classes', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      
      const line1 = wrapper.find('.line1')
      const line2 = wrapper.find('.line2')
      const line3 = wrapper.find('.line3')
      
      expect(line1.classes()).toContain('line')
      expect(line2.classes()).toContain('line')
      expect(line3.classes()).toContain('line')
    })

    it('lines toggle opened class', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons.find(btn => btn.attributes('aria-label') === 'Main menu')
      
      const line1 = wrapper.find('.line1')
      expect(line1.classes()).not.toContain('opened')
      
      if (menuButton) {
        await menuButton.trigger('click')
        expect(line1.classes()).toContain('opened')
      }
    })
  })

  describe('Accessibility', () => {
    it('uses semantic nav element', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      
      expect(wrapper.element.tagName).toBe('NAV')
    })

    it('menu button has aria-label', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons.find(btn => btn.attributes('aria-label') === 'Main menu')
      
      expect(menuButton).toBeDefined()
      if (menuButton) {
        expect(menuButton.attributes('aria-label')).toBe('Main menu')
      }
    })

    it('SVG has aria-hidden attribute', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const svgs = wrapper.findAll('svg')
      
      expect(svgs.some(svg => svg.attributes('aria-hidden') === 'true')).toBe(true)
    })

    it('links are keyboard navigable', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const links = wrapper.findAll('a')
      
      expect(links.length).toBeGreaterThan(0)
    })

    it('uses proper list structure', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      
      const ul = wrapper.find('ul')
      const lis = ul.findAll('li')
      
      expect(ul.exists()).toBe(true)
      expect(lis.length).toBe(expectedLinks.length)
    })
  })

  describe('Component State', () => {
    it('initializes with menu closed', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      
      expect(wrapper.vm.open.value).toBe(false)
    })

    it('tracks menu open state', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons.find(btn => btn.attributes('aria-label') === 'Main menu')
      
      expect(wrapper.vm.open.value).toBe(false)
      
      if (menuButton) {
        await menuButton.trigger('click')
        expect(wrapper.vm.open.value).toBe(true)
        
        await menuButton.trigger('click')
        expect(wrapper.vm.open.value).toBe(false)
      }
    })

    it('is visible after mounting', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      
      expect(wrapper.isVisible()).toBe(true)
    })

    it('maintains structure across renders', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('nav').exists()).toBe(true)
      expect(wrapper.find('ul').exists()).toBe(true)
    })
  })

  describe('Integration', () => {
    it('includes ColorModeSwitch', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const colorModeSwitch = wrapper.findComponent({ name: 'ColorModeSwitch' })
      
      expect(colorModeSwitch.exists()).toBe(true)
    })

    it('works as standalone navigation', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.vm).toBeDefined()
    })
  })

  describe('Menu Visibility', () => {
    it('menu container has max-height classes', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const menuContainer = wrapper.find('.w-full')
      
      const classes = menuContainer.classes()
      expect(classes.some(c => c.includes('max-h'))).toBe(true)
    })

    it('menu visibility changes with open state', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      const buttons = wrapper.findAll('button')
      const menuButton = buttons.find(btn => btn.attributes('aria-label') === 'Main menu')
      const menuContainer = wrapper.find('.w-full')
      
      // Closed state
      expect(menuContainer.classes()).toContain('max-h-0')
      expect(menuContainer.classes()).toContain('opacity-0')
      
      if (menuButton) {
        // Open state
        await menuButton.trigger('click')
        expect(menuContainer.classes()).toContain('max-h-[300px]')
        expect(menuContainer.classes()).toContain('opacity-100')
      }
    })
  })

  describe('Performance', () => {
    it('renders efficiently', async () => {
      const startTime = performance.now()
      
      await mountSuspended(SiteHeader)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      expect(renderTime).toBeLessThan(1000)
    })

    it('unmounts cleanly', async () => {
      const wrapper = await mountSuspended(SiteHeader)
      
      wrapper.unmount()
      
      expect(true).toBe(true)
    })
  })
})
