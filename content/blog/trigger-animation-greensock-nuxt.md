---
title: "Triggering Greensock animations in Nuxt"
description: "When using Nuxt page transitions"
date: "2025-07-17" #YYYY-MM-DD
tags: ["nuxt3", "GreenSock"]
---

I'm not going to go into the details of Greensock / svg animation here, but it might be useful to talk about an issue I encountered when building this website.

If you've visited the homepage you may have noticed that there is an animation at the top. Getting this animation to work together with Nuxt page transitions was quite challenging. The Greensock animation library needs to be passed the collection of elements to animate before you can call the `animate()` function to get things moving. The problem is, these elements don't exist while the page is transitioning in. So the animation function won't work when called in `setup` or `onMounted`.

To get around this, in my animation component I have not called the animate function at all, because the child
component does not know whether the transition has finished.

Instead I have used the below to expose the animate function to the parent component like this:

```vue
defineExpose({ animate })
```

Then in the parent component (`pages/index.vue`) i did the following to trigger it

```vue
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

// ...
</script>

<template>
  <div>
    <HomeAnimation ref="animation" />
    <ContentRenderer v-if="about" :value="about" />
    <div v-else>Home not found</div>
  </div>
</template>
```

I'm calling the `triggerAnimation()` in the `mounted()` hook, so that it works when the site first loads, but during a page transition this will fail. Then I'm calling it again after any page transitions have occurred, using a hook provided by the Nuxt App composable.

It's a bit hacky, but it works...
