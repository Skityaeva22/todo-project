import type {
  LoginForm,
  UserLoginResponse,
  UserProfile,
  UserProfileForm,
  UserProfileRequest,
  UserProfileResponse,
} from '@/shared/types/profile'

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

/**
 * Функция для создания профиля пользователя
 * @param {UserProfileForm} user - форма записи пользователя
 * @returns {Promise<UserProfile>} - ответ
 */
async function createUserProfile(user: UserProfileForm): Promise<UserProfile> {
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

/**
 * Функция для авторизации пользователя
 * @param {LoginForm}login - форма авторизации
 * @returns {Promise<UserLoginResponse>} - ответ
 */
async function login(login: LoginForm): Promise<UserLoginResponse> {
  const response = await fetch('https://dummyjson.com/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: login.username,
      password: login.password,
      expiresInMins: 30,
    }),
  })

  if (!response.ok)
    throw new Error('Ошибка авторизации')

  const data: UserLoginResponse = await response.json()
  return data
}

/**
 * Функция для получения данных текущего пользователя
 * @param {string}accessToken - токен авторизации
 * @returns {Promise<UserProfile>} - ответ
 */
async function fetchCurrentUser(accessToken: string): Promise<UserProfile> {
  const response = await fetch('https://dummyjson.com/user/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  if (!response.ok)
    throw new Error('Ошибка при получении данных текущего пользователя')

  const data: UserProfile = await response.json()
  return data
}

/**
 * Функция для получения данных пользователя по id
 * @param {number}id - id пользователя
 * @returns {Promise<UserProfile>} - ответ
 */
async function fetchUserProfile(id: number): Promise<UserProfile> {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`)

    if (!response.ok)
      throw new Error(`Error: ${response.status}`)

    const data: UserProfile = await response.json()
    return data
  }
  catch (error) {
    console.error('Failed to fetch user:', error)
    throw error
  }
}

export { fetchUserProfiles, createUserProfile, login, fetchCurrentUser, fetchUserProfile }
