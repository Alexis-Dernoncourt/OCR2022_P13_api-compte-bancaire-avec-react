import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/auth"
import { logoutUserAction } from "../../redux/slices/userSlice"
import { persistor } from "../../redux/store"
import "./Nav.css"
import logo from "/images/argentBankLogo.png"

export default function Nav() {
  const dispatch = useDispatch()
  const user = useAuth()

  const logoutUser = () => {
    if (!user.token) {
      toast.error("Vous êtes déjà déconnecté", {
        duration: 3000,
        icon: "❌",
        style: {
          backgroundColor: "#fff",
          color: "#2c3e50",
        },
      })
      return
    }
    dispatch(logoutUserAction())
    persistor.purge()
    toast.success("Vous êtes bien déconnecté")
  }

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
          <i className="fa fa-logout"></i>
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
