import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { apiSignup } from "../../../api"
import Input from "../../../components/Form/Input"
import { SignUpValidationSchema } from "../../../components/Form/formValidation"
import { SignupPayloadType, UserType } from "../../../config/types"
import { signupUserAction } from "../../../redux/slices/userSlice"
import "./SignIn.css"

export default function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = useForm<SignupPayloadType>({
    resolver: zodResolver(SignUpValidationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<SignupPayloadType> = async (data, e) => {
    console.log("SubmitHandler ~ data:", data)
    e?.preventDefault()
    toast.loading("Envoi...", { id: "loading" })
    try {
      const bodyData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }

      const apiResponse = await apiSignup(bodyData as UserType)
      apiResponse!.status === 400 && toast.error(apiResponse!.message)

      if (apiResponse.status === 200) {
        dispatch(
          signupUserAction({
            id: apiResponse.body.id,
            firstName: bodyData.firstName,
            lastName: bodyData.lastName,
            email: apiResponse.body.email,
            rememberMe: data.rememberMe,
          })
        )
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <Input
            register={register}
            type="text"
            name="firstName"
            label="Firstname"
            error={errors.firstName?.message}
            isSubmitting={isSubmitting}
            isLoading={isLoading}
            wrapperClass={wrapperClass}
          />

          <Input
            register={register}
            type="text"
            name="lastName"
            label="Lastname"
            error={errors.lastName?.message}
            isSubmitting={isSubmitting}
            isLoading={isLoading}
            wrapperClass={wrapperClass}
          />
        </>

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
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          error={errors.confirmPassword?.message}
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
          {isSubmitting || isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      <p>
        Vous avez un compte?
        <br />
        <Link
          to="/sign-in"
          state={{ from: location }}
          className="sign-form-link">
          Me connecter
        </Link>
      </p>
    </section>
  )
}
