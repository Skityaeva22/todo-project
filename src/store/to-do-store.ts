import { defineStore } from 'pinia'
import { fetchTodos } from '@/services/todosService'
import type { Todo, TodosRequest } from '@/shared/types/to-do'
import { customNotification } from '@/shared/notify/notify'

export const useToDoStore = defineStore('to-do-store', {
  state: () => ({
    todos: [] as Todo[],
    lastPage: 1,
    isLoading: false,
    params: {
      limit: 12,
      skip: 0,
    } as TodosRequest,
  }),
  actions: {
    resetParams() {
      this.params = {
        limit: 12,
        skip: 0,
      }
    },
    resetVariables() {
      this.todos = []
      this.lastPage = 1
      this.isLoading = false
    },
    async fetchToDos(params?: TodosRequest) {
      this.isLoading = true
      try {
        const data = await fetchTodos(params)
        this.todos = data.todos
        this.lastPage = data.total
      }
      catch (e) {
        customNotification({ message: 'Ошибка при выводе списка ToDo', type: 'error' })
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
