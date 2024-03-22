import { useState } from "react"
import "./SignIn.css"
import { useDispatch } from "react-redux"
import { loginUserAction } from "../../../redux/slices/userSlice"
import { BaseURL } from "../../../config"
import toast from "react-hot-toast"

export default function SignIn() {
  const [firstName, setFirstName] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  async function loginUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    setLoading(true)
    // TODO: if user checked the 'remember me' option persist the token into localstorage; otherwise, do NOT persist
    console.log("🚀 ~ SignIn ~ rememberMe:", rememberMe)
    try {
      const bodyData = {
        email: firstName,
        password,
      }
      const apiLogin = await fetch(`${BaseURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      })
      const data = await apiLogin.json()
      // console.log("🚀 ~ loginUser ~ data:", data)
      if (data.body.token) {
        localStorage.setItem("token", data.body.token)
        dispatch(
          loginUserAction({ email: bodyData.email, token: data.body.token })
        )
        toast.success(data.message)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("🚀 ~ loginUser ~ error:", error)
      error.message && toast.error(error.message)
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
          onClick={async e => await loginUser(e)}
          disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </section>
  )
}
