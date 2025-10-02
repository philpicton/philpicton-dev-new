<script setup lang="ts">
import type { HomeAnimation } from "#components";
const animation = ref<InstanceType<typeof HomeAnimation> | null>(null);
const nuxtApp = useNuxtApp();

onMounted(() => {
  triggerAnimation();
});

const triggerAnimation = () => {
  if (animation.value?.animate) {
    animation.value.animate();
  }
};

nuxtApp.hook("page:transition:finish", () => {
  triggerAnimation();
});

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
    <HomeAnimation ref="animation" />
    <ContentRenderer v-if="home" :value="home" />
  </div>
</template>
