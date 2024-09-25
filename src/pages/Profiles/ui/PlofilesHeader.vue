<script setup lang="ts">
function handleAddProfile() {
  ///
}
</script>

<template>
  <div class="flex justify-end">
    <ElButton type="primary" @click="handleAddProfile">
      <ElIcon :size="16"><Plus /></ElIcon>
      <span>Новый профиль</span>
    </ElButton>
  </div>
</template>
