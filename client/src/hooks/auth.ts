import { Dispatch, SerializedError, UnknownAction } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { ErrorApiResponseType } from "../config/types"
import { logoutUserAction } from "../redux/slices/userSlice"

export function useAuth() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reduxToken = useSelector((state: any) => state.user.token)
  const userTokenData = localStorage.getItem("userToken") || reduxToken
  const [userToken, setUserToken] = useState(userTokenData)
  const { pathname } = useLocation()

  useEffect(() => {
    setUserToken(userTokenData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  return userToken
}

function getUserSessionStorage() {
  const userTokenLocal = localStorage.getItem("userToken")
  if (userTokenLocal) {
    return "localStorage"
  }
  return "redux"
}

export function removeUserSessionStorage({
  dispatchAction,
}: {
  dispatchAction: Dispatch<UnknownAction>
}) {
  if (getUserSessionStorage() === "localStorage") {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userEmail")
  } else {
    dispatchAction(logoutUserAction())
  }
}

export function useLogout() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reduxToken = useSelector((state: any) => state.user.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutUser = () => {
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
  }
  return { logoutUser }
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

  return
}
