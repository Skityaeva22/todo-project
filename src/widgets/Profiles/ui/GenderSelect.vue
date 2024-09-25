<script setup lang="ts">
import type { GenderTypes } from '@/shared/types/profile'
import { GENDER_TYPES_OPTIONS } from '@/shared/config/gender-types'

const modelValue = defineModel<GenderTypes | string>()
</script>

<template>
  <ElSelect
    v-model="modelValue"
    placeholder="Выберите..."
    filterable
    clearable
  >
    <ElOption
      v-for="gender in GENDER_TYPES_OPTIONS"
      :key="gender.id"
      :label="gender.label"
      :value="gender.value"
      style="font-family: Arial;"
    />
  </ElSelect>
</template>
