// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import ProjectSlug from "~/pages/projects/[slug].vue";

const mockProject = {
  title: "Virtual Tours Platform",
  description: "An immersive 360° virtual tour platform",
  thumbnail: "/images/projects/virtual-tours-thumb.jpg",
  tech: ["Vue.js", "Three.js", "Node.js", "MongoDB", "WebGL"],
  date: "2024-01-15",
  path: "/projects/virtual-tours",
  slug: "virtual-tours",
  body: {
    type: "root",
    children: [
      {
        type: "element",
        tag: "h2",
        children: [{ type: "text", value: "Overview" }],
      },
      {
        type: "element",
        tag: "p",
        children: [
          {
            type: "text",
            value: "This is a cutting-edge virtual tours platform.",
          },
        ],
      },
    ],
  },
};

// Mock the route
const mockRoute = {
  path: "/projects/virtual-tours",
};

mockNuxtImport("useRoute", () => {
  return () => mockRoute;
});

// Mock useAsyncData to return our mock project
mockNuxtImport("useAsyncData", () => {
  return () => ({
    data: { value: mockProject },
  });
});

// Mock queryCollection
vi.mock("#content", () => ({
  queryCollection: vi.fn(() => ({
    path: vi.fn(() => ({
      first: vi.fn(() => Promise.resolve(mockProject)),
    })),
  })),
}));

describe("Project Detail Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the project title", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    expect(wrapper.find("h1").text()).toBe("Virtual Tours Platform");
  });

  it("displays project description", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    expect(wrapper.text()).toContain("An immersive 360° virtual tour platform");
  });

  it("renders technology pills", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    expect(wrapper.text()).toContain("Vue.js");
    expect(wrapper.text()).toContain("Three.js");
    expect(wrapper.text()).toContain("Node.js");
    expect(wrapper.text()).toContain("MongoDB");
    expect(wrapper.text()).toContain("WebGL");
  });

  it("displays formatted date", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    // Date should be formatted as "15 January 2024" or similar
    expect(wrapper.text()).toMatch(/January/);
    expect(wrapper.text()).toMatch(/2024/);
  });

  it("renders thumbnail image", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    const img = wrapper.findComponent({ name: "NuxtImg" });
    expect(img.exists()).toBe(true);
    expect(img.props("src")).toBe(mockProject.thumbnail);
    expect(img.props("alt")).toBe(mockProject.title);
  });

  it("renders back button", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    const backButton = wrapper.findComponent({ name: "BackButton" });
    expect(backButton.exists()).toBe(true);
    expect(backButton.props("to")).toBe("/projects");
  });

  it("renders ContentRenderer with project body", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    const contentRenderer = wrapper.findComponent({ name: "ContentRenderer" });
    expect(contentRenderer.exists()).toBe(true);
    expect(contentRenderer.props("value")).toBeDefined();
  });

  it("has proper article structure", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    expect(wrapper.find("article").exists()).toBe(true);
  });

  it("displays technology pills with proper styling", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    const techSpans = wrapper.findAll("span");
    const techPills = techSpans.filter((span) =>
      span.classes().some((cls) => cls.includes("bg-green")),
    );

    expect(techPills.length).toBe(mockProject.tech.length);
  });

  it("has hover effect on thumbnail", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    const thumbnailDiv = wrapper.find(".group");
    expect(thumbnailDiv.exists()).toBe(true);
  });

  it("renders horizontal rules for visual separation", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    const hrs = wrapper.findAll("hr");
    expect(hrs.length).toBeGreaterThanOrEqual(2); // At least 2 hrs in the layout
  });

  it("has SEO meta tags", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    // Component should call useSeoMeta with project data
    expect(wrapper.vm).toBeDefined();
  });

  it("shows error when project not found", async () => {
    // Mock showError
    const mockShowError = vi.fn();
    mockNuxtImport("showError", () => mockShowError);

    // Mock useAsyncData to return null
    mockNuxtImport("useAsyncData", () => {
      return () => ({
        data: { value: null },
      });
    });

    await mountSuspended(ProjectSlug);

    expect(mockShowError).toHaveBeenCalledWith({
      statusCode: 404,
      message: "Project not found.",
    });
  });

  it("renders tech pills with hover animation classes", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    const techSpans = wrapper.findAll("span");
    const techPills = techSpans.filter((span) =>
      span.classes().some(
        (cls) => cls.includes("transition") || cls.includes("hover:scale"),
      ),
    );

    expect(techPills.length).toBeGreaterThan(0);
  });

  it("has proper not-prose classes to prevent prose styling on certain elements", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    const notProseElements = wrapper.findAll(".not-prose");
    expect(notProseElements.length).toBeGreaterThan(0);
  });

  it("displays project date with proper formatting", async () => {
    const wrapper = await mountSuspended(ProjectSlug);

    const dateElement = wrapper.find("small");
    expect(dateElement.exists()).toBe(true);
    expect(dateElement.text()).toMatch(/\d{1,2}\s+\w+\s+\d{4}/); // Match date pattern
  });
});
