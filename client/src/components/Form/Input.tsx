/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: any
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "date"
    | "checkbox"
    | "submit"
    | "radio"
    | "hidden"
    | "search"
    | "textarea"
    | "select"
    | "button"
  name?: string
  label: string
  error?: string
  isSubmitting: boolean
  isLoading: boolean
  wrapperClass?: string
}
const Input: FC<InputProps> = ({
  register,
  type,
  name,
  label,
  error,
  isSubmitting,
  isLoading,
  wrapperClass,
  ...rest
}) => {
  return (
    <div className={wrapperClass}>
      {type !== "checkbox" &&
        label &&
        (label === "sr-only" ? (
          <label htmlFor={name} className="sr-only">
            {name}
          </label>
        ) : (
          <label htmlFor={name}>{label}</label>
        ))}
      <input
        {...register(name)}
        id={name}
        type={type}
        name={name}
        className={error ? "invalid" : ""}
        aria-invalid={error ? "true" : "false"}
        disabled={isSubmitting || isLoading}
        {...rest}
      />
      {type === "checkbox" && label && <label htmlFor={name}>{label}</label>}
      {error && (
        <span className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

export default Input
