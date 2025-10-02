<script setup lang="ts">
const { data: about } = await useAsyncData(() =>
  queryCollection("pages").path("/about").first(),
);

if (!about.value) {
  showError({
    statusCode: 404,
    statusMessage: "About page content not found.",
  });
}

useSeoMeta({
  title: about.value?.title,
  description: about.value?.description,
});
</script>

<template>
  <div>
    <ContentRenderer v-if="about" :value="about" />
  </div>
</template>
