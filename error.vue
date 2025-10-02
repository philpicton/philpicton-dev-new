<script setup lang="ts">
interface ErrorProps {
  error?: {
    statusCode?: number;
    statusMessage?: string;
  };
}

defineProps<ErrorProps>();

useSeoMeta({
  title: "Error page - Phil Picton",
  description: "It looks like something went wrong.",
});
</script>

<template>
  <NuxtLayout>
    <main class="flex flex-col items-center justify-center">
      <GlitchText>
        <h1 class="text-red-600 dark:text-red-400 mb-4">
          Oh no! error {{ error?.statusCode || "" }}
        </h1>
      </GlitchText>
      <p class="mb-6">
        {{ error?.statusMessage || "An unspecified error occurred." }}
      </p>
      <NuxtLink to="/">Home</NuxtLink>
    </main>
  </NuxtLayout>
</template>
