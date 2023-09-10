<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-color-primary">
    <SiteNavigation />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
// import templates
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<style lang="scss" scoped>
.page {
  &-enter {
    &-active {
      transition: 600ms ease all;
    }

    &-from {
      opacity: 0;
    }
  }
}
</style>
