// ➡️ http://localhost:3001/api-docs

export type UserType = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type ApiResponseType = {
  status: number
  message: string
  body: {
    id: string
    email: string
  }
}

export type LoginResponseType = {
  status: number
  message: string
  body: {
    token: string
  }
}

export type UserProfileType = {
  firsName: string
  lastName: string
}

// Redux types
export interface UserState {
  id: string
  firstname: string
  lastname: string
  email: string
  token: string
  rememberMe: boolean
}

export type LoginPayloadType = Pick<UserState, "email" | "token" | "rememberMe">
