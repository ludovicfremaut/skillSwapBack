import { z } from "zod";

const authSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(8, { message: "Mot de passe trop court" })
    .max(100, { message: "Mot de passe trop long" })
    .regex(/[A-Z]/, { message: "Doit contenir une majuscule" })
    .regex(/[a-z]/, { message: "Doit contenir une minuscule" })
    .regex(/\d/, { message: "Doit contenir un chiffre" })
    .regex(/[^A-Za-z0-9]/, { message: "Doit contenir un caractère spécial" }),
});

export default authSchema;
