<template>
  <div class="stage">
    <svg ref="svgEl" viewBox="0 0 1200 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neonBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
          <feMerge>
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Glow background (starts hidden) -->
      <g>
        <path
          v-for="(p, i) in pathsData"
          :key="i"
          :d="p"
          class="glow"
          fill="none"
          stroke="#00ff7f"
          stroke-width="8"
          opacity="0"
          filter="url(#neonBlur)"
        />
      </g>

      <!-- Stroke paths -->
      <g>
        <path
          v-for="(p, i) in pathsData"
          :key="i"
          :d="p"
          class="stroke"
          fill="none"
          stroke="#00ff7f"
          stroke-width="2.5"
        />
      </g>

      <!-- Laser tip -->
      <circle ref="laserTip" r="8" fill="#00ff7f" filter="url(#neonBlur)" />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const svgEl = ref(null);
const laserTip = ref(null);

// Replace with your actual array of path strings
const pathsData = [
  "M10,90 ...", // letter H
  "M50,90 ...", // letter E
  "M90,90 ...", // letter L
  // etc...
];

function playLaser() {
  const paths = svgEl.value.querySelectorAll(".stroke");
  const glows = svgEl.value.querySelectorAll(".glow");

  // Hide all strokes & glows initially
  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  });
  gsap.set(glows, { opacity: 0 });
  gsap.set(laserTip.value, { scale: 1, autoAlpha: 1 });

  const tl = gsap.timeline();

  paths.forEach((path, index) => {
    const glow = glows[index];
    const length = path.getTotalLength();

    // Animate stroke & corresponding glow together
    tl.to(
      path,
      {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "none",
      },
      index * 0.6,
    );

    tl.to(
      glow,
      {
        opacity: 0.15,
        duration: 0.6,
        ease: "none",
      },
      index * 0.6,
    );

    // Laser tip along path with wobble
    tl.to(
      laserTip.value,
      {
        duration: 0.6,
        ease: "none",
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 1,
        },
        onUpdate: () => {
          const angle = (Math.random() - 0.5) * 10;
          laserTip.value.setAttribute("transform", `rotate(${angle})`);
        },
      },
      index * 0.6,
    );
  });

  // Laser tip flicker/scale pulse during drawing
  tl.to(
    laserTip.value,
    {
      duration: 0.15,
      scale: 1.3,
      transformOrigin: "50% 50%",
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut",
    },
    "-=0.3",
  );

  // Shrink laser tip to zero at the end
  tl.to(laserTip.value, {
    duration: 0.4,
    scale: 0,
    autoAlpha: 0,
    transformOrigin: "50% 50%",
    ease: "power2.in",
  });
}

defineExpose({ playLaser });

// Ensure initial hidden state
onMounted(() => {
  const paths = svgEl.value.querySelectorAll(".stroke");
  const glows = svgEl.value.querySelectorAll(".glow");
  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  });
  gsap.set(glows, { opacity: 0 });
  gsap.set(laserTip.value, { scale: 1, autoAlpha: 1 });
});
</script>

<style scoped>
.stage {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
svg {
  width: 100%;
  max-width: 900px;
}
.stroke {
  fill: none;
  stroke: #00ff7f;
  stroke-width: 2.5;
  filter: url(#neonBlur);
}
.glow {
  fill: none;
  stroke: #00ff7f;
  stroke-width: 8;
  opacity: 0;
  filter: url(#neonBlur);
}
</style>
