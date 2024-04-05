import { Route, Routes } from "react-router-dom"
import SignIn from "../pages/public/SignIn/SignIn"
import User from "../pages/auth/User/User"
import Layout from "../components/Layout/Layout"
import Home from "../pages/public/Home/Home"
import RequireAuth from "../config/auth/RequireAuth"

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/dashboard"
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
