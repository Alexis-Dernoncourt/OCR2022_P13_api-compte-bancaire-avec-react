import { Dispatch, SerializedError, UnknownAction } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ErrorApiResponseType } from "../config/types"
import { useGetUserDataQuery } from "../redux/services/authService"
import { logoutUserAction } from "../redux/slices/userSlice"
import { RootState } from "../redux/store"

export function useAuth() {
  const token = useSelector((state: RootState) => state.user.token)
  const storedToken = localStorage.getItem("userToken") || token
  const [userToken, setUserToken] = useState(storedToken)

  useEffect(() => {
    setUserToken(storedToken)
  }, [storedToken])

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

export function useApiUnauthorized(
  error: FetchBaseQueryError | SerializedError | undefined,
  isError: boolean
) {
  const errorData = error as FetchBaseQueryError
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (isError && errorData && errorData.status === 401) {
      // TODO: if errorData.data.message === "jwt malformed" we could signal / block IP ?
      console.log("🚀 ~ useApiUnauthorized ~ data:", error)
      removeUserSessionStorage({ dispatchAction: dispatch })
      toast.error("Non authorisé. Veuillez vous connecter", {
        duration: 3000,
        icon: "❌",
        style: {
          backgroundColor: "#fff",
          color: "#2c3e50",
        },
        id: "unauthorized",
      })
      navigate("/sign-in", { replace: true })
    } else if (
      isError &&
      errorData &&
      (errorData.data as ErrorApiResponseType)?.message
    ) {
      toast.error((errorData.data as ErrorApiResponseType).message, {
        duration: 3000,
        icon: "❌",
        style: {
          backgroundColor: "#fff",
          color: "#2c3e50",
        },
      })
    }
    return () => {
      toast.remove("unauthorized")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, errorData, isError])
}
