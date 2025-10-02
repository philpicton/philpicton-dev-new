<script setup lang="ts">
import gsap from "gsap";
import { ref } from "vue";

const text = ref(null);

function randomShadow() {
  const x1 = gsap.utils.random(-3, 3, 1);
  const y1 = gsap.utils.random(-3, 3, 1);
  const blur1 = gsap.utils.random(2, 6, 1);
  const x2 = gsap.utils.random(-3, 3, 1);
  const y2 = gsap.utils.random(-3, 3, 1);
  const blur2 = gsap.utils.random(2, 6, 1);
  return `${x1}px ${y1}px ${blur1}px red, ${x2}px ${y2}px ${blur2}px blue`;
}

function glitch() {
  const flickers = gsap.utils.random(2, 4, 1);
  const doWarp = Math.random() < 0.4;

  let tl = gsap.timeline({
    onComplete: () => {
      gsap.delayedCall(gsap.utils.random(0.3, 1.5), glitch);
    },
  });

  for (let i = 0; i < flickers; i++) {
    tl.to(text.value, {
      textShadow: randomShadow(),
      duration: 0.04,
      ease: "power1.inOut",
      ...(doWarp && i === 0
        ? {
            scale: gsap.utils.random(0.95, 1.05),
            skewX: gsap.utils.random(-5, 5),
            skewY: gsap.utils.random(-5, 5),
          }
        : {}),
    }).to(text, {
      textShadow: "none",
      duration: 0.04,
      ease: "power1.inOut",
      scale: 1,
      skewX: 0,
      skewY: 0,
    });
  }
}

onMounted(() => {
  if (text.value) {
    glitch();
  }
});
</script>

<template>
  <div ref="text" style="opacity: 1; text-shadow: none">
    <slot />
  </div>
</template>
