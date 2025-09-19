// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxthub/core",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/color-mode",
  ],
  hub: {
    kv: true,
  },
  content: {
    // @ts-expect-error: hub driver is provided by NuxtHub
    driver: "hub",
    build: {
      markdown: {
        highlight: {
          theme: "github-dark",
        },
      },
    },
  },
  ssr: true, // enable server-side rendering at build time
});
