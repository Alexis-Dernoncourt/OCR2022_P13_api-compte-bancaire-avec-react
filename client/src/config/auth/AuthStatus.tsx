import { useAuth } from "../../hooks/auth"

export default function AuthStatus() {
  const userToken = useAuth()
  // const navigate = useNavigate()

  if (!userToken) {
    return <p>You are not logged in.</p>
  }

  return (
    <p>
      Welcome !
      <button
        onClick={() => {
          //   auth.signout(() => navigate("/"))
        }}>
        Sign out
      </button>
    </p>
  )
}
