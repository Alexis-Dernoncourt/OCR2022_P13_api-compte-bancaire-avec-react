import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { loginUserAction } from "../../../redux/slices/userSlice"
import "./SignIn.css"
// import { AuthStatus } from "../../../config/auth/AuthStatus"
import { useLocation } from "react-router-dom"
import { apiLogin } from "../../../api"
import { LoginResponseType } from "../../../config/types"

export default function SignIn() {
  const [firstName, setFirstName] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  console.log("🚀 ~ SignIn ~ location:", location)
  const dispatch = useDispatch()

  async function loginUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    setLoading(true)
    try {
      const bodyData = {
        email: firstName,
        password,
      }
      const loginResponse: LoginResponseType = await apiLogin(bodyData)
      loginResponse.status === 400 && toast.error(loginResponse.message)

      if (loginResponse.status === 200 && loginResponse.body.token) {
        if (rememberMe) {
          localStorage.setItem("token", loginResponse.body.token)
        }
        dispatch(
          loginUserAction({
            email: bodyData.email,
            token: loginResponse.body.token,
          })
        )
        toast.success(loginResponse.message)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("🚀 ~ loginUser ~ error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={e => setFirstName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            onChange={e => setRememberMe(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button
          className="sign-in-button"
          onClick={e => loginUser(e)}
          disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      {/* <section>
        <AuthStatus />
      </section> */}
    </section>
  )
}
