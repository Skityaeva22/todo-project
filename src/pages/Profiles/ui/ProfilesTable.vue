<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserProfilesStore } from '@/store/user-profiles-store'
import { defineFullName } from '@/shared/lib/defineFullName'
import { defineAgeWord } from '@/shared/lib/defineAgeWord'
import { defineGender } from '@/shared/lib/defineGender'
import { defineRole } from '@/shared/lib/defineRole'

const userProfilesStore = useUserProfilesStore()
const { params, users, lastPage, isLoading } = storeToRefs(userProfilesStore)

const page = ref(1)

async function handleLoadUserProfiles() {
  params.value.skip = (page.value - 1) * 12
  await userProfilesStore.fetchUserProfiles(params.value)
}

onMounted(async () => {
  if (params.value.limit)
    page.value = Math.trunc(params.value.skip / params.value.limit) + 1
  else page.value = 1
  await userProfilesStore.fetchUserProfiles(params.value)
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="h-[79vh]">
      <ElTable
        v-loading="isLoading"
        :data="users ?? []"
        :header-row-style="{ height: '48px' }"
        :row-style="{ cursor: 'pointer' }"
        :cell-style="{ height: '48px' }"
        max-height="79vh"
        border
      >
        <ElTableColumn prop="id" label="ID" width="70" />
        <ElTableColumn label="Ф.И.О." width="auto">
          <template #default="{ row }">
            <ElTooltip
              :content="defineFullName(row) || '-'"
              placement="bottom"
              effect="dark"
            >
              <span class="truncate">
                {{ defineFullName(row) || '-' }}
              </span>
            </ElTooltip>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Username" width="105">
          <template #default="{ row }">
            <ElTooltip
              :content="row.username"
              placement="bottom"
              effect="dark"
            >
              <span class="truncate">
                {{ row.username }}
              </span>
            </ElTooltip>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Возраст" width="90">
          <template #default="{ row }">
            {{ defineAgeWord(row.age) || '-' }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="Пол" width="70">
          <template #default="{ row }">
            {{ defineGender(row.gender) }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="Email" width="200">
          <template #default="{ row }">
            <ElTooltip
              :content="row.email || '-'"
              placement="bottom"
              effect="dark"
            >
              <span class="truncate">
                {{ row.email || '-' }}
              </span>
            </ElTooltip>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Телефон" width="140">
          <template #default="{ row }">
            <ElTooltip
              :content="row.phone || '-'"
              placement="bottom"
              effect="dark"
            >
              <span class="truncate">
                {{ row.phone || '-' }}
              </span>
            </ElTooltip>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Адрес" width="auto">
          <template #default="{ row }">
            <ElTooltip
              :content="row.address?.address || '-'"
              placement="bottom"
              effect="dark"
            >
              <span class="truncate">
                {{ row.address?.address || '-' }}
              </span>
            </ElTooltip>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Роль" width="80">
          <template #default="{ row }">
            <ElTooltip
              :content="defineRole(row.role)"
              placement="bottom"
              effect="dark"
            >
              <span class="truncate">
                {{ defineRole(row.role) }}
              </span>
            </ElTooltip>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
    <ElPagination
      v-model:current-page="page"
      :page-size="params.limit"
      :pager-count="11"
      layout="prev, pager, next"
      :total="lastPage"
      class="flex w-fit self-end bg-white"
      @click="handleLoadUserProfiles"
    />
  </div>
</template>
