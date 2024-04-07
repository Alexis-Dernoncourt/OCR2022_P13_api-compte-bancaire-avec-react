import "./SignIn.css"
// import { AuthStatus } from "../../../config/auth/AuthStatus"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { apiLogin } from "../../../api"
import Input from "../../../components/Form/Input"
import { SignInValidationSchema } from "../../../components/Form/formValidation"
import { LoginApiResponseType, loginApiDataType } from "../../../config/types"
import { loginUserAction } from "../../../redux/slices/userSlice"

export default function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = useForm<LoginApiResponseType>({
    resolver: zodResolver(SignInValidationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<LoginApiResponseType> = async (data, e) => {
    console.log("SubmitHandler ~ data:", data)
    e?.preventDefault()
    toast.loading("Envoi...", { id: "loading" })
    try {
      const bodyData = {
        email: data.email,
        password: data.password,
      }

      const apiResponse = await apiLogin(bodyData as loginApiDataType)
      apiResponse!.status === 400 && toast.error(apiResponse!.message)

      if (apiResponse.status === 200 && apiResponse.body.token) {
        if (location.pathname === "/sign-in") {
          dispatch(
            loginUserAction({
              email: bodyData.email,
              token: apiResponse.body.token,
              rememberMe: data.rememberMe,
            })
          )
        }

        toast.success(apiResponse.message)
        navigate("/profile", { replace: true })
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("🚀 ~ loginUser ~ error:", error)
      toast.error("Il y a eu une erreur")
    } finally {
      toast.remove("loading")
    }
  }

  const wrapperClass = "input-wrapper"

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          type="email"
          name="email"
          label="Email"
          error={errors.email?.message}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          wrapperClass={wrapperClass}
        />

        <Input
          register={register}
          type="password"
          name="password"
          label="Password"
          error={errors.password?.message}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          wrapperClass={wrapperClass}
        />

        <Input
          register={register}
          type="checkbox"
          name="rememberMe"
          label="Remember me"
          error={errors.rememberMe?.message}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          wrapperClass="input-remember"
        />
        <button
          type="submit"
          className="sign-in-button"
          disabled={isSubmitting || isLoading || !isValid}>
          {isSubmitting || isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <p>
        Vous n'avez pas de compte?
        <br />
        <Link
          to="/sign-up"
          state={{ from: location }}
          className="sign-form-link">
          Créer mon compte
        </Link>
      </p>
      {/* <section>
        <AuthStatus />
      </section> */}
    </section>
  )
}
