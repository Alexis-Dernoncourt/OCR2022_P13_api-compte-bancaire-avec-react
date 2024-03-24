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
  token: string
}

export type UserProfileType = {
  firsName: string
  lastName: string
}
