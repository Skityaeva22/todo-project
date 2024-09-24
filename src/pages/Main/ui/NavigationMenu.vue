<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ROUTER_NAMES } from "@/shared/router/routes";

const router = useRouter();
const route = useRoute();

const activePage = ref("");
const isCollapse = ref(false);

function handleToggleCollapse() {
  isCollapse.value = !isCollapse.value;
};

function handleGoTo(name: string) {
  activePage.value = name;
  router.push({ name });
}

function defineActivePage() {
  if (route.path.includes("to-do")) activePage.value = ROUTER_NAMES.TODO;
  else if (route.path.includes("profiles"))
    activePage.value = ROUTER_NAMES.PROFILES;
}

onMounted(() => {
  defineActivePage();
});
</script>

<template>
  <ElMenu
    :default-active="activePage"
    :collapse="isCollapse"
    class="flex !h-screen flex-col el-menu-collapse-transition"
    @select="handleGoTo"
  >
    <div class="flex h-[70px] w-[240px] items-center justify-between gap-2.5 p-5">
      <h2
        v-if="!isCollapse"
        class="font-medium text-main_blue text-[22px]/[30px]"
      >
        TODO
      </h2>
      <ElIcon
        v-if="isCollapse"
        :size="20"
        color="#409EFF"
        class="cursor-pointer"
        @click="handleToggleCollapse"
      >
        <DArrowRight />
      </ElIcon>
      <ElIcon
        v-else
        :size="20"
        color="#409EFF"
        class="cursor-pointer"
        @click="handleToggleCollapse"
      >
        <DArrowLeft />
      </ElIcon>
    </div>

    <ElMenuItem
      :index="ROUTER_NAMES.TODO"
      class="text-[16px]/[22px] text-primary_text"
    >
      <ElIcon class="text-inherit">
        <DocumentChecked />
      </ElIcon>
      <template #title>
        To Do
      </template>  
    </ElMenuItem>

    <ElMenuItem
      :index="ROUTER_NAMES.PROFILES"
      class="text-[16px]/[22px] text-primary_text"
    >
      <ElIcon class="text-inherit">
        <User />
      </ElIcon>
      <template #title>
        Profiles
      </template>  
    </ElMenuItem>
  </ElMenu>
</template>

<style scoped lang="scss">
.el-menu-collapse-transition {
  transition: all 0.3s ease-out;
}
</style>
