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
    <HomeAnimation ref="animation" />
    <ContentRenderer v-if="about" :value="about" />
    <div v-else>Home not found</div>
  </div>
</template>
