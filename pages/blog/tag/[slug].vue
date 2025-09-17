<script setup lang="ts">
const route = useRoute();
const tag = route.params.slug as string;

const { data: posts } = await useAsyncData(`tag-${tag}`, () => {
  return queryCollection("blogPost")
    .where("tags", "LIKE", `%${tag}%`) // check JSON array contains string
    .order("date", "DESC")
    .select("title", "path", "description", "tags")
    .all();
});
</script>

<template>
  <div>
    <template v-if="posts && posts.length > 0">
      <h1 class="mb-4 text-3xl font-bold">Posts tagged with "{{ tag }}"</h1>
      <ul>
        <li
          v-for="post in posts"
          :key="post.path"
          class="mb-6 border-b pb-4 last:border-0"
        >
          <NuxtLink
            :to="post.path"
            class="text-2xl font-semibold text-green-600 hover:underline"
            >{{ post.title }}</NuxtLink
          >
          <p class="mt-2 text-gray-700">{{ post.description }}</p>
          <div class="mt-2">
            <BlogTag v-for="t in post.tags" :key="t" :text="t" class="mr-2" />
          </div>
        </li>
      </ul>
      <hr />
      <BackButton to="/blog"></BackButton>
    </template>
    <template v-else>
      <div class="empty-page">
        <h1>Page Not Found</h1>
        <p>Oops! The content you're looking for doesn't exist.</p>
        <NuxtLink to="/">Go back home</NuxtLink>
      </div>
    </template>
  </div>
</template>
