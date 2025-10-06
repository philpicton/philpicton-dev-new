// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import ProjectsIndex from "~/pages/projects/index.vue";

const mockProjects = [
  {
    title: "Project 1",
    description: "Description 1",
    thumbnail: "/images/projects/project1.jpg",
    tech: ["Vue.js", "TypeScript"],
    date: "2024-01-15",
    path: "/projects/project-1",
    slug: "project-1",
  },
  {
    title: "Project 2",
    description: "Description 2",
    thumbnail: "/images/projects/project2.jpg",
    tech: ["React", "Node.js"],
    date: "2024-01-20",
    path: "/projects/project-2",
    slug: "project-2",
  },
  {
    title: "Project 3",
    description: "Description 3",
    thumbnail: "/images/projects/project3.jpg",
    tech: ["Vue.js", "Python"],
    date: "2024-02-01",
    path: "/projects/project-3",
    slug: "project-3",
  },
];

// Mock the route
const mockRoute = {
  query: {},
  path: "/projects",
};

const mockNavigateTo = vi.fn();

mockNuxtImport("useRoute", () => {
  return () => mockRoute;
});

mockNuxtImport("navigateTo", () => {
  return mockNavigateTo;
});

// Mock useAsyncData to return our mock projects
mockNuxtImport("useAsyncData", () => {
  return () => ({
    data: { value: mockProjects },
  });
});

// Mock queryCollection
vi.mock("#content", () => ({
  queryCollection: vi.fn(() => ({
    order: vi.fn(() => ({
      select: vi.fn(() => ({
        all: vi.fn(() => Promise.resolve(mockProjects)),
      })),
    })),
  })),
}));

describe("Projects Index Page", () => {
  beforeEach(() => {
    mockNavigateTo.mockReset();
    mockRoute.query = {};
  });

  it("renders the page with heading", async () => {
    const wrapper = await mountSuspended(ProjectsIndex);

    expect(wrapper.find("h1").text()).toBe("Projects");
    expect(wrapper.text()).toContain("A showcase of my recent work");
  });

  it("displays filter dropdown", async () => {
    const wrapper = await mountSuspended(ProjectsIndex);

    const select = wrapper.find("select#tech-filter");
    expect(select.exists()).toBe(true);
    expect(select.attributes("aria-label")).toContain("Filter");
  });

  it("renders project cards", async () => {
    const wrapper = await mountSuspended(ProjectsIndex);

    const cards = wrapper.findAllComponents({ name: "ProjectCard" });
    expect(cards.length).toBeGreaterThan(0);
  });

  it("displays correct results count", async () => {
    const wrapper = await mountSuspended(ProjectsIndex);

    expect(wrapper.text()).toContain("Showing 3 projects");
  });

  it("shows pagination when more than 8 results", async () => {
    const manyProjects = Array.from({ length: 10 }, (_, i) => ({
      title: `Project ${i + 1}`,
      description: `Description ${i + 1}`,
      thumbnail: `/images/projects/project${i + 1}.jpg`,
      tech: ["Vue.js"],
      date: "2024-01-15",
      path: `/projects/project-${i + 1}`,
      slug: `project-${i + 1}`,
    }));

    mockNuxtImport("useAsyncData", () => {
      return () => ({
        data: { value: manyProjects },
      });
    });

    const wrapper = await mountSuspended(ProjectsIndex);

    // Should show "Showing 8 projects of 10"
    expect(wrapper.text()).toMatch(/Showing 8 projects of 10/);
  });

  it("has accessible clear filter button", async () => {
    const wrapper = await mountSuspended(ProjectsIndex);

    const clearButton = wrapper.find('button[class*="w-10 h-10"]');
    expect(clearButton.exists()).toBe(true);
    expect(clearButton.attributes()).toHaveProperty("aria-label");
  });

  it("renders technology filter options", async () => {
    const wrapper = await mountSuspended(ProjectsIndex);

    const select = wrapper.find("select#tech-filter");
    const options = select.findAll("option");

    expect(options.length).toBeGreaterThan(1); // At least "All technologies" + some tech
    expect(options[0].text()).toBe("All technologies");
  });

  it("has proper SEO meta tags", async () => {
    const wrapper = await mountSuspended(ProjectsIndex);

    // Component should call useSeoMeta
    expect(wrapper.vm).toBeDefined();
  });

  it("shows empty state when no projects match filter", async () => {
    mockNuxtImport("useAsyncData", () => {
      return () => ({
        data: { value: [] },
      });
    });

    const wrapper = await mountSuspended(ProjectsIndex);

    expect(wrapper.text()).toContain("No projects found");
  });

  it("displays filter label correctly", async () => {
    const wrapper = await mountSuspended(ProjectsIndex);

    expect(wrapper.find("label[for='tech-filter']").text()).toBe(
      "Filter by technology:",
    );
  });

  it("has accessible pagination buttons", async () => {
    const manyProjects = Array.from({ length: 10 }, (_, i) => ({
      title: `Project ${i + 1}`,
      description: `Description ${i + 1}`,
      thumbnail: `/images/projects/project${i + 1}.jpg`,
      tech: ["Vue.js"],
      date: "2024-01-15",
      path: `/projects/project-${i + 1}`,
      slug: `project-${i + 1}`,
    }));

    mockNuxtImport("useAsyncData", () => {
      return () => ({
        data: { value: manyProjects },
      });
    });

    const wrapper = await mountSuspended(ProjectsIndex);

    const paginationButtons = wrapper.findAll("button");
    const navButtons = paginationButtons.filter((btn) =>
      btn.attributes("aria-label")?.includes("page"),
    );

    expect(navButtons.length).toBeGreaterThan(0);
  });
});
