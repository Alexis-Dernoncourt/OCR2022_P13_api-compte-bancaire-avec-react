import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BaseURL } from "../../config"
import {
  ErrorApiResponseType,
  GetProfileResponseType,
  LoginResponseType,
  SignupApiResponseType,
  UserProfileType,
  UserReduxState,
  UserType,
  loginApiDataType,
  updateUserApiResponseType,
} from "../../config/types"

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["USER"],
  // refetchOnFocus: true,
  // keepUnusedDataFor: 60 * 60,
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: BaseURL,
    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepareHeaders: (headers, { getState }: any) => {
      headers.set("Content-Type", "application/json")
      const userStateToken: UserReduxState = getState().user.token
      const token = localStorage.getItem("userToken") || userStateToken
      if (token) {
        // include token in req header
        headers.set("authorization", `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints: builder => ({
    registerUser: builder.mutation<SignupApiResponseType, UserType>({
      query: data => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation<LoginResponseType, loginApiDataType>({
      query: data => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
    getUserData: builder.query<GetProfileResponseType, null>({
      query: () => ({
        url: "/user/profile",
        method: "POST",
      }),
      providesTags: () => [{ type: "USER", id: "ALL" }],
    }),
    updateUserData: builder.mutation<
      updateUserApiResponseType | ErrorApiResponseType,
      UserProfileType
    >({
      query: data => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: () => [{ type: "USER", id: "ALL" }],
    }),
  }),
})

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} = authApi
