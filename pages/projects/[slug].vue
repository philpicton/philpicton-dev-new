<script setup lang="ts">
const route = useRoute();
const { data: project } = await useAsyncData(route.path, () => {
  return queryCollection("project").path(route.path).first();
});

if (!project.value) {
  showError({
    statusCode: 404,
    message: "Project not found.",
  });
}

useSeoMeta({
  title: `${project?.value?.title || "Project"} - Phil Picton 💀`,
  description: `${project?.value?.description || "View this project by Phil Picton."}`,
});
</script>

<template>
  <div>
    <article
      class="prose-code:before:content-none prose-code:after:content-none"
    >
      <!-- Header Section with Enhanced Styling -->
      <div class="mb-8">
        <h1 class="mb-3">{{ project.title }}</h1>
        <p class="text-xl text-slate-600 dark:text-slate-300 mb-4">
          {{ project.description }}
        </p>

        <!-- Tech Stack Pills -->
        <div class="flex flex-wrap gap-2 mb-4 not-prose">
          <span
            v-for="tech in project.tech"
            :key="tech"
            class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-700 transition-all hover:scale-105"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Date -->
        <small class="text-slate-500 dark:text-slate-400">
          {{
            new Date(project.date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </small>
      </div>

      <!-- Thumbnail Image with Animation -->
      <div
        class="not-prose mb-8 rounded-lg overflow-hidden shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 group"
      >
        <NuxtImg
          :src="project.thumbnail"
          :alt="project.title"
          class="w-full h-auto transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <hr />

      <!-- Content Body -->
      <ContentRenderer :value="project.body" class="my-8" />
    </article>

    <hr />

    <!-- Navigation -->
    <div class="flex justify-between items-center mt-8 not-prose">
      <BackButton to="/projects">Back to Projects</BackButton>
    </div>
  </div>
</template>

<style scoped>
@reference '../../assets/css/main.css';

/* Additional styling for smooth animations */
:deep(img) {
  @apply rounded-lg;
}
</style>
