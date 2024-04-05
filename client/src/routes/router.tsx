import { Route, Routes } from "react-router-dom"
import Layout from "../components/Layout/Layout"
import RequireAuth from "../config/auth/RequireAuth"
import User from "../pages/auth/User/User"
import Home from "../pages/public/Home/Home"
import SignIn from "../pages/public/SignIn/SignIn"

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <User />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  )
}
