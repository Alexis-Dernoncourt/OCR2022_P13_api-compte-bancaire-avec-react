import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { UserProfileType } from "../../config/types"
import { useUpdateUserDataMutation } from "../../redux/services/authService"
import "./EditUser.css"
import Input from "./Input"
import { EditNameValidationSchema } from "./formValidation"

type EditUserNameProps = {
  setEditName: React.Dispatch<React.SetStateAction<boolean>>
  userName: UserProfileType
}

export default function EditUsername({
  setEditName,
  userName,
}: EditUserNameProps) {
  const [updateUserData] = useUpdateUserDataMutation()
  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = useForm<UserProfileType>({
    resolver: zodResolver(EditNameValidationSchema),
    mode: "onChange",
  })

  const valuesAreEquals = () => {
    return (
      userName.firstName === watch("firstName") &&
      userName.lastName === watch("lastName")
    )
  }

  const handleFormChange = () => {
    if (valuesAreEquals()) {
      setError("root", {
        message: "Veuillez modifer au moins un des champs ou annuler",
      })
    } else {
      clearErrors("root")
    }
  }

  const onSubmit: SubmitHandler<UserProfileType> = async (
    data: UserProfileType
  ) => {
    toast.loading("Envoi...", { id: "loading" })
    try {
      const bodyData: UserProfileType = {
        firstName: data.firstName,
        lastName: data.lastName,
      }
      await updateUserData(bodyData).unwrap()
      toast.success("Mis a jour avec succes")
      setEditName(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("🚀 ~ EditUser ~ error:", error)
    } finally {
      toast.remove("loading")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-wrapper"
      onChange={handleFormChange}>
      <div className="inputs-wrapper">
        <Input
          register={register}
          type="text"
          name="firstName"
          label="sr-only"
          error={errors.firstName?.message}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          wrapperClass="input-wrapper no-margin-bottom"
          defaultValue={userName.firstName}
        />

        <Input
          register={register}
          type="text"
          name="lastName"
          label="sr-only"
          error={errors.lastName?.message}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          wrapperClass="input-wrapper no-margin-bottom"
          defaultValue={userName.lastName}
        />
      </div>

      <span className="error-message">
        {errors.root?.message && <p>{errors.root?.message}</p>}
      </span>
      <div className="form-button-wrapper">
        <button
          type="submit"
          className="edit-button"
          disabled={isSubmitting || isLoading || valuesAreEquals() || !isValid}>
          {isSubmitting || isLoading ? "Loading..." : "Save"}
        </button>
        <button
          onClick={() => setEditName(false)}
          className="edit-button"
          disabled={isSubmitting || isLoading}>
          Cancel
        </button>
      </div>
    </form>
  )
}
