import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { useCallback } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useGetUserDataQuery } from "../redux/services/authService"
import { logoutUserAction } from "../redux/slices/userSlice"
import { RootState } from "../redux/store"

export function useAuth() {
  const token = useSelector((state: RootState) => state.user.token)
  const userToken = localStorage.getItem("userToken") || token
  return userToken
}

function getUserSessionStorageLocation() {
  const userToken = localStorage.getItem("userToken")
  return userToken ? "localStorage" : "redux"
}

export async function removeUserSessionStorage({
  dispatchAction,
}: {
  dispatchAction: Dispatch<UnknownAction>
}) {
  if (getUserSessionStorageLocation() === "localStorage") {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userEmail")
  } else {
    dispatchAction(logoutUserAction())
  }
}

export function useLogout() {
  const reduxToken = useSelector((state: RootState) => state.user.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutUser = useCallback(() => {
    if (!localStorage.getItem("userToken") && !reduxToken) {
      return toast.error("Vous êtes déjà déconnecté", {
        duration: 3000,
        icon: "❌",
        style: {
          backgroundColor: "#fff",
          color: "#2c3e50",
        },
      })
    }
    removeUserSessionStorage({ dispatchAction: dispatch })
    toast("Vous êtes déconnecté")
    navigate("/", { replace: true })
  }, [reduxToken])
  return { logoutUser }
}

export function useGetUserData() {
  const userToken = useAuth()
  const { data, error, isLoading, isError } = useGetUserDataQuery(null, {
    skip: !userToken,
  })
  return { data, error, isError, isLoading, userToken }
}
