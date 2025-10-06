// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ProjectCard from "~/components/ProjectCard.vue";

describe("ProjectCard", () => {
  const mockProject = {
    title: "Test Project",
    description: "A test project description that is quite detailed",
    thumbnail: "/images/projects/test-thumb.jpg",
    tech: ["Vue.js", "TypeScript", "Tailwind CSS"],
    date: "2024-01-15",
    path: "/projects/test-project",
    slug: "test-project",
  };

  it("renders project card with correct structure", async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: mockProject },
    });

    expect(wrapper.find("a").exists()).toBe(true);
    expect(wrapper.find("h3").exists()).toBe(true);
    expect(wrapper.find("p").exists()).toBe(true);
  });

  it("displays project title", async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: mockProject },
    });

    expect(wrapper.find("h3").text()).toBe("Test Project");
  });

  it("displays project description", async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: mockProject },
    });

    expect(wrapper.text()).toContain("A test project description");
  });

  it("renders thumbnail image with correct attributes", async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: mockProject },
    });

    const img = wrapper.findComponent({ name: "NuxtImg" });
    expect(img.exists()).toBe(true);
    expect(img.props("src")).toBe(mockProject.thumbnail);
    expect(img.props("alt")).toBe(mockProject.title);
  });

  it("renders all technology pills", async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: mockProject },
    });

    const techPills = wrapper.findAll("span");
    const techText = techPills.map((pill) => pill.text());

    expect(techText).toContain("Vue.js");
    expect(techText).toContain("TypeScript");
    expect(techText).toContain("Tailwind CSS");
  });

  it("links to correct project path", async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: mockProject },
    });

    const link = wrapper.findComponent({ name: "NuxtLink" });
    expect(link.props("to")).toBe("/projects/test-project");
  });

  it("has proper group and hover classes for animations", async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: mockProject },
    });

    const link = wrapper.find("a");
    expect(link.classes()).toContain("group");
  });

  it("shows animated arrow indicator", async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: mockProject },
    });

    // Find the arrow indicator div
    const arrows = wrapper.findAll("div");
    const arrow = arrows.find((div) =>
      div.classes().some((cls) => cls.includes("absolute")),
    );

    expect(arrow).toBeDefined();
  });

  it("has proper accessibility attributes", async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: mockProject },
    });

    const link = wrapper.find("a");
    expect(link.classes()).toContain("focus:outline-none");
    expect(link.classes()).toContain("focus:ring-2");
    expect(link.classes()).toContain("focus:ring-green-500");
  });

  it("handles projects with many technologies", async () => {
    const projectWithManyTech = {
      ...mockProject,
      tech: ["Vue.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Docker"],
    };

    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: projectWithManyTech },
    });

    const techPills = wrapper.findAll("span");
    expect(techPills.length).toBeGreaterThanOrEqual(6);
  });

  it("handles projects with no technologies", async () => {
    const projectWithNoTech = {
      ...mockProject,
      tech: [],
    };

    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: projectWithNoTech },
    });

    expect(wrapper.find("h3").exists()).toBe(true);
    expect(wrapper.text()).toContain("Test Project");
  });

  it("truncates long descriptions with line-clamp", async () => {
    const projectWithLongDesc = {
      ...mockProject,
      description:
        "This is a very long description that should be truncated by the line-clamp-3 utility class. It goes on and on with lots of text that would take up too much space on the card if it were all shown.",
    };

    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: projectWithLongDesc },
    });

    const description = wrapper.find("p");
    expect(description.classes()).toContain("line-clamp-3");
  });
});
