<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import ModalUserProfileCreate from '@/widgets/Profiles'
import { useUserProfilesStore } from '@/store/user-profiles-store'

const userProfilesStore = useUserProfilesStore()

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
  <div class="flex items-center justify-end gap-5">
    <ElButton type="primary" @click="open">
      <ElIcon :size="16">
        <Plus />
      </ElIcon>
      <span>Новый профиль</span>
    </ElButton>
    <ElButton type="danger" @click="userProfilesStore.removeLocalStorageUser">
      <ElIcon :size="16">
        <Delete />
      </ElIcon>
      <span>Выти из профля</span>
    </ElButton>
  </div>
</template>
