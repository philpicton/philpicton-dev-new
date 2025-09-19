import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: "*.md",
    }),
    blogPost: defineCollection({
      type: "page",
      source: "writing/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
      }),
    }),
  },
});
