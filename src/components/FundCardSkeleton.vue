<template>
  <div class="flex py-6 px-3 bg-primary-green rounded-md shadow-md">
    <div class="flex flex-col flex-1 gap-2 justify-center">
      <AnimatedPlaceholder class="max-w-[50%]" />
    </div>

    <div class="flex flex-col items-end flex-1 gap-2">
      <AnimatedPlaceholder class="max-w-[75px] w-full" />
      <AnimatedPlaceholder class="max-w-[75px] w-full" />
      <AnimatedPlaceholder class="max-w-[75px] w-full" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
