// ➡️ http://localhost:3001/api-docs

export type UserType = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type LoginApiResponseType = {
  email: string
  password: string
  rememberMe: boolean
}

export type SignupApiResponseType = {
  status: number
  message: string
  body: {
    _id: string
    firstName: string
    lastName: string
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

export type GetProfileResponseType = {
  status: number
  message: string
  body: UserDataType
}

export type UserProfileType = {
  firstName: string
  lastName: string
}

// Redux types
export interface UserState {
  id: string
  firstname: string
  lastname: string
  email: string
  token: string | null
  rememberMe: boolean
}

export interface UserDataType extends UserType {
  updatedAt: string
  createdAt: string
}

export type loginApiDataType = Pick<LoginApiResponseType, "email" | "password">
export type SignupPayloadType = UserType & {
  confirmPassword?: string
  rememberMe: boolean
}
export type UserReduxState = Pick<UserState, "email"> & {
  token: string
}
export type ErrorApiResponseType = Pick<LoginResponseType, "status" | "message">
export type updateUserApiResponseType = Pick<
  LoginResponseType,
  "status" | "message"
> & { body: Pick<UserState, "id" | "email"> }
