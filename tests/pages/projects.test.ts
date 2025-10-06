// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ProjectsPage from "~/pages/projects/index.vue";

describe("Projects Page", () => {
  it("shows fallback content if error handler does not work", async () => {
    const wrapper = await mountSuspended(ProjectsPage, {
      route: "/projects",
    });

    expect(wrapper.text()).toContain("Projects page");
  });
});
