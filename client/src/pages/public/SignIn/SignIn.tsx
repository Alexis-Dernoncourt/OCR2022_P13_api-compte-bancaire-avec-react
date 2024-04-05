import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { loginUserAction } from "../../../redux/slices/userSlice"
import "./SignIn.css"
// import { AuthStatus } from "../../../config/auth/AuthStatus"
import { SubmitHandler, useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { apiLogin } from "../../../api"
import { LoginResponseType, LoginType } from "../../../config/types"
import { useAuth } from "../../../hooks/auth"

export default function SignIn() {
  const user = useAuth()
  useEffect(() => {
    if (user.token) {
      navigate("/profile")
    }
    return () => {}
  })

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log("🚀 ~ SignIn ~ location:", location)

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = useForm<LoginType>()
  console.log("🚀 ~ SignIn ~ errors:", errors)
  // console.log(watch("email"))

  const onSubmit: SubmitHandler<LoginType> = async (data, e) => {
    console.log("SubmitHandler ~ data:", data)
    e?.preventDefault()
    toast.loading("Envoi...", { id: "loading" })
    try {
      const bodyData = {
        email: data.email,
        password: data.password,
      }
      const loginResponse: LoginResponseType = await apiLogin(bodyData)
      loginResponse.status === 400 && toast.error(loginResponse.message)

      if (loginResponse.status === 200 && loginResponse.body.token) {
        // if (data.rememberMe) {
        //   localStorage.setItem("token", loginResponse.body.token)
        // }
        dispatch(
          loginUserAction({
            email: bodyData.email,
            token: loginResponse.body.token,
            rememberMe: data.rememberMe,
          })
        )
        toast.success(loginResponse.message)
        navigate("/profile", { replace: true })
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("🚀 ~ loginUser ~ error:", error)
    } finally {
      toast.remove("loading")
    }
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <label htmlFor="username">Email</label>
          <input
            {...register("email", { required: "Veuillez entrer votre email" })}
            type="text"
            id="email"
            className={errors.email ? "invalid" : ""}
            aria-invalid={errors.email ? "true" : "false"}
            disabled={isSubmitting || isLoading}
          />
          {
            <span className="error-message">
              {errors.email && errors.email.message}
            </span>
          }
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Veuillez entrer votre mot de passe",
            })}
            type="password"
            id="password"
            className={errors.password ? "invalid" : ""}
            aria-invalid={errors.password ? "true" : "false"}
            disabled={isSubmitting || isLoading}
          />
          {
            <span className="error-message">
              {errors.password && errors.password.message}
            </span>
          }
        </div>
        <div className="input-remember">
          <input
            {...register("rememberMe")}
            type="checkbox"
            id="remember-me"
            disabled={isSubmitting || isLoading}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button
          type="submit"
          className="sign-in-button"
          disabled={isSubmitting || isLoading || !isValid}>
          {isSubmitting || isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
      {/* <section>
        <AuthStatus />
      </section> */}
    </section>
  )
}
