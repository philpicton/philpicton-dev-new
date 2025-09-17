<script setup>
// no ts here as nuxt colour mode chucks a type error
// see https://github.com/nuxt-modules/color-mode/issues/182
const colorMode = useColorMode();
const onClick = () =>
  colorMode.value === "light"
    ? (colorMode.preference = "dark")
    : (colorMode.preference = "light");
</script>

<template>
  <button
    aria-label="Color Mode"
    class="w-5 h-5 hover:text-green-600 transition flex flex-col justify-center"
    @click="onClick"
  >
    <ColorScheme placeholder="...">
      <Icon
        v-if="colorMode.value === 'dark'"
        name="ph:moon-bold"
        class="w-5 h-5 dark:text-white dark:hover:text-green-500"
      />
      <Icon
        v-else
        name="ph:sun-bold"
        class="w-5 h-5 dark:text-white dark:hover:text-green-500"
      />
    </ColorScheme>
  </button>
</template>
