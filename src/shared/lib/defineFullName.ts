import type { UserProfile } from '../types/profile'

export function defineFullName(user: UserProfile) {
  const words = []

  if (user?.lastName)
    words.push(user?.lastName)
  if (user?.firstName)
    words.push(user?.firstName)
  if (user?.maidenName)
    words.push(user?.maidenName)

  return words.join(' ')
}
