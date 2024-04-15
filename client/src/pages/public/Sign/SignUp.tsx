import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Input from "../../../components/Form/Input"
import { SignUpValidationSchema } from "../../../components/Form/formValidation"
import { SignupPayloadType, UserType } from "../../../config/types"
import { useRegisterUserMutation } from "../../../redux/services/authService"
import "./SignIn.css"

export default function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  // const dispatch = useDispatch()

  const [registerUser, { isLoading }] = useRegisterUserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupPayloadType>({
    resolver: zodResolver(SignUpValidationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<SignupPayloadType> = async (data, e) => {
    e?.preventDefault()
    toast.loading("Envoi...", { id: "loading" })
    try {
      const bodyData: UserType = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }

      const apiResponse = await registerUser(bodyData).unwrap()
      toast.success(apiResponse.message)
      toast.success(
        `Bienvenue ${apiResponse.body.firstName}, vous pouvez maintenant vous connecter !`,
        {
          icon: "🎉",
        }
      )
      navigate("/sign-in", { replace: true })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("🚀 ~ signupUser ~ error:", error)
      toast.error(error.data?.message || "Il y a eu une erreur")
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

        <button
          type="submit"
          className="sign-in-button"
          disabled={isSubmitting || !isValid}>
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
