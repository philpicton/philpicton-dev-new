<script setup>
const route = useRoute();
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection("blogPost").path(route.path).first();
});
useSeoMeta({
  title: `${post?.value?.title || ""} - Phil Picton 💀`,
  description: `${post?.value?.description || "Read this blog post by Phil Picton."}`,
});
</script>

<template>
  <div>
    <template v-if="post">
      <article
        class="prose-code:before:content-none prose-code:after:content-none"
      >
        <BlogTag v-for="tag in post.tags" :key="tag" :text="tag"></BlogTag>
        <div>
          <h2>{{ post.title }}</h2>
          <small>{{
            new Date(post.date).toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}</small>
        </div>
        <hr />
        <ContentRenderer :value="post.body" />
      </article>
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
