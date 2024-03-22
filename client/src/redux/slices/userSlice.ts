import { createSlice } from "@reduxjs/toolkit"
// import type { PayloadAction } from "@reduxjs/toolkit"

export interface UserState {
  firstname: string
  lastname: string
  email: string
  token: string
}

const initialState: UserState = {
  firstname: "",
  lastname: "",
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
    // immutable state based off those changes
    // increment: state => {
    //   state.value += 1
    // },
    // decrement: state => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions

export default userSlice.reducer
