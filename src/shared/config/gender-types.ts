import type { GenderTypes } from '../types/profile'

export const GENDER_TYPES: { [key: string]: GenderTypes } = {
  MALE: 'male',
  FEMALE: 'female',
}

export const GENDER_TYPES_DISPLAY: { [key: string]: string } = {
  MALE: 'Мужской',
  FEMALE: 'Женский',
}

export const GENDER_TYPES_OPTIONS: { id: number, label: string, value: string }[] = [
  { id: 1, label: GENDER_TYPES_DISPLAY.MALE, value: GENDER_TYPES.MALE },
  { id: 2, label: GENDER_TYPES_DISPLAY.FEMALE, value: GENDER_TYPES.FEMALE },
]
