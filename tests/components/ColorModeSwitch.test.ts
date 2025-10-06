// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ColorModeSwitch from "~/components/ColorModeSwitch.vue";

describe("ColorModeSwitch", () => {
  it("renders a button with accessible label", async () => {
    const wrapper = await mountSuspended(ColorModeSwitch);
    const button = wrapper.find("button");

    expect(button.exists()).toBe(true);
    expect(button.attributes("aria-label")).toBeTruthy();
  });

  it("renders an icon within ColorScheme", async () => {
    const wrapper = await mountSuspended(ColorModeSwitch);

    // The component should render a button with icon content
    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);

    // Check if there's any icon-related content (svg or the placeholder)
    const html = wrapper.html();
    const hasIconContent =
      html.includes("svg") ||
      html.includes("Icon") ||
      html.includes("...") ||
      html.includes("ph:");
    expect(hasIconContent).toBe(true);
  });
});
