<script setup lang="ts">
import type { HomeAnimationNewNew } from "#components";
const animation = ref<InstanceType<typeof HomeAnimationNewNew> | null>(null);
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

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
});
</script>

<template>
  <div>
    <HomeAnimationNewNew ref="animation" />
    <ContentRenderer v-if="home" :value="home" />
    <div v-else>Home not found</div>
  </div>
</template>
