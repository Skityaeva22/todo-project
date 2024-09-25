import type { UserProfileRequest, UserProfileResponse } from '@/shared/types/profile'

const API_URL = 'https://dummyjson.com/users'

/**
 * Функция для выполнения fetch запроса к API с параметрами
 * @param {UserProfileRequest} params - параметры запроса
 * @returns {Promise<UserProfileResponse>} - ответ
 */
async function fetchUserProfiles(params?: UserProfileRequest): Promise<UserProfileResponse> {
  let url = `${API_URL}`

  if (params) {
    const { limit, skip } = params
    url = `${url}?limit=${limit}&skip=${skip}`
  }

  const response = await fetch(url)
  if (!response.ok)
    throw new Error(`Ошибка HTTP: ${response.status}`)

  const data: UserProfileResponse = await response.json()
  return data
}

export { fetchUserProfiles }
