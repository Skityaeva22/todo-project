/** Параметры запроса профилей */
export interface UserProfileRequest {
  limit: number
  skip: number
}

/** Ответ API */
export interface UserProfileResponse extends UserProfileResponceInfo {
  users: UserProfile[]
}

/** Информация о запросе */
export interface UserProfileResponceInfo {
  total: number
  skip: number
  limit: number
}

/** Данные для авторизации */
export interface LoginForm {
  username: string
  password: string
}

/** Ответ после авторизации */
export interface UserLoginResponse {
  id: 1
  username: string
  email: string
  firstName: string
  lastName: string
  gender: GenderTypes | string
  image: string
  accessToken: string // JWT accessToken (for backward compatibility) in response and cookies
  refreshToken: string // refreshToken in response and cookies
}

/** Профиль пользователя */
export interface UserProfile {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: GenderTypes
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: EyeColorTypes
  hair: Hair
  ip: string
  address: Address
  macAddress: string
  university: string
  bank: Bank
  company: Company
  ein: string
  ssn: string
  userAgent: string
  crypto: Crypto
  role: RoleTypes
}

/** Форма записи профиля пользователя */
export interface UserProfileForm {
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
}

export interface Hair {
  color: HairColorTypes
  type: HairTypes
}

export interface Address {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: Coordinate
  country: string
}

export interface Coordinate {
  lat: number
  lng: number
}

export interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: CardTypes
  currency: Currencytypes
  iban: string
}

export interface Company {
  department: string
  name: string
  title: string
  address: Address
}

export interface Crypto {
  coin: string
  wallet: string
  network: string
}

export type GenderTypes =
  'male'
  | 'female'

export type EyeColorTypes =
  'Green'
  | 'Red'
  | 'Hazel'
  | 'Amber'
  | 'Blue'
  | 'Brown'
  | 'Violet'
  | 'Gray'

export type HairColorTypes =
  'Green'
  | 'Brown'
  | 'White'
  | 'Blonde'
  | 'Gray'
  | 'Red'
  | 'Purple'
  | 'Blue'
  | 'Black'

export type HairTypes =
  'Curly'
  | 'Straight'
  | 'Wavy'
  | 'Kinky'

export type CardTypes =
  'Elo'
  | 'Korean Express'
  | 'Mastercard'
  | 'American Express'
  | 'Diners Club International'
  | 'JCB'
  | 'Maestro'
  | 'Visa'
  | 'NPS'
  | 'Discover'
  | 'Carte Bancaire'
  | 'Mir'
  | 'UnionPay'
  | 'RuPay'
  | 'BC Card'

export type Currencytypes =
  'CNY'
  | 'SEK'
  | 'INR'
  | 'CAD'
  | 'BRL'
  | 'EUR'
  | 'GBP'
  | 'USD'
  | 'NZD'
  | 'PKR'
  | 'TRY'
  | 'JPY'

export type RoleTypes =
  'user'
  | 'admin'
