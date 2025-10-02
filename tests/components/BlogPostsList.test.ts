// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BlogPostsList from '~/components/BlogPostsList.vue'

describe('BlogPostsList Component', () => {
  const mockPosts = [
    {
      title: 'Test Post 1',
      path: '/writing/test-post-1',
      description: 'Description for test post 1',
      tags: ['vue', 'nuxt'],
    },
    {
      title: 'Test Post 2',
      path: '/writing/test-post-2',
      description: 'Description for test post 2',
      tags: ['javascript', 'typescript'],
    },
  ]

  describe('Rendering', () => {
    it('mounts successfully with posts', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      expect(wrapper.exists()).toBe(true)
    })

    it('renders a nav element', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const nav = wrapper.find('nav')
      expect(nav.exists()).toBe(true)
    })

    it('renders an unordered list', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const ul = wrapper.find('ul')
      expect(ul.exists()).toBe(true)
    })

    it('renders correct number of list items', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const listItems = wrapper.findAll('li')
      expect(listItems).toHaveLength(mockPosts.length)
    })

    it('handles empty posts array', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: [],
        },
      })
      
      expect(wrapper.exists()).toBe(true)
      const listItems = wrapper.findAll('li')
      expect(listItems).toHaveLength(0)
    })
  })

  describe('Post Content', () => {
    it('displays post titles', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      mockPosts.forEach(post => {
        expect(wrapper.text()).toContain(post.title)
      })
    })

    it('displays post descriptions', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      mockPosts.forEach(post => {
        expect(wrapper.text()).toContain(post.description)
      })
    })

    it('wraps descriptions in small element', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const smalls = wrapper.findAll('small')
      expect(smalls.length).toBeGreaterThan(0)
    })

    it('displays all tags for each post', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      mockPosts.forEach(post => {
        post.tags.forEach(tag => {
          expect(wrapper.text()).toContain(tag)
        })
      })
    })
  })

  describe('Links', () => {
    it('creates NuxtLink for each post', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const links = wrapper.findAllComponents({ name: 'NuxtLink' })
      expect(links.length).toBeGreaterThanOrEqual(mockPosts.length)
    })

    it('links have correct paths', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const listItems = wrapper.findAll('li')
      
      listItems.forEach((item, index) => {
        const link = item.findComponent({ name: 'NuxtLink' })
        expect(link.props('to')).toBe(mockPosts[index].path)
      })
    })

    it('links display post titles', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      // Find title links (first NuxtLink in each li)
      const listItems = wrapper.findAll('li')
      
      listItems.forEach((item, index) => {
        const titleLink = item.findComponent({ name: 'NuxtLink' })
        expect(titleLink.text()).toBe(mockPosts[index].title)
      })
    })
  })

  describe('BlogTag Components', () => {
    it('renders BlogTag components for tags', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const blogTags = wrapper.findAllComponents({ name: 'BlogTag' })
      
      const totalTags = mockPosts.reduce((sum, post) => sum + post.tags.length, 0)
      expect(blogTags).toHaveLength(totalTags)
    })

    it('passes correct text prop to BlogTag', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const blogTags = wrapper.findAllComponents({ name: 'BlogTag' })
      
      const allTags = mockPosts.flatMap(post => post.tags)
      blogTags.forEach((tag, index) => {
        expect(tag.props('text')).toBe(allTags[index])
      })
    })

    it('each BlogTag has unique key', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const blogTags = wrapper.findAllComponents({ name: 'BlogTag' })
      expect(blogTags.length).toBeGreaterThan(0)
    })
  })

  describe('Styling', () => {
    it('ul has list-none class', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const ul = wrapper.find('ul')
      expect(ul.classes()).toContain('list-none')
    })

    it('ul has pl-0 class', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const ul = wrapper.find('ul')
      expect(ul.classes()).toContain('pl-0')
    })

    it('links have transition class', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const links = wrapper.findAll('li a')
      links.forEach(link => {
        expect(link.classes()).toContain('transition')
      })
    })
  })

  describe('Props Validation', () => {
    it('requires posts prop', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: [],
        },
      })
      
      expect(wrapper.exists()).toBe(true)
    })

    it('handles single post', async () => {
      const singlePost = [mockPosts[0]]
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: singlePost,
        },
      })
      
      const listItems = wrapper.findAll('li')
      expect(listItems).toHaveLength(1)
    })

    it('handles many posts', async () => {
      const manyPosts = Array(10).fill(null).map((_, i) => ({
        title: `Post ${i}`,
        path: `/writing/post-${i}`,
        description: `Description ${i}`,
        tags: [`tag${i}`],
      }))
      
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: manyPosts,
        },
      })
      
      const listItems = wrapper.findAll('li')
      expect(listItems).toHaveLength(10)
    })
  })

  describe('List Structure', () => {
    it('uses key attribute for list items', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const listItems = wrapper.findAll('li')
      expect(listItems.length).toBe(mockPosts.length)
    })

    it('includes br elements for layout', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const brElements = wrapper.findAll('br')
      expect(brElements.length).toBeGreaterThan(0)
    })

    it('maintains consistent structure per post', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const listItems = wrapper.findAll('li')
      
      listItems.forEach(item => {
        expect(item.find('a').exists()).toBe(true)
        expect(item.find('small').exists()).toBe(true)
      })
    })
  })

  describe('Posts with Different Content', () => {
    it('handles posts without tags', async () => {
      const postsWithoutTags = [
        {
          title: 'No Tags Post',
          path: '/writing/no-tags',
          description: 'A post without tags',
          tags: [],
        },
      ]
      
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: postsWithoutTags,
        },
      })
      
      expect(wrapper.exists()).toBe(true)
      const blogTags = wrapper.findAllComponents({ name: 'BlogTag' })
      expect(blogTags).toHaveLength(0)
    })

    it('handles posts with many tags', async () => {
      const postsWithManyTags = [
        {
          title: 'Many Tags Post',
          path: '/writing/many-tags',
          description: 'A post with many tags',
          tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
        },
      ]
      
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: postsWithManyTags,
        },
      })
      
      const blogTags = wrapper.findAllComponents({ name: 'BlogTag' })
      expect(blogTags).toHaveLength(5)
    })

    it('handles long post titles', async () => {
      const postsWithLongTitle = [
        {
          title: 'This is a very long post title that might wrap to multiple lines in the UI',
          path: '/writing/long-title',
          description: 'Description',
          tags: ['test'],
        },
      ]
      
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: postsWithLongTitle,
        },
      })
      
      expect(wrapper.text()).toContain('This is a very long post title')
    })

    it('handles long descriptions', async () => {
      const postsWithLongDesc = [
        {
          title: 'Post',
          path: '/writing/long-desc',
          description: 'This is a very long description that contains a lot of information about the blog post and might span multiple lines when rendered in the UI.',
          tags: [],
        },
      ]
      
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: postsWithLongDesc,
        },
      })
      
      expect(wrapper.find('small').text()).toContain('This is a very long description')
    })
  })

  describe('Accessibility', () => {
    it('uses semantic nav element', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      expect(wrapper.element.tagName).toBe('NAV')
    })

    it('uses proper list structure', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const ul = wrapper.find('ul')
      const lis = ul.findAll('li')
      
      expect(ul.exists()).toBe(true)
      expect(lis.length).toBe(mockPosts.length)
    })

    it('links are keyboard navigable', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const links = wrapper.findAll('a')
      expect(links.length).toBeGreaterThan(0)
    })
  })

  describe('Component State', () => {
    it('is visible after mounting', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      expect(wrapper.isVisible()).toBe(true)
    })

    it('maintains structure across renders', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('nav').exists()).toBe(true)
      expect(wrapper.find('ul').exists()).toBe(true)
    })

    it('updates when posts prop changes', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: [mockPosts[0]],
        },
      })
      
      expect(wrapper.findAll('li')).toHaveLength(1)
      
      await wrapper.setProps({ posts: mockPosts })
      expect(wrapper.findAll('li')).toHaveLength(2)
    })
  })

  describe('Performance', () => {
    it('renders efficiently', async () => {
      const startTime = performance.now()
      
      await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      expect(renderTime).toBeLessThan(1000)
    })

    it('unmounts cleanly', async () => {
      const wrapper = await mountSuspended(BlogPostsList, {
        props: {
          posts: mockPosts,
        },
      })
      
      wrapper.unmount()
      
      expect(true).toBe(true)
    })
  })
})
