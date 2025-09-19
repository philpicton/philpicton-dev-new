<script setup lang="ts">
import type { PortraitAnimation } from "#components";
const animation = ref<InstanceType<typeof PortraitAnimation> | null>(null);
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
</script>

<template>
  <div>
    <PortraitAnimation ref="animation" />
  </div>
</template>
