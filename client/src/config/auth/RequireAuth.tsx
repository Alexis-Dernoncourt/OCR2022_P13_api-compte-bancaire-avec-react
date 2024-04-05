import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/auth"

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const location = useLocation()

  return (
    <>
      {!auth.token ? (
        <Navigate to="/sign-in" state={{ from: location }} replace />
      ) : (
        <>{children}</>
      )}
    </>
  )
}
