import type { UserProfileForm, UserProfileRequest, UserProfileResponse } from '@/shared/types/profile'

const API_URL = 'https://dummyjson.com/users'

/**
 * Функция для получения списка пользователей
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

async function createUserProfile(user: UserProfileForm): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error('Ошибка:', error)
    throw error
  }
}

export { fetchUserProfiles, createUserProfile }
