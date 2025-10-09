<script setup lang="ts">
import gsap from "gsap";

const text = ref<HTMLDivElement | null>(null);

const randomShadow = () => {
  const x1 = gsap.utils.random(-3, 3, 1);
  const y1 = gsap.utils.random(-3, 3, 1);
  const blur1 = gsap.utils.random(2, 6, 1);
  const x2 = gsap.utils.random(-3, 3, 1);
  const y2 = gsap.utils.random(-3, 3, 1);
  const blur2 = gsap.utils.random(2, 6, 1);
  return `${x1}px ${y1}px ${blur1}px red, ${x2}px ${y2}px ${blur2}px blue`;
};

const glitch = () => {
  if (!text.value) return;

  const flickers = gsap.utils.random(2, 4, 1);
  const doWarp = Math.random() < 0.4;
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.delayedCall(gsap.utils.random(0.1, 1), glitch);
    },
  });

  for (let i = 0; i < flickers; i++) {
    tl.to(text.value, {
      textShadow: randomShadow(),
      scale: doWarp && i === 0 ? gsap.utils.random(0.95, 1.05) : undefined,
      skewX: doWarp && i === 0 ? gsap.utils.random(-5, 5) : undefined,
      skewY: doWarp && i === 0 ? gsap.utils.random(-5, 5) : undefined,
      duration: 0.05,
      ease: "power1.inOut",
    }).to(text.value, {
      textShadow: "none",
      scale: doWarp && i === 0 ? 1 : undefined,
      skewX: doWarp && i === 0 ? 0 : undefined,
      skewY: doWarp && i === 0 ? 0 : undefined,
      duration: 0.05,
      ease: "power1.inOut",
    });
  }
};

onMounted(() => {
  if (text.value) glitch();
});
</script>

<template>
  <div ref="text">
    <slot />
  </div>
</template>
