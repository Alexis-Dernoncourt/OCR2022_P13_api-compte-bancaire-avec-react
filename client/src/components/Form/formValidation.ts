import { z } from "zod"

const SignInValidationSchema = z.object({
  email: z
    .string()
    .email("Entrez un email valide")
    .min(1, "Ce champs est requis"),
  password: z.string().min(8, "Entrez au moins 8 caractères"),
  rememberMe: z.boolean(),
})

const SignUpValidationSchema = z
  .object({
    firstName: z.string().min(2, "Entrez au moins 2 caractères"),
    lastName: z.string().min(2, "Entrez au moins 2 caractères"),
    email: z
      .string()
      .email("Entrez un email valide")
      .min(1, "Ce champs est requis"),
    password: z.string().min(8, "Entrez au moins 8 caractères"),
    confirmPassword: z.string().min(8, "Veuillez confirmer votre mot de passe"),
  })
  .refine(
    async data =>
      window.location.pathname === "/sign-up" &&
      data.password === data.confirmPassword,
    {
      message: "Les mot de passe ne correspondent pas",
      path: ["confirmPassword"],
    }
  )

const EditNameValidationSchema = z.object({
  firstName: z.string().min(2, "Entrez au moins 2 caractères"),
  lastName: z.string().min(2, "Entrez au moins 2 caractères"),
})

export {
  EditNameValidationSchema,
  SignInValidationSchema,
  SignUpValidationSchema,
}
