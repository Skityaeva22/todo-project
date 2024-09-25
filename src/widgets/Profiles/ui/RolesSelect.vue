<script setup lang="ts">
import type { RoleTypes } from '@/shared/types/profile'
import { ROLE_TYPES_OPTIONS } from '@/shared/config/role-types'

const modelValue = defineModel<RoleTypes | string>()
</script>

<template>
  <ElSelect
    v-model="modelValue"
    placeholder="Выберите..."
    filterable
    clearable
  >
    <ElOption
      v-for="gender in ROLE_TYPES_OPTIONS"
      :key="gender.id"
      :label="gender.label"
      :value="gender.value"
      style="font-family: Arial;"
    />
  </ElSelect>
</template>
