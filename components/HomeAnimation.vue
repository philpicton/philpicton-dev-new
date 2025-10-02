<template>
  <div class="stage">
    <svg
      ref="svgEl"
      width="1200"
      height="240"
      viewBox="0 0 317.49999 63.5"
      xmlns="http://www.w3.org/2000/svg"
      alt="The words hello world are animated onto the page, looking like they were drawn by a green laser. Then they fall into the floor. Its a tricky animation to show off my skills."
    >
      <defs>
        <filter id="neonBlur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="4"
            result="innerGlow"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="6"
            result="outerGlow"
          />
          <feMerge>
            <feMergeNode in="innerGlow" />
            <feMergeNode in="glowColor" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <defs>
        <clipPath id="text-clip">
          <!-- only allow drawing above y=63 -->
          <rect x="0" y="0" width="100%" height="63" />
        </clipPath>
      </defs>

      <g>
        <!-- glowing paths -->
        <path
          v-for="(p, i) in pathsData"
          :key="i"
          :d="p"
          class="glow"
          fill="none"
          stroke="#00ff7f"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.15"
          filter="url(#neonBlur)"
        />
      </g>
      <!-- laser stroke paths -->
      <g id="letters-group" clip-path="url(#text-clip)">
        <path
          v-for="(p, i) in pathsData"
          :key="i"
          :d="p"
          class="stroke"
          fill="none"
          stroke="#00ff7f"
          stroke-width="1"
        />
      </g>
      <!-- laser tip -->
      <circle ref="laserTip" r="4" fill="#00ff7f" id="laser-tip" cx="-40" />
      <!-- baseline -->
      <line
        opacity="0"
        id="baseline"
        stroke="var(--laser-color)"
        stroke-width="2"
        x1="0"
        y1="63"
        x2="317.5"
        y2="63"
      />
      <!-- glowing flash -->
      <circle
        id="flash-circle"
        cx="158.75"
        cy="63"
        r="6"
        fill="var(--laser-color)"
        opacity="0"
      />

      <!-- final flourish image -->
      <image
        id="flourish-img"
        href="/philpicton.png"
        alt="A picture of Phil Picton"
        x="150"
        y="-170"
        width="100"
        height="100"
        opacity="0"
      />
      <circle
        id="image-tint"
        cx="200"
        cy="-120"
        r="52"
        opacity="0"
        fill="var(--laser-color)"
      />
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
// The SVG path data for each letter in "hello world"
// (copied from the exported svg in inkscape)
const pathsData = [
  "M 24.555468,48.587124 V 33.229535 H 12.325842 V 48.587124 H 8.257139 V 16.202132 h 4.068703 V 29.889906 H 24.555468 V 16.202132 h 4.068703 v 32.384992 z",
  "m 40.383445,37.603979 q 0.16463,4.303887 2.257778,6.279442 2.116666,1.952037 4.985924,1.952037 1.905,0 3.433703,-0.564444 1.528703,-0.564445 3.174999,-1.669815 l 1.857963,2.610555 q -1.716852,1.364074 -3.95111,2.140185 -2.234259,0.776111 -4.562592,0.776111 -3.621851,0 -6.16185,-1.622778 -2.516481,-1.622777 -3.857036,-4.515554 -1.317037,-2.916296 -1.317037,-6.749813 0,-3.762962 1.317037,-6.679258 1.340555,-2.916295 3.762962,-4.58611 2.445925,-1.669814 5.738517,-1.669814 4.680184,0 7.361294,3.245555 2.704629,3.245554 2.704629,8.889997 0,0.635 -0.04704,1.199445 -0.02352,0.564444 -0.04704,0.964259 z M 47.10974,26.550278 q -2.751666,0 -4.609629,1.952036 -1.857962,1.952037 -2.093147,6.044258 h 12.911663 q -0.07055,-3.974629 -1.74037,-5.973702 -1.669814,-2.022592 -4.468517,-2.022592 z",
  "m 75.143828,13.850281 v 28.62203 q 0,1.834444 1.128889,2.610555 1.152407,0.752592 2.963333,0.752592 1.10537,0 2.116666,-0.235185 1.034814,-0.235185 2.04611,-0.635 l 1.058333,2.892777 q -1.011296,0.493889 -2.51648,0.870185 -1.481667,0.399815 -3.363148,0.399815 -3.292591,0 -5.338702,-1.810926 -2.046111,-1.834444 -2.046111,-5.05648 V 16.978243 h -7.596479 v -3.127962 z",
  "m 103.36606,13.850281 v 28.62203 q 0,1.834444 1.12889,2.610555 1.1524,0.752592 2.96333,0.752592 1.10537,0 2.11666,-0.235185 1.03482,-0.235185 2.04612,-0.635 l 1.05833,2.892777 q -1.0113,0.493889 -2.51648,0.870185 -1.48167,0.399815 -3.36315,0.399815 -3.29259,0 -5.3387,-1.810926 -2.046113,-1.834444 -2.046113,-5.05648 V 16.978243 h -7.596479 v -3.127962 z",
  "m 131.37664,23.304723 q 5.24462,0 7.92573,3.504258 2.68111,3.504259 2.68111,9.383887 0,3.78648 -1.22296,6.702776 -1.22296,2.916295 -3.59833,4.58611 -2.37537,1.646296 -5.83259,1.646296 -5.24463,0 -7.94926,-3.527777 -2.70463,-3.527777 -2.70463,-9.360368 0,-3.809999 1.22296,-6.726295 1.22297,-2.939814 3.59834,-4.562591 2.39889,-1.646296 5.87963,-1.646296 z m 0,3.222036 q -3.19852,0 -4.84482,2.37537 -1.62278,2.37537 -1.62278,7.337776 0,4.915369 1.59926,7.290739 1.62278,2.351851 4.8213,2.351851 3.19852,0 4.79777,-2.37537 1.62278,-2.37537 1.62278,-7.314257 0,-4.938888 -1.59926,-7.290739 -1.59926,-2.37537 -4.77425,-2.37537 z",
  "m 201.6735,16.202132 -4.93889,32.384992 h -5.36222 l -3.71593,-24.435735 -3.73944,24.435735 h -5.47981 l -4.56259,-32.384992 h 4.09222 l 3.45722,27.892956 3.88055,-24.129994 h 5.00945 l 3.6924,24.129994 3.88056,-27.892956 z",
  "m 216.04334,23.304723 q 5.24463,0 7.92574,3.504258 2.68111,3.504259 2.68111,9.383887 0,3.78648 -1.22297,6.702776 -1.22296,2.916295 -3.59833,4.58611 -2.37537,1.646296 -5.83259,1.646296 -5.24463,0 -7.94926,-3.527777 -2.70463,-3.527777 -2.70463,-9.360368 0,-3.809999 1.22297,-6.726295 1.22296,-2.939814 3.59833,-4.562591 2.39889,-1.646296 5.87963,-1.646296 z m 0,3.222036 q -3.19852,0 -4.84482,2.37537 -1.62277,2.37537 -1.62277,7.337776 0,4.915369 1.59926,7.290739 1.62277,2.351851 4.82129,2.351851 3.19852,0 4.79778,-2.37537 1.62277,-2.37537 1.62277,-7.314257 0,-4.938888 -1.59925,-7.290739 -1.59926,-2.37537 -4.77426,-2.37537 z",
  "m 235.06984,48.587124 v -3.033888 h 3.85704 V 26.856018 h -3.85704 V 23.82213 h 6.86741 l 0.72907,5.85611 q 1.43463,-3.057407 3.48074,-4.727221 2.04611,-1.669815 5.40926,-1.669815 1.03482,0 1.83444,0.16463 0.82315,0.141111 1.66982,0.376296 l -0.56445,8.372591 h -3.24555 v -5.268147 q -0.0941,0 -0.21167,0 -5.69148,0 -8.16092,8.137405 v 10.489257 h 5.03296 v 3.033888 z",
  "m 272.69946,13.850281 v 28.62203 q 0,1.834444 1.12889,2.610555 1.15241,0.752592 2.96333,0.752592 1.10537,0 2.11667,-0.235185 1.03481,-0.235185 2.04611,-0.635 l 1.05833,2.892777 q -1.01129,0.493889 -2.51648,0.870185 -1.48166,0.399815 -3.36315,0.399815 -3.29259,0 -5.3387,-1.810926 -2.04611,-1.834444 -2.04611,-5.05648 V 16.978243 h -7.59648 v -3.127962 z",
  "m 306.09579,13.356392 3.95111,0.493889 v 34.736843 h -3.45722 l -0.37629,-3.269073 q -1.3876,1.975555 -3.19852,2.892777 -1.78741,0.917222 -3.83352,0.917222 -3.22203,0 -5.31518,-1.622778 -2.09315,-1.622777 -3.10445,-4.515554 -1.01129,-2.916296 -1.01129,-6.749813 0,-3.715925 1.15241,-6.632221 1.1524,-2.939814 3.31611,-4.609628 2.18722,-1.693333 5.24462,-1.693333 4.11574,0 6.63222,2.916296 z m -5.5974,13.12333 q -3.10445,0 -4.77426,2.422407 -1.66981,2.422407 -1.66981,7.337776 0,9.689627 5.95018,9.689627 2.09315,0 3.59833,-1.175926 1.50519,-1.199444 2.49296,-2.728147 V 29.654721 q -1.01129,-1.505184 -2.44592,-2.328332 -1.43463,-0.846667 -3.15148,-0.846667 z",
];

