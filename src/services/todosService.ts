import type { TodosRequest, TodosResponse } from '@/shared/types/to-do'

const API_URL = 'https://dummyjson.com/todos'

/**
 * Функция для получения списка ToDo
 * @param {TodosRequest} params - параметры запроса
 * @returns {Promise<TodosResponse>} - ответ
 */
async function fetchTodos(params?: TodosRequest): Promise<TodosResponse> {
  let url = `${API_URL}`

  if (params) {
    const { limit, skip } = params
    url = `${url}?limit=${limit}&skip=${skip}`
  }

  const response = await fetch(url)
  if (!response.ok)
    throw new Error(`Ошибка HTTP: ${response.status}`)

  const data: TodosResponse = await response.json()
  return data
}

export { fetchTodos }
