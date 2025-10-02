// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ContactPage from "~/pages/contact/index.vue";

describe("Contact Page", () => {
  describe("Page Structure", () => {
    it("renders successfully", async () => {
      const wrapper = await mountSuspended(ContactPage);
      expect(wrapper.exists()).toBe(true);
    });

    it("contains a div wrapper", async () => {
      const wrapper = await mountSuspended(ContactPage);
      const div = wrapper.find("div");

      expect(div.exists()).toBe(true);
    });

    it("renders h1 heading", async () => {
      const wrapper = await mountSuspended(ContactPage);
      const h1 = wrapper.find("h1");

      expect(h1.exists()).toBe(true);
      expect(h1.text()).toBe("Contact page");
    });

    it("renders descriptive paragraph", async () => {
      const wrapper = await mountSuspended(ContactPage);
      const p = wrapper.find("p");

      expect(p.exists()).toBe(true);
      expect(p.text()).toContain("fill in the form");
    });

    it("includes ContactForm component", async () => {
      const wrapper = await mountSuspended(ContactPage);
      const contactForm = wrapper.findComponent({ name: "ContactForm" });

      expect(contactForm.exists()).toBe(true);
    });
  });

  describe("Content", () => {
    it("displays contact heading", async () => {
      const wrapper = await mountSuspended(ContactPage);

      expect(wrapper.text()).toContain("Contact page");
    });

    it("displays instructions", async () => {
      const wrapper = await mountSuspended(ContactPage);

      expect(wrapper.text()).toContain("send me a message");
    });

    it("instructs users to fill in form", async () => {
      const wrapper = await mountSuspended(ContactPage);

      expect(wrapper.text()).toContain("fill in the form");
    });
  });

  describe("Component Integration", () => {
    it("integrates ContactForm component", async () => {
      const wrapper = await mountSuspended(ContactPage);
      const form = wrapper.findComponent({ name: "ContactForm" });

      expect(form.exists()).toBe(true);
    });
  });
});
