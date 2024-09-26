import { defineStore } from 'pinia'
import { createUserProfile, fetchCurrentUser, fetchUserProfiles, login } from '@/services/profilesService'
import type { LoginForm, UserProfile, UserProfileForm, UserProfileRequest } from '@/shared/types/profile'
import { LoginModel, ProfileModel } from '@/models/profileModel'
import { customNotification } from '@/shared/notify/notify'

export const useUserProfilesStore = defineStore('user-profiles-store', {
  state: () => ({
    users: [] as UserProfile[],
    lastPage: 1,
    isLoading: false,
    params: {
      limit: 12,
      skip: 0,
    } as UserProfileRequest,
    form: new ProfileModel() as UserProfileForm,
    loginForm: new LoginModel() as LoginForm,
    currentUser: {} as UserProfile | null,
  }),
  actions: {
    resetParams() {
      this.params = {
        limit: 12,
        skip: 0,
      }
    },
    resetVariables() {
      this.users = []
      this.lastPage = 1
      this.isLoading = false
    },
    resetForm() {
      this.form = new ProfileModel()
    },
    resetLoginForm() {
      this.loginForm = new LoginModel()
    },
    resetCurrentUser() {
      this.currentUser = null
    },
    async fetchUserProfiles(params?: UserProfileRequest) {
      this.isLoading = true
      try {
        const data = await fetchUserProfiles(params)
        this.users = data.users
        this.lastPage = data.total
      }
      catch (e) {
        customNotification({ message: 'Ошибка при выводе списка профилей', type: 'error' })
      }
      finally {
        this.isLoading = false
      }
    },
    async createUserProfile(form: UserProfileForm) {
      try {
        const data = await createUserProfile(form)
        if (data) {
          customNotification({ message: 'Данные профиля успешно сохранены', type: 'success' })
          await fetchUserProfiles(this.params)
        }
      }
      catch (e) {
        customNotification({ message: 'Ошибка при сохранении данных', type: 'error' })
      }
    },
    async fetchCurrentUser(accessToken: string) {
      const data = await fetchCurrentUser(accessToken)
      this.currentUser = data
      customNotification({ message: 'Данные пользователя успешно загружены', type: 'success' })
    },
    async login(loginForm: LoginForm) {
      try {
        const data = await login(loginForm)
        return data
      }
      catch (e) {
        customNotification({ message: 'Ошибка авторизации', type: 'error' })
      }
    },
    reset() {
      this.resetParams()
      this.resetVariables()
      this.resetForm()
    },
  },
})
