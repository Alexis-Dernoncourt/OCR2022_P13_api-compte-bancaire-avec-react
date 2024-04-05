import { useAuth } from "../../hooks/auth"

export default function AuthStatus() {
  const auth = useAuth()
  // const navigate = useNavigate()

  if (!auth.token) {
    return <p>You are not logged in.</p>
  }

  return (
    <p>
      Welcome {auth.firstname}!{" "}
      <button
        onClick={() => {
          console.log("🚀 ~ AuthStatus ~ auth:", auth)
          //   auth.signout(() => navigate("/"))
        }}>
        Sign out
      </button>
    </p>
  )
}
