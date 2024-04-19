import { Link } from "react-router-dom"
import AuthStatus from "../../config/auth/AuthStatus"
import "./Nav.css"
import logo from "/images/argentBankLogo.png"

export default function Nav() {
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
        <AuthStatus />
      </div>
    </nav>
  )
}
