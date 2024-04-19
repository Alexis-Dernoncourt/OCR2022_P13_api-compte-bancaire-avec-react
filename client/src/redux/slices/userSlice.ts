import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserReduxState } from "../../config/types"

const initialState: UserReduxState = {
  email: "",
  token: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes.
    // Exemple :
    //     increment: state => {
    //         state.value -= 1
    //     }
    loginUserAction: (state, action: PayloadAction<UserReduxState>) => {
      state.email = action.payload.email
      state.token = action.payload.token
    },
    logoutUserAction: state => {
      state.email = ""
      state.token = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginUserAction, logoutUserAction } = userSlice.actions

export default userSlice.reducer
