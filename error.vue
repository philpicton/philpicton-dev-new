<script setup>
defineProps({ error: Object });
</script>

<template>
  <NuxtLayout>
    <main
      class="prose dark:prose-invert prose-slate max-w-2xl px-3 py-7 mx-auto bg-white sm:px-8 sm:shadow dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 sm:rounded-lg prose-a:text-green-700 prose-a:hover:text-green-800 dark:prose-a:text-green-400 dark:prose-a:hover:text-green-500 flex flex-col items-center justify-center"
    >
      <h1 class="text-red-600 dark:text-red-400 mb-4">
        Oh no! error {{ error.statusCode }}
      </h1>
      <p class="mb-6">
        {{ error.statusMessage || "An unexpected error occurred." }}
      </p>
      <NuxtLink to="/" class="btn btn-green">Go Home</NuxtLink>
    </main>
  </NuxtLayout>
</template>

<style>
@reference './assets/css/main.css';
</style>
