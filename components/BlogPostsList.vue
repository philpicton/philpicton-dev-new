<script lang="ts" setup>
import type { BlogPostList } from "~/types/types";

defineProps<{
  posts: BlogPostList;
}>();
</script>

<template>
  <nav>
    <ul class="list-none pl-0">
      <li v-for="{ title, path, description, tags } in posts" :key="path">
        <NuxtLink :to="path" class="transition">
          {{ title }}
        </NuxtLink>
        <br />
        <small>{{ description }}</small>
        <br />
        <BlogTag v-for="tag in tags" :key="tag" :text="tag" />
        <br />
      </li>
    </ul>
  </nav>
</template>
