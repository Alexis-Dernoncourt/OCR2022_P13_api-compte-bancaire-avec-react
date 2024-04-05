import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/auth"

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAuth()
  console.log("🚀 ~ RequireAuth ~ auth:", user)
  const location = useLocation()

  return (
    <>
      {!user.token ? (
        <Navigate to="/sign-in" state={{ from: location }} replace />
      ) : (
        <>{children}</>
      )}
    </>
  )
}
