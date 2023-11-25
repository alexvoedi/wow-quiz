<script setup lang="ts"></script>

<template>
  <router-view />
</template>

<style lang="postcss">
html,
body,
#app {
  @apply h-full;
}

#app {
  @apply font-serif p-8 grid items-center justify-center;

  background-image: url("/bg-image.webp");
  background-size: cover;
}
</style>
