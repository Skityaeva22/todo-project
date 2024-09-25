<script lang="ts" setup>
import { useToDoStore } from "@/store/to-do-store";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import ToDoStatusTag from "@/widgets/ToDo";

const toDoStore = useToDoStore();
const { params, todos, lastPage } = storeToRefs(toDoStore);

const page = ref(1);

async function handleLoadToDos() {
  params.value.skip = (page.value - 1) * 12;
  await toDoStore.fetchToDos(params.value);
}

onMounted(async () => {
  params.value.limit = 12;
  params.value.skip = 0;
  await toDoStore.fetchToDos(params.value);
});
</script>

<template>
  <div class="flex flex-col gap-5">
    <ElTable :data="todos ?? []" max-height="87vh" class="w-full" border>
      <ElTableColumn prop="id" label="ID" width="100" />
      <ElTableColumn prop="todo" label="Описание задачи" width="auto" />
      <ElTableColumn prop="completed" label="Статус" width="150">
        <template #default="{ row }">
          <ToDoStatusTag :completed="row.completed" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="userId" label="ID ответственного" width="170" />
    </ElTable>
    <ElPagination
      v-model:current-page="page"
      :page-size="params.limit"
      :pager-count="11"
      layout="prev, pager, next"
      :total="lastPage"
      class="bg-white w-fit flex self-end"
      @click="handleLoadToDos"
    />
  </div>
</template>