function animate() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    // Skip animations: just show the image at end position
    gsap.set("#flourish-img", {
      opacity: 1,
      x: -148,
      y: 150,
    });
    gsap.set("#image-tint", {
      opacity: 0.2,
      cx: 52,
      cy: 30,
    });

    return; // do not run timeline
  }

  const paths = svgEl.value.querySelectorAll(".stroke");
  const glows = svgEl.value.querySelectorAll(".glow");

  // Hide all strokes & glows initially
  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  });
  gsap.set(glows, { opacity: 0 });
  gsap.set(laserTip.value, { scale: 1, autoAlpha: 1, opacity: 1 });

  // TIMELINE ---------------------------------------------------
  const tl = gsap.timeline();

  // Animate each path sequentially
  paths.forEach((path, index) => {
    const glow = glows[index];
    tl.to(
      path,
      {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "none",
      },
      index * 0.6,
    );
    // the background glow
    tl.to(
      glow,
      {
        opacity: 0.15,
        duration: 0.6,
        ease: "none",
      },
      index * 0.6,
    );

    // move laser tip along the path
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

  // Shrink laser tip to zero
  tl.to(laserTip.value, {
    duration: 0.4,
    scale: 0,
    autoAlpha: 0,
    transformOrigin: "50% 50%",
    ease: "power2.in",
  });

  // glow pulse
  tl.to(
    svgEl.value.querySelectorAll(".glow"),
    {
      opacity: 0.5,
      yoyo: true,
      repeat: 3,
      duration: 0.15,
      ease: "sine.inOut",
    },
    "+=0.2",
  );
  // letters drop down
  tl.to(paths, {
    y: 60,
    duration: 0.6,
    ease: "power2.in",
    stagger: 0.05,
    delay: 0.5,
  })
    // baseline fade in
    .to(
      "#baseline",
      {
        opacity: 1,
        duration: 0.2,
        filter: "drop-shadow(0 0 6px var(--laser-color))",
      },
      "-=0.55",
    )
    // baseline shrink
    .to("#baseline", {
      scaleX: 0,
      transformOrigin: "center center",
      duration: 0.6,
      ease: "power4.in",
    })
    // baseline flash out
    .to("#flash-circle", {
      opacity: 1,
      transformOrigin: "center center",
      scale: 1.5,
      duration: 0.2,
      ease: "power2.out",
    })
    .to(
      "#flash-circle",
      {
        opacity: 0,
        transformOrigin: "center center",
        scale: 2,
        duration: 0.4,
        ease: "power2.in",
      },
      ">-0.1",
    )
    // expand and fade out glows
    .to(
      svgEl.value.querySelectorAll(".glow"),
      {
        opacity: 0,
        scale: 2,
        duration: 2,
        ease: "power2.out",
      },
      ">-0.3",
    );
  // final flourish: image drop, bounce, roll, tint fade
  tl.set("#image-tint", {
    opacity: 0.9,
  })
    .add("img-start")
    .to(
      "#flourish-img",
      {
        y: 150,
        duration: 1.8,
        opacity: 1,
        ease: "bounce",
      },
      "img-start",
    )
    .to(
      "#image-tint",
      {
        y: 150,
        duration: 1.8,
        ease: "bounce",
      },
      "img-start",
    )

    .to("#flourish-img", {
      x: -148,
      rotation: -360,
      transformOrigin: "50% 50%",
      duration: 1.2,
      ease: "bounce",
    })
    .to(
      "#image-tint",
      {
        x: -148,
        rotation: -360,
        transformOrigin: "50% 50%",
        duration: 1.2,
        ease: "bounce",
      },
      "-=1.2",
    )
    .to("#image-tint", {
      opacity: 0.2,
      duration: 1.2,
      ease: "sine.out",
    });
  // emoji hand wave
  tl.add(() => {
    const waveEl = document.querySelector("#wave-emoji");
    if (waveEl) {
      // Trigger wave + glow
      waveEl.style.animation = "wave-animation 2s ease-in-out 1";
      waveEl.style.filter = "drop-shadow(0 0 6px var(--laser-color))";

      // Reset after animation ends (so hover still works)
      waveEl.addEventListener(
        "animationend",
        () => {
          waveEl.style.animation = "";
          waveEl.style.filter = ""; // remove glow until hovered
        },
        { once: true },
      );
    }
  });
}

defineExpose({ animate });

// hide all strokes on mounted (so they don't flash)
onMounted(() => {
  const paths = svgEl.value.querySelectorAll(".stroke");
  const glows = svgEl.value.querySelectorAll(".glow");
  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(glows, { opacity: 0 });
    gsap.set(laserTip.value, { scale: 1, autoAlpha: 1 });
  });
  // now we can show the svg
  svgEl.value.style.visibility = "visible";
});
</script>

<style scoped>
/* Using css instead of tailwind so component is more portable.*/
.stage {
  display: flex;
  visibility: hidden;
  justify-content: center;
  align-items: center;
}
svg {
  width: 100%;
  max-width: 600px;
}
.stroke {
  fill: none;
  stroke: var(--laser-color);
  stroke-width: 1;
  filter: url(#neonBlur);
}
.glow {
  fill: none;
  stroke: var(--laser-color);
  stroke-width: 8;
  opacity: var(--glow-opacity);
  filter: url(#neonBlur);
}
#baseline {
  filter: drop-shadow(4 4 6px var(--laser-color));
}
#flash-circle,
#laser-tip {
  filter: drop-shadow(4 4 8px var(--laser-color));
}
</style>
