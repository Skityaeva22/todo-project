import { defineStore } from 'pinia'
import { createUserProfile, fetchCurrentUser, fetchUserProfile, fetchUserProfiles, login } from '@/services/profilesService'
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
    setCurrentUser(user: UserProfile) {
      this.currentUser = user
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
    async fetchUserProfile(id: number) {
      try {
        const data = await fetchUserProfile(id)
        this.currentUser = data
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        customNotification({ message: 'Данные профиля успешно получены', type: 'success' })
      }
      catch (e) {
        customNotification({ message: 'Ошибка при получении данных', type: 'error' })
      }
    },
    async createUserProfile(form: UserProfileForm) {
      try {
        const data = await createUserProfile(form)
        if (data) {
          customNotification({ message: 'Данные профиля успешно сохранены', type: 'success' })
          await this.fetchUserProfiles(this.params)
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
        localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
        return data
      }
      catch (e) {
        customNotification({ message: 'Ошибка авторизации', type: 'error' })
      }
    },
    async removeLocalStorageUser() {
      localStorage.removeItem('currentUser')
      this.resetCurrentUser()
      await this.fetchUserProfiles(this.params)
    },
    findLocalStorageUser() {
      const localStorageUser: null | string = localStorage.getItem('currentUser')
      if (localStorageUser)
        this.setCurrentUser(JSON.parse(localStorageUser))
      else this.resetCurrentUser()
    },
    reset() {
      this.resetParams()
      this.resetVariables()
      this.resetForm()
    },
  },
})
