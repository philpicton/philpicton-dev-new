// @vitest-environment nuxt
import { describe, it, expect, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import HomeAnimation from "~/components/HomeAnimation.vue";

// Mock GSAP to prevent animation warnings in tests
vi.mock("gsap", () => {
  const mockTimeline = {
    set: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
    add: vi.fn().mockReturnThis(),
    play: vi.fn().mockReturnThis(),
  };

  return {
    default: {
      set: vi.fn(),
      to: vi.fn(),
      from: vi.fn(),
      fromTo: vi.fn(),
      timeline: vi.fn(() => mockTimeline),
      registerPlugin: vi.fn(),
    },
  };
});

vi.mock("gsap/MotionPathPlugin", () => ({
  MotionPathPlugin: {},
}));

describe("HomeAnimation", () => {
  it("renders SVG with expected structure", async () => {
    const wrapper = await mountSuspended(HomeAnimation);
    const svg = wrapper.find("svg");

    expect(svg.exists()).toBe(true);
    expect(svg.attributes("viewBox")).toBe("0 0 317.49999 63.5");
  });

  it("renders all letter paths", async () => {
    const wrapper = await mountSuspended(HomeAnimation);
    const paths = wrapper.findAll(".stroke");

    // Should have paths for "hello world" letters
    expect(paths.length).toBeGreaterThan(0);
  });

  it("includes laser tip element", async () => {
    const wrapper = await mountSuspended(HomeAnimation);
    const laserTip = wrapper.find("#laser-tip");

    expect(laserTip.exists()).toBe(true);
  });

  it("includes flourish image element", async () => {
    const wrapper = await mountSuspended(HomeAnimation);
    const flourishImg = wrapper.find("#flourish-img");

    expect(flourishImg.exists()).toBe(true);
    expect(flourishImg.attributes("href")).toBe("/philpicton.png");
  });
});
