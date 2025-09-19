<script setup lang="ts">
const { data: about } = await useAsyncData(() =>
  queryCollection("pages").path("/about").first(),
);

useSeoMeta({
  title: about.value?.title,
  description: about.value?.description,
});
</script>

<template>
  <div>
    <ContentRenderer v-if="about" :value="about" />
    <div v-else>Content not found</div>
  </div>
</template>
