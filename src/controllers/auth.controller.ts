import { Request, Response } from "express";
import { User } from "../models/associations";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

const authController = {
  // Connexion d’un utilisateur
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user || !(await argon2.verify(user.password, password))) {
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
        return;
      }

      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, {
        expiresIn: "2h",
      });
      res.status(200).json({ token });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erreur serveur", error: (err as Error).message });
    }
  },

  // Inscription d’un nouvel utilisateur
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(409).json({ message: "Utilisateur déjà existant" });
        return;
      }

      const hashedPassword = await argon2.hash(password);
      const newUser = await User.create({ email, password: hashedPassword });

      res
        .status(201)
        .json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erreur serveur", error: (err as Error).message });
    }
  },
};

export default authController;
