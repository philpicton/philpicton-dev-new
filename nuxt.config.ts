// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
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
    database: true,
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
  fonts: {
    families: [
      {
        name: "Inter",
        provider: "google",
        weights: [300, 400],
      },
    ],
    defaults: {
      weights: [300, 400],
      styles: ["normal"],
      subsets: ["latin"],
    },
  },
  ssr: true, // enable server-side rendering at build time
});
