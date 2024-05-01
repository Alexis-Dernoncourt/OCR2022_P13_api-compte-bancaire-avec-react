import Skeleton from "react-loading-skeleton"
import { Link, NavLink } from "react-router-dom"
import { useGetUserData, useLogout } from "../../hooks/auth"

export default function AuthStatus() {
  const { logoutUser } = useLogout()
  const { userToken, data, isLoading } = useGetUserData()
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
      {isLoading && !data ? (
        <div className="main-nav-item with-skeleton">
          <Skeleton />
        </div>
      ) : (
        data && (
          <NavLink className="main-nav-item with-skeleton" to="/profile">
            <i className="fa fa-user-circle" aria-hidden="true"></i>
            {`${data?.body?.firstName}` ?? "Profil"}
          </NavLink>
        )
      )}
      <Link
        to={"#"}
        className="main-nav-item"
        type="button"
        onClick={logoutUser}>
        <i className="fa fa-sign-out" aria-hidden="true"></i>
        Logout
      </Link>
    </>
  )
}
