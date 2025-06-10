import { Response, Request } from "express";
import {z} from "zod";
import { User } from "../models/associations";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

// Définition du schéma Zod pour valider l'entrée utilisateur
const authSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string()
    .min(8, { message: "Mot de passe trop court" })
    .max(100, { message: "Mot de passe trop long" })
    .regex(/[A-Z]/, { message: "Doit contenir une majuscule" })
    .regex(/[a-z]/, { message: "Doit contenir une minuscule" })
    .regex(/\d/, { message: "Doit contenir un chiffre" })
    .regex(/^\S*$/, { message: "Ne doit pas contenir d'espaces" })
});


const authController = {
  // Connexion d’un utilisateur
  login: async (req: Request, res: Response) => {
    try {
      const parsedInput = authSchema.safeParse(req.body);
      if (!parsedInput.success) {
        return res.status(400).json({ message: parsedInput.error.errors });
      }

      const { email, password } = parsedInput.data;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await argon2.verify(user.password, password))) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, { expiresIn: "2h" });
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ message: "Erreur serveur", error: (err as Error).message });
    }
  },

 // Inscription d’un nouvel utilisateur
 register: async (req: Request, res: Response) => {
  try {
    const parsedInput = authSchema.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(400).json({ message: parsedInput.error.errors });
    }

    const { email, password } = parsedInput.data;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Utilisateur déjà existant" });
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = await User.create({ email, password: hashedPassword });

    return res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", error: (err as Error).message });
  }
}
};

export default authController;
