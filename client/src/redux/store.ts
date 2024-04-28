/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { authApi } from "./services/authService"
import userSlice from "./slices/userSlice"

import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit"
import { isRejectedWithValue } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import { history } from "../config"
import { removeUserSessionStorage } from "../hooks/auth"

const toastErrorOptions = {
  icon: "❌",
  style: {
    backgroundColor: "#fff",
    color: "#2c3e50",
  },
}
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      if (action.meta.requestStatus === "rejected") {
        if ((action.payload as any).status === 401) {
          removeUserSessionStorage({ dispatchAction: api.dispatch })
          toast.error("Action non authorisée. Veuillez vous reconnecter", {
            duration: 5000,
            id: "unauthorized",
            ...toastErrorOptions,
          })
          history.navigate("/sign-in")
        }
        // prevent brute force attack from displaying error messages
        // must not assume that email is already used
        else if ((action.payload as any).status === 400) {
          toast.error("Vos données semblent invalides. Veuillez reessayer", {
            duration: 4000,
            ...toastErrorOptions,
          })
        } else {
          toast.error(
            (action.payload as any).data.message || "Il y a eu une erreur",
            {
              duration: 4000,
              ...toastErrorOptions,
            }
          )
        }
      }
    }
    return next(action)
  }

const rootReducer = combineReducers({
  user: userSlice,
  [authApi.reducerPath]: authApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(rtkQueryErrorLogger),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
