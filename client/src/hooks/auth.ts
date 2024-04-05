import { useSelector } from "react-redux"
import { UserState } from "../config/types"

export function useAuth() {
  const user = useSelector((state: UserState) => state)
  return user
}
