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

const {
  data: home,
  error,
  pending,
} = await useAsyncData("home", () => queryCollection("pages").all());

console.log("SSR home data:", home.value, error.value, pending.value);

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
