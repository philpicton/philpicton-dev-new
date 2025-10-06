<script setup lang="ts">
const { data: home } = await useAsyncData("home", () =>
  queryCollection("pages").path("/home").first(),
);

if (!home.value) {
  showError({
    statusCode: 404,
    statusMessage:
      "Failed to load page content. On the homepage. Doesn't make a very good first impression does it? 😬",
  });
}

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
});
</script>

<template>
  <div>
    <HomeAnimation />
    <ContentRenderer v-if="home" :value="home" />
  </div>
</template>
