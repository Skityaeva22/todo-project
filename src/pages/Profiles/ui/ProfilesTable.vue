<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserProfilesStore } from '@/store/user-profiles-store'
import { defineFullName } from '@/shared/lib/defineFullName'
import { defineAgeWord } from '@/shared/lib/defineAgeWord'
import { defineGender } from '@/shared/lib/defineGender'
import { defineRole } from '@/shared/lib/defineRole'
import { LoginModel } from '@/models/profileModel'
import type { UserProfile } from '@/shared/types/profile'

const userProfilesStore = useUserProfilesStore()
const {
  params,
  users,
  lastPage,
  isLoading,
  currentUser,
  loginForm,
} = storeToRefs(userProfilesStore)

const page = ref(1)

async function handleLoadUserProfiles() {
  params.value.skip = (page.value - 1) * 12
  await userProfilesStore.fetchUserProfiles(params.value)
}

async function handleChangeCurrentUser(user: UserProfile) {
  loginForm.value = new LoginModel(user)
  const data = await userProfilesStore.login(loginForm.value)
  if (data)
    await userProfilesStore.fetchUserProfile(data.id)
  await userProfilesStore.fetchUserProfiles(params.value)
}

onMounted(async () => {
  userProfilesStore.findLocalStorageUser()
  if (params.value.limit)
    page.value = Math.trunc(params.value.skip / params.value.limit) + 1
  else page.value = 1
  await userProfilesStore.fetchUserProfiles(params.value)
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <ElTable
      v-loading="isLoading"
      :data="users ?? []"
      :header-row-style="{ height: '48px' }"
      :row-style="{ cursor: 'pointer' }"
      :cell-style="{ height: '48px' }"
      max-height="79vh"
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
      <ElTableColumn label="Username" width="auto">
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
      <ElTableColumn label="Email" width="auto">
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
      <ElTableColumn label="Телефон" width="auto">
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
      <ElTableColumn label="Выбор/смена" width="auto" align="right">
        <template #default="{ row }">
          <ElTooltip
            v-if="currentUser && currentUser?.id !== row.id"
            effect="dark"
            content="Сменить профиль"
            placement="bottom-end"
            class="custom-tooltip"
          >
            <ElIcon
              v-if="currentUser && currentUser?.id !== row.id"
              :size="16"
              color="#409EFF"
              class="mr-5 cursor-pointer"
              @click="handleChangeCurrentUser(row)"
            >
              <Edit />
            </ElIcon>
          </ElTooltip>
          <ElTooltip
            v-if="!currentUser"
            effect="dark"
            content="Выбрать профиль"
            placement="bottom-end"
            class="custom-tooltip"
          >
            <ElIcon
              v-if="!currentUser"
              :size="16"
              color="#409EFF"
              class="mr-5 cursor-pointer"
              @click="handleChangeCurrentUser(row)"
            >
              <Check />
            </ElIcon>
          </ElTooltip>
        </template>
      </ElTableColumn>
    </ElTable>
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
