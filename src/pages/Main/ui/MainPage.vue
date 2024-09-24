<script setup lang="ts">
import { RouterView } from "vue-router";
import NavigationMenu from "./NavigationMenu.vue";
</script>

<template>
  <div class="flex h-screen">
    <NavigationMenu />
    <div class="h-screen flex-grow p-5 bg-page_background">
      <RouterView />
    </div>
  </div>
</template>
