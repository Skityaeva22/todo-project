<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { onMounted, ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { storeToRefs } from 'pinia'
import GenderSelect from './GenderSelect.vue'
import RolesSelect from './RolesSelect.vue'
import { useUserProfilesStore } from '@/store/user-profiles-store'
import type { UserProfile } from '@/shared/types/profile'
import { ProfileModel } from '@/models/profileModel'
import { useValidate } from '@/shared/lib/composables/useValidate'
import { checkValidForm } from '@/shared/lib/checkValidForm'

const props = defineProps<{
  user?: UserProfile
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const userProfilesStore = useUserProfilesStore()
const { form } = storeToRefs(userProfilesStore)

const {
  validateEmail,
  validatePhone,
  validateFullName,
  validateUsername,
  validatePassword,
} = useValidate()

const formRef = ref<FormInstance>()
const rules = ref<FormRules>({
  email: [{ trigger: 'change', validator: validateEmail }],
  phone: [{ trigger: 'change', validator: validatePhone }],
  firstName: [
    { trigger: 'change', required: true, message: 'Укажите имя' },
    { trigger: 'change', validator: validateFullName },
  ],
  lastName: [
    { trigger: 'change', required: true, message: 'Укажите фамилию' },
    { trigger: 'change', validator: validateFullName },
  ],
  maidenName: [{ trigger: 'change', validator: validateFullName }],
  username: [
    { trigger: 'change', required: true, message: 'Укажите логин' },
    { trigger: 'change', validator: validateUsername },
  ],
  password: [
    { trigger: 'change', required: true, message: 'Укажите пароль' },
    { trigger: 'change', validator: validatePassword },
  ],
})

function resetForm() {
  formRef.value?.resetFields()
  userProfilesStore.resetForm()
}

function handleCloseModal() {
  resetForm()
  emit('close')
}

async function handleCreateUserProfine() {
  if (!formRef.value)
    return

  const isValid = await checkValidForm(formRef.value)
  if (!isValid)
    return

  await userProfilesStore.createUserProfile(form.value)

  resetForm()
  emit('close')
}

onMounted(() => {
  if (props?.user)
    form.value = new ProfileModel(props.user)
  else form.value = new ProfileModel()
})
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center rounded"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="flex w-[40vw] flex-col gap-5 rounded bg-[#FFF] p-[15px]" style="font-family: Arial;">
      <div class="flex w-full items-center justify-between">
        <h3>Новый профиль</h3>
        <ElIcon :size="16" class="cursor-pointer" @click="handleCloseModal">
          <Close />
        </ElIcon>
      </div>
      <ElForm
        ref="formRef"
        label-position="top"
        :model="form"
        :rules="rules"
        class="flex flex-col gap-2.5"
      >
        <div class="flex gap-2.5">
          <ElFormItem
            label="Фамилия"
            prop="lastName"
            class="w-full"
          >
            <ElInput
              v-model="form.lastName"
              placeholder="Введите..."
            />
          </ElFormItem>
          <ElFormItem
            label="Имя"
            prop="firstName"
            class="w-full"
          >
            <ElInput
              v-model="form.firstName"
              placeholder="Введите..."
            />
          </ElFormItem>
          <ElFormItem
            label="Отчество"
            prop="maidenName"
            class="w-full"
          >
            <ElInput
              v-model="form.maidenName"
              placeholder="Введите..."
            />
          </ElFormItem>
        </div>
        <div class="flex gap-2.5">
          <ElFormItem
            label="Почта"
            prop="email"
            class="w-full"
          >
            <ElInput
              v-model="form.email"
              placeholder="example@gmail.com"
            />
          </ElFormItem>
          <ElFormItem
            label="Телефон"
            prop="phone"
            class="w-full"
          >
            <ElInput
              v-model="form.phone"
              placeholder="+ ..."
            />
          </ElFormItem>
        </div>
        <div class="flex gap-2.5">
          <ElFormItem
            label="Возраст"
            prop="age"
            class="w-full"
          >
            <ElInputNumber
              v-model="form.age"
              placeholder="0"
              :controls="false"
              :min="0"
              class="w-full"
            />
          </ElFormItem>
          <ElFormItem
            label="Пол"
            prop="gender"
            class="w-full"
          >
            <GenderSelect v-model="form.gender" />
          </ElFormItem>
          <ElFormItem
            label="День рождения"
            prop="birthDate"
            class="!w-full"
          >
            <ElDatePicker
              v-model="form.birthDate"
              type="date"
              format="DD.MM.YYYY"
              value-format="YYYY-MM-DD"
              class="!w-full"
            />
          </ElFormItem>
        </div>
        <div class="flex gap-2.5">
          <ElFormItem
            label="Логин"
            prop="username"
            class="w-full"
          >
            <ElInput
              v-model="form.username"
              placeholder="Введите..."
            />
          </ElFormItem>
          <ElFormItem
            label="Пароль"
            prop="password"
            class="w-full"
          >
            <ElInput
              v-model="form.password"
              placeholder="Введите..."
            />
          </ElFormItem>
          <ElFormItem
            label="Роль"
            prop="role"
            class="w-full"
          >
            <RolesSelect v-model="form.role" />
          </ElFormItem>
        </div>
      </ElForm>
      <div class="flex items-center justify-end gap-2.5">
        <ElButton @click="handleCloseModal">
          Отмена
        </ElButton>
        <ElButton type="primary" @click="handleCreateUserProfine">
          Сохранить
        </ElButton>
      </div>
    </div>
  </VueFinalModal>
</template>
