import type { GenderTypes } from '../types/profile'

export function defineGender(gender: GenderTypes) {
  switch (gender) {
    case 'male':
      return 'Муж.'
    case 'female':
      return 'Жен.'
    default:
      return '-'
  }
}
