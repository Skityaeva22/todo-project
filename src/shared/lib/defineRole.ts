import type { RoleTypes } from '../types/profile'

export function defineRole(role: RoleTypes) {
  switch (role) {
    case 'admin':
      return 'Админ'
    case 'user':
      return 'Прост. пользователь'
    default:
      return '-'
  }
}
