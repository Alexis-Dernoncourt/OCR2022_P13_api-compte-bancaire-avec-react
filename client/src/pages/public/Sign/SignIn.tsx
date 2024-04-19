import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Input from "../../../components/Form/Input"
import { SignInValidationSchema } from "../../../components/Form/formValidation"
import { LoginApiResponseType, loginApiDataType } from "../../../config/types"
import { useLoginUserMutation } from "../../../redux/services/authService"
import { loginUserAction } from "../../../redux/slices/userSlice"
import "./SignIn.css"

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [loginUser, { isLoading }] = useLoginUserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginApiResponseType>({
    resolver: zodResolver(SignInValidationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<LoginApiResponseType> = async (data, e) => {
    e?.preventDefault()
    toast.loading("Envoi...", { id: "loading" })
    try {
      const bodyData: loginApiDataType = {
        email: data.email,
        password: data.password,
      }
      const apiResponse = await loginUser(bodyData).unwrap()

      if (data.rememberMe) {
        localStorage.setItem("userToken", apiResponse.body.token)
        localStorage.setItem("userEmail", bodyData.email)
      } else {
        dispatch(
          loginUserAction({
            token: apiResponse.body.token,
            email: bodyData.email,
          })
        )
      }

      toast.success(apiResponse.message)
      navigate("/profile", {
        replace: true,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("🚀 ~ loginUser ~ error:", error)
      toast.error(error.data?.message || "Il y a eu une erreur")
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
    </section>
  )
}
