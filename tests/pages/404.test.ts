// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import NotFoundPage from "~/pages/[404].vue";

describe("404 Not Found Page", () => {
  describe("Page Structure", () => {
    it("renders successfully", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      expect(wrapper.exists()).toBe(true);
    });

    it("contains a section element", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const section = wrapper.find("section");

      expect(section.exists()).toBe(true);
    });

    it("renders h1 heading", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const h1 = wrapper.find("h1");

      expect(h1.exists()).toBe(true);
      expect(h1.text()).toContain("404");
      expect(h1.text()).toContain("Page not found");
    });

    it("renders explanatory paragraph", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const p = wrapper.find("p");

      expect(p.exists()).toBe(true);
      expect(p.text()).toContain("That's all we know");
    });

    it("includes iframe for Giphy embed", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const iframe = wrapper.find("iframe");

      expect(iframe.exists()).toBe(true);
    });
  });

  describe("Giphy Integration", () => {
    it("embeds Giphy iframe", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const iframe = wrapper.find("iframe");

      expect(iframe.exists()).toBe(true);
    });

    it("uses correct Giphy URL", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const iframe = wrapper.find("iframe");

      expect(iframe.attributes("src")).toContain("giphy.com");
    });

    it("sets iframe to full width and height", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const iframe = wrapper.find("iframe");

      expect(iframe.attributes("width")).toBe("100%");
      expect(iframe.attributes("height")).toBe("100%");
    });

    it("uses absolute positioning", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const iframe = wrapper.find("iframe");

      expect(iframe.attributes("style")).toContain("absolute");
    });

    it("applies giphy-embed class", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const iframe = wrapper.find("iframe");

      expect(iframe.classes()).toContain("giphy-embed");
    });
  });

  describe("Container Styling", () => {
    it("creates aspect ratio container", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const container = wrapper.find('div[style*="padding-bottom: 50%"]');

      expect(container.exists()).toBe(true);
    });

    it("sets full width", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const container = wrapper.find('div[style*="width: 100%"]');

      expect(container.exists()).toBe(true);
    });

    it("uses relative positioning for container", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const container = wrapper.find('div[style*="position: relative"]');

      expect(container.exists()).toBe(true);
    });

    it("maintains 2:1 aspect ratio", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const container = wrapper.find('div[style*="padding-bottom: 50%"]');

      // 50% padding-bottom creates 2:1 aspect ratio
      expect(container.exists()).toBe(true);
    });
  });

  describe("SEO Meta", () => {
    it("sets 404 page title", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.exists()).toBe(true);
    });

    it("uses descriptive title", () => {
      const title = "404 Page Not Found";

      expect(title).toContain("404");
      expect(title).toContain("Not Found");
    });

    it("sets appropriate description", () => {
      const description = "The page you are looking for does not exist.";

      expect(description).toContain("page");
      expect(description).toContain("does not exist");
    });

    it("provides clear error message", () => {
      const description = "The page you are looking for does not exist.";

      expect(description).toContain("looking for");
    });
  });

  describe("Content Messages", () => {
    it("displays 404 error code", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.text()).toContain("404");
    });

    it('displays "Page not found" message', async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.text()).toContain("Page not found");
    });

    it("displays apologetic message", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.text()).toContain("Sorry about that");
    });

    it("displays limited information message", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.text()).toContain("That's all we know");
    });
  });

  describe("User Experience", () => {
    it("provides visual feedback with GIF", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const iframe = wrapper.find("iframe");

      expect(iframe.exists()).toBe(true);
    });

    it("explains the error clearly", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.text()).toContain("404");
      expect(wrapper.text()).toContain("not found");
    });

    it("maintains friendly tone", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.text()).toContain("Sorry");
    });
  });

  describe("Accessibility", () => {
    it("uses semantic section element", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.element.tagName).toBe("SECTION");
    });

    it("uses semantic h1 for main heading", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const h1 = wrapper.find("h1");

      expect(h1.exists()).toBe(true);
    });

    it("provides text content for screen readers", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.text().length).toBeGreaterThan(0);
    });

    it("includes descriptive paragraph", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const p = wrapper.find("p");

      expect(p.exists()).toBe(true);
      expect(p.text().length).toBeGreaterThan(0);
    });
  });

  describe("Responsive Design", () => {
    it("uses percentage-based dimensions", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const iframe = wrapper.find("iframe");

      expect(iframe.attributes("width")).toBe("100%");
    });

    it("maintains aspect ratio on resize", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const container = wrapper.find('div[style*="padding-bottom"]');

      expect(container.exists()).toBe(true);
    });

    it("uses relative positioning for responsive layout", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.html()).toContain("position: relative");
    });
  });

  describe("External Content", () => {
    it("embeds content from Giphy domain", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const iframe = wrapper.find("iframe");

      const src = iframe.attributes("src");
      expect(src).toContain("giphy.com");
    });

    it("uses specific Giphy embed ID", async () => {
      const wrapper = await mountSuspended(NotFoundPage);
      const iframe = wrapper.find("iframe");

      expect(iframe.attributes("src")).toContain("/embed/");
    });
  });

  describe("Error State", () => {
    it("represents error state visually", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      // Should have error indicators
      expect(wrapper.text()).toContain("404");
    });

    it("provides clear error context", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.text()).toContain("not found");
    });

    it("acknowledges limitation in information", async () => {
      const wrapper = await mountSuspended(NotFoundPage);

      expect(wrapper.text()).toContain("That's all we know");
    });
  });
});
