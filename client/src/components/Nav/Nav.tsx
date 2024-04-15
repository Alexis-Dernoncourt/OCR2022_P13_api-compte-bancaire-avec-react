import { Link } from "react-router-dom"
import { useLogout } from "../../hooks/auth"
import "./Nav.css"
import logo from "/images/argentBankLogo.png"

export default function Nav() {
  const { logoutUser } = useLogout()

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <button className="main-nav-item" type="button" onClick={logoutUser}>
          <i className="fa fa-close"></i>
          Logout
        </button>
        <Link className="main-nav-item" to="/profile">
          <i className="fa fa-user"></i>
          Profil
        </Link>
        <Link className="main-nav-item" to="/sign-in">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  )
}
