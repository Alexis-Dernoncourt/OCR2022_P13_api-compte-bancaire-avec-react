import { Link, NavLink } from "react-router-dom"
import { useLogout, useTokenJWTDecoded } from "../../hooks/auth"

export default function AuthStatus() {
  const { logoutUser } = useLogout()
  const { userToken, data, isLoading, isError } = useTokenJWTDecoded()

  if (!userToken) {
    return (
      <>
        <NavLink className="main-nav-item" to="/sign-in">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          Sign In
        </NavLink>
      </>
    )
  }

  return (
    <>
      <NavLink className="main-nav-item" to="/profile">
        <i className="fa fa-user-circle" aria-hidden="true"></i>
        {!isLoading && !isError && data ? `${data?.body.firstName}` : "Profil"}
      </NavLink>
      <Link to={"#"} className="main-nav-item" type="button" onClick={logoutUser}>
        <i className="fa fa-sign-out" aria-hidden="true"></i>
        Logout
      </Link>

    </>
  )
}
