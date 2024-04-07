import { BaseURL } from "../config"
import {
  LoginResponseType,
  SignupApiResponseType,
  UserType,
  loginApiDataType,
} from "../config/types"

export const apiLogin = async (loginData: loginApiDataType) => {
  const res = await fetch(`${BaseURL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
  const data = await res.json()
  return data as LoginResponseType
}

export const apiSignup = async (signupData: UserType) => {
  const res = await fetch(`${BaseURL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  })
  const data = await res.json()
  return data as SignupApiResponseType
}
