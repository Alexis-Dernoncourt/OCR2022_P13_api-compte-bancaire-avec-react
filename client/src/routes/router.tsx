import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "../components/Layout/Layout"
import RequireAuth from "../config/auth/RequireAuth"
import { useAuth } from "../hooks/auth"
import User from "../pages/auth/User/User"
import Home from "../pages/public/Home/Home"
import SignIn from "../pages/public/Sign/SignIn"

export default function Router() {
  const user = useAuth()
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={!user.token ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-up"
          element={!user.token ? <SignIn /> : <Navigate to="/" />}
        />
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
