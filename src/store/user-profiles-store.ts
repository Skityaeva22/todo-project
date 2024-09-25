import { defineStore } from 'pinia'
import { createUserProfile, fetchUserProfiles } from '@/services/profilesService'
import type { UserProfile, UserProfileForm, UserProfileRequest } from '@/shared/types/profile'
import { ProfileModel } from '@/models/profileModel'
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
    reset() {
      this.resetParams()
      this.resetVariables()
      this.resetForm()
    },
  },
})
