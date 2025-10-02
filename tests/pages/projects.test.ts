// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ProjectsPage from "~/pages/projects/index.vue";

describe("Projects Page", () => {
  describe("Page Structure", () => {
    it("renders successfully", async () => {
      const wrapper = await mountSuspended(ProjectsPage);
      expect(wrapper.exists()).toBe(true);
    });

    it("contains a div wrapper", async () => {
      const wrapper = await mountSuspended(ProjectsPage);
      const div = wrapper.find("div");

      expect(div.exists()).toBe(true);
    });
  });
});
