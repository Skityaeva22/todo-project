import { defineStore } from 'pinia'
import { fetchUserProfiles } from '@/services/profilesService'
import type { UserProfile, UserProfileRequest } from '@/shared/types/profile'

export const useUserProfilesStore = defineStore('user-profiles-store', {
  state: () => ({
    users: [] as UserProfile[],
    lastPage: 1,
    isLoading: false,
    params: {
      limit: 12,
      skip: 0,
    } as UserProfileRequest,
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
    async fetchUserProfiles(params?: UserProfileRequest) {
      this.isLoading = true
      try {
        const data = await fetchUserProfiles(params)
        this.users = data.users
        this.lastPage = data.total
      }
      catch (e) {
        console.log(e)
      }
      finally {
        this.isLoading = false
      }
    },
    reset() {
      this.resetParams()
      this.resetVariables()
    },
  },
})
