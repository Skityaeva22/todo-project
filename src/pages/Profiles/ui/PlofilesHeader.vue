<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import ModalUserProfileCreate from '@/widgets/Profiles'

const { open, close } = useModal({
  component: ModalUserProfileCreate,
  attrs: {
    onClose() {
      close()
    },
  },
})
</script>

<template>
  <div class="flex justify-end">
    <ElButton type="primary" @click="open">
      <ElIcon :size="16">
        <Plus />
      </ElIcon>
      <span>Новый профиль</span>
    </ElButton>
  </div>
</template>
