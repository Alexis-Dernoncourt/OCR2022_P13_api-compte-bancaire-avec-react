import { Route, Routes } from "react-router-dom"
import Hero from "../components/Hero/Hero"
import Features from "../components/Features/Features"
import SignIn from "../pages/public/SignIn/SignIn"
import User from "../pages/auth/User/User"

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero />
            <Features />
          </>
        }
      />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/dashbord" element={<User />} />
    </Routes>
  )
}
