import type {
  GenderTypes,
  LoginForm,
  RoleTypes,
  UserProfile,
  UserProfileForm,
} from '@/shared/types/profile'

export class ProfileModel implements UserProfileForm {
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: GenderTypes | string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  role: RoleTypes | string
  constructor(user?: UserProfile) {
    this.firstName = user?.firstName ?? ''
    this.lastName = user?.lastName ?? ''
    this.maidenName = user?.maidenName ?? ''
    this.age = user?.age ?? 0
    this.gender = user?.gender ?? ''
    this.email = user?.email ?? ''
    this.phone = user?.phone ?? ''
    this.username = user?.username ?? ''
    this.password = user?.password ?? ''
    this.birthDate = user?.birthDate ?? ''
    this.role = user?.role ?? ''
  }
}

export class LoginModel implements LoginForm {
  password: string
  username: string
  constructor(user?: UserProfile) {
    this.password = user?.password ?? ''
    this.username = user?.username ?? ''
  }
}
