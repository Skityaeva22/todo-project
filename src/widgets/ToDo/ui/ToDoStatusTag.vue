<script setup lang="ts">
import { defineProps } from "vue";
import { defineStatus } from "@/shared/lib/defineToDoStatus";

const props = defineProps<{
  completed: boolean;
}>();
</script>

<template>
  <ElTag
    :type="defineStatus(props.completed).type"
    effect="dark"
    size="large"
  >
    {{ defineStatus(props.completed).text }}
  </ElTag>
</template>
