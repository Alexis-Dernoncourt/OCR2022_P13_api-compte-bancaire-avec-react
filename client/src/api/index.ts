import { BaseURL } from "../config"
import { LoginType } from "../config/types"

export const apiLogin = async (
  loginData: Pick<LoginType, "email" | "password">
) => {
  const res = await fetch(`${BaseURL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
  const data = await res.json()
  return data
}
