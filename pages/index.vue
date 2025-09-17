<script setup lang="ts">
const animation = ref(null);
const nuxtApp = useNuxtApp();

onMounted(() => {
  triggerAnimation();
});

const triggerAnimation = () => {
  if (animation.value && animation.value.animate()) {
    animation.value.animate();
  }
};
// When navigating back to homepage, from another page,
// the animation needs to be triggered after the page
// transition or it fails as the elements don't exist yet.
nuxtApp.hook("page:transition:finish", () => {
  triggerAnimation();
});
const { data: home } = await useAsyncData(() =>
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
