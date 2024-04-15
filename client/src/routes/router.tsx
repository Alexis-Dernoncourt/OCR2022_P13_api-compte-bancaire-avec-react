import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "../components/Layout/Layout"
import RequireAuth from "../config/auth/RequireAuth"
import { useAuth } from "../hooks/auth"
import User from "../pages/auth/User/User"
import Home from "../pages/public/Home/Home"
import SignIn from "../pages/public/Sign/SignIn"
import SignUp from "../pages/public/Sign/SignUp"

export default function Router() {
  const userToken = useAuth()
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={!userToken ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-up"
          element={!userToken ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="/*" element={<Navigate to="/" replace />} />
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
