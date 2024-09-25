<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationMenu from './NavigationMenu.vue'
</script>

<template>
  <div class="flex h-screen">
    <NavigationMenu />
    <div class="h-screen flex-grow bg-page_background p-5">
      <RouterView />
    </div>
  </div>
</template>
