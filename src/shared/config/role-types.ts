import type { RoleTypes } from '../types/profile'

export const ROLE_TYPES: { [key: string]: RoleTypes } = {
  ADMIN: 'admin',
  USER: 'user',
}

export const ROLE_TYPES_DISPLAY: { [key: string]: string } = {
  ADMIN: 'Админ',
  USER: 'Простой пользователь',
}

export const ROLE_TYPES_OPTIONS: { id: number, label: string, value: string }[] = [
  { id: 1, label: ROLE_TYPES_DISPLAY.ADMIN, value: ROLE_TYPES.ADMIN },
  { id: 2, label: ROLE_TYPES_DISPLAY.USER, value: ROLE_TYPES.USER },
]
