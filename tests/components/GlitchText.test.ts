// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";
import GlitchText from "~/components/GlitchText.vue";

describe("GlitchText Component", () => {
  beforeEach(() => {
    // Mock gsap functions
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe("Rendering", () => {
    it("renders the wrapper div element", async () => {
      const wrapper = await mountSuspended(GlitchText);
      const div = wrapper.find("div");

      expect(div.exists()).toBe(true);
      expect(wrapper.element.tagName).toBe("DIV");
    });

    it("applies initial inline styles correctly", async () => {
      const wrapper = await mountSuspended(GlitchText);
      const div = wrapper.find("div");

      expect(div.attributes("style")).toContain("opacity: 1");
      expect(div.attributes("style")).toContain("text-shadow: none");
    });

    it("has the correct root element structure", async () => {
      const wrapper = await mountSuspended(GlitchText);

      // Verify it's a single root div
      expect(wrapper.element.tagName).toBe("DIV");
      expect(wrapper.findAll("> div")).toHaveLength(1);
    });
  });

  describe("Slot Content", () => {
    it("renders default slot content when provided", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<h1>Test Glitch Text</h1>",
        },
      });

      expect(wrapper.html()).toContain("Test Glitch Text");
      expect(wrapper.find("h1").exists()).toBe(true);
    });

    it("renders text content in slot", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "Plain text content",
        },
      });

      expect(wrapper.text()).toContain("Plain text content");
    });

    it("renders multiple elements in slot", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<h1>Title</h1><p>Paragraph</p>",
        },
      });

      expect(wrapper.find("h1").text()).toBe("Title");
      expect(wrapper.find("p").text()).toBe("Paragraph");
    });

    it("renders complex nested content", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: '<div><span class="test">Nested</span></div>',
        },
      });

      expect(wrapper.find(".test").text()).toBe("Nested");
    });

    it("renders empty slot gracefully", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "",
        },
      });

      const div = wrapper.find("div");
      expect(div.exists()).toBe(true);
      expect(div.text()).toBe("");
    });

    it("preserves HTML attributes in slotted content", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default:
            '<span class="custom-class" data-test="value">Content</span>',
        },
      });

      const span = wrapper.find("span");
      expect(span.classes()).toContain("custom-class");
      expect(span.attributes("data-test")).toBe("value");
    });
  });

  describe("Component Lifecycle", () => {
    it("initializes without errors", async () => {
      expect(async () => {
        await mountSuspended(GlitchText);
      }).not.toThrow();
    });

    it("handles mounting with slot content", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<h1>Mounted Content</h1>",
        },
      });

      await nextTick();
      expect(wrapper.find("h1").exists()).toBe(true);
    });

    it("component is properly mounted", async () => {
      const wrapper = await mountSuspended(GlitchText);

      expect(wrapper.vm).toBeDefined();
      expect(wrapper.isVisible()).toBe(true);
    });
  });

  describe("Template Structure", () => {
    it("wraps slot content in a single div", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<span>Content</span>",
        },
      });

      const divs = wrapper.findAll("div");
      // Should have exactly one div (the wrapper)
      expect(divs).toHaveLength(1);
    });

    it("does not add extra wrapper elements", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<p>Test</p>",
        },
      });

      // Check that the structure is: div > p
      const div = wrapper.find("div");
      const p = div.find("p");
      expect(p.exists()).toBe(true);
    });
  });

  describe("Style Application", () => {
    it("maintains inline styles after mount", async () => {
      const wrapper = await mountSuspended(GlitchText);
      await nextTick();

      const div = wrapper.find("div");
      const style = div.attributes("style");

      expect(style).toBeDefined();
      expect(style).toContain("opacity");
      expect(style).toContain("text-shadow");
    });

    it("does not override slot content styles", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: '<span style="color: red;">Styled</span>',
        },
      });

      const span = wrapper.find("span");
      expect(span.attributes("style")).toContain("color: red");
    });
  });

  describe("Integration", () => {
    it("can be used with different heading levels", async () => {
      const headingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];

      for (const level of headingLevels) {
        const wrapper = await mountSuspended(GlitchText, {
          slots: {
            default: `<${level}>Heading</${level}>`,
          },
        });

        expect(wrapper.find(level).exists()).toBe(true);
        expect(wrapper.find(level).text()).toBe("Heading");
      }
    });

    it("works with inline elements", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<span>Inline</span>",
        },
      });

      expect(wrapper.find("span").exists()).toBe(true);
    });

    it("works with block elements", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<div>Block</div>",
        },
      });

      expect(wrapper.find("div > div").exists()).toBe(true);
    });

    it("handles special characters in content", async () => {
      const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: `<span>${specialChars}</span>`,
        },
      });

      expect(wrapper.text()).toContain(specialChars);
    });

    it("handles unicode characters", async () => {
      const unicode = "你好世界 🎉 émoji";
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: `<span>${unicode}</span>`,
        },
      });

      expect(wrapper.text()).toContain(unicode);
    });
  });

  describe("Accessibility", () => {
    it("preserves ARIA attributes from slotted content", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: '<h1 aria-label="Error heading">Error</h1>',
        },
      });

      const h1 = wrapper.find("h1");
      expect(h1.attributes("aria-label")).toBe("Error heading");
    });

    it("preserves role attributes", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: '<div role="alert">Alert message</div>',
        },
      });

      const div = wrapper.find('div[role="alert"]');
      expect(div.exists()).toBe(true);
    });

    it("maintains semantic HTML structure", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<h1>Semantic Heading</h1>",
        },
      });

      // Ensure the h1 is a direct child of the wrapper div
      expect(wrapper.find("div > h1").exists()).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles very long text content", async () => {
      const longText = "A".repeat(1000);
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: `<span>${longText}</span>`,
        },
      });

      expect(wrapper.text()).toHaveLength(1000);
    });

    it("handles whitespace-only content", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "   ",
        },
      });

      const div = wrapper.find("div");
      expect(div.exists()).toBe(true);
    });

    it("handles line breaks in content", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<span>Line 1<br>Line 2</span>",
        },
      });

      expect(wrapper.find("br").exists()).toBe(true);
    });

    it("handles content with HTML entities", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<span>&lt;div&gt;&amp;</span>",
        },
      });

      const text = wrapper.text();
      expect(text).toContain("<div>");
      expect(text).toContain("&");
    });
  });

  describe("Component State", () => {
    it("maintains consistent structure across multiple renders", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<h1>Test</h1>",
        },
      });

      const initialHTML = wrapper.html();
      await nextTick();
      const afterTickHTML = wrapper.html();

      // Structure should remain the same
      expect(initialHTML).toBe(afterTickHTML);
    });

    it("preserves slot content after component updates", async () => {
      const wrapper = await mountSuspended(GlitchText, {
        slots: {
          default: "<span>Original</span>",
        },
      });

      await nextTick();
      expect(wrapper.text()).toContain("Original");
    });
  });
});
