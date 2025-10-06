// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import SiteHeader from "~/components/SiteHeader.vue";

describe("SiteHeader", () => {
  it("renders nav with expected navigation links", async () => {
    const wrapper = await mountSuspended(SiteHeader);
    const expectedLinks = ["home", "about", "writing", "projects", "contact"];

    expect(wrapper.find("nav").exists()).toBe(true);
    expectedLinks.forEach((link) => {
      expect(wrapper.text()).toContain(link);
    });
  });

  it("includes ColorModeSwitch component", async () => {
    const wrapper = await mountSuspended(SiteHeader);

    expect(wrapper.findComponent({ name: "ColorModeSwitch" }).exists()).toBe(
      true,
    );
  });

  it("has mobile menu toggle functionality", async () => {
    const wrapper = await mountSuspended(SiteHeader);
    const buttons = wrapper.findAll("button");
    const menuButton = buttons.find(
      (btn) => btn.attributes("aria-label") === "Main menu",
    );

    expect(menuButton).toBeDefined();
    if (menuButton) {
      // @ts-ignore
      expect(wrapper.vm.open.value).toBe(false);
      await menuButton.trigger("click");
      // @ts-ignore
      expect(wrapper.vm.open.value).toBe(true);
      await menuButton.trigger("click");
      // @ts-ignore
      expect(wrapper.vm.open.value).toBe(false);
    }
  });

  it("closes menu when navigation link is clicked", async () => {
    const wrapper = await mountSuspended(SiteHeader);
    const buttons = wrapper.findAll("button");
    const menuButton = buttons.find(
      (btn) => btn.attributes("aria-label") === "Main menu",
    );

    if (menuButton) {
      await menuButton.trigger("click");
      // @ts-ignore
      expect(wrapper.vm.open.value).toBe(true);
      const firstLink = wrapper.find("li a");
      await firstLink.trigger("click");
      // @ts-ignore
      expect(wrapper.vm.open.value).toBe(false);
    }
  });
});
