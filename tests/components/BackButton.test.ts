// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { h } from "vue";
import BackButton from "~/components/BackButton.vue";
// Create reusable spies
const push = vi.fn();
const back = vi.fn();
const replace = vi.fn();

// Mock the Nuxt useRouter composable
mockNuxtImport("useRouter", () => {
  return () => ({
    push,
    back,
    replace,
  });
});

describe("BackButton", () => {
  beforeEach(() => {
    push.mockReset();
    back.mockReset();
    replace.mockReset();
  });

  it("renders button with SVG icon and text", async () => {
    const wrapper = await mountSuspended(BackButton);

    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("svg").exists()).toBe(true);
    expect(wrapper.find("small").exists()).toBe(true);
    expect(wrapper.text()).toContain("go back");
  });

  it("accepts custom slot content", async () => {
    const wrapper = await mountSuspended(BackButton, {
      slots: {
        default: () => h("span", "Return Home"),
      },
    });

    expect(wrapper.text()).toContain("Return Home");
  });

  it("calls goBack ", async () => {
    const wrapper = await mountSuspended(BackButton, {
      props: { to: "/writing" },
    });

    const btn = wrapper.find("button");

    expect(btn.exists()).toBe(true);

    await btn.trigger("click");
    expect(push).toHaveBeenCalledWith("/writing");
    expect(back).not.toHaveBeenCalled();
  });

  it("calls goBack ", async () => {
    const wrapper = await mountSuspended(BackButton, {
      props: {},
    });

    const btn = wrapper.find("button");

    expect(btn.exists()).toBe(true);

    await btn.trigger("click");
    expect(push).not.toHaveBeenCalled();
    expect(back).toHaveBeenCalled();
  });
});
