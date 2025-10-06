<script setup>
const route = useRoute();
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection("blogPost").path(route.path).first();
});

if (!post.value) {
  showError({
    statusCode: 404,
    message: "Blog post not found.",
  });
}

useSeoMeta({
  title: `${post?.value?.title || "Post"} - Phil Picton 💀`,
  description: `${post?.value?.description || "Read this post by Phil Picton."}`,
});
</script>

<template>
  <div>
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
    <BackButton to="/writing"></BackButton>
  </div>
</template>
