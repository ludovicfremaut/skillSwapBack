import { Response, Request } from "express";
import * as EmailValidator from "email-validator";
import PasswordValidator from "password-validator";
import { User } from "../models/associations";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

// Définition du schéma de validation du mot de passe
const passwordSchema = new PasswordValidator();
passwordSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

const authController = {
  // Connexion d’un utilisateur
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Vérification du format de l'email
      if (!EmailValidator.validate(email)) {
        return res.status(400).json({ message: "Email invalide" });
      }

      // Vérification du format du mot de passe
      if (!passwordSchema.validate(password)) {
        return res.status(400).json({ message: "Mot de passe invalide" });
      }

      // Recherche de l'utilisateur
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }

      // Vérification du mot de passe
      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      // Génération du token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, {
        expiresIn: "2h",
      });

      return res.status(200).json({ token });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Erreur serveur", error: err.message });
    }
  },

  // Inscription d’un nouvel utilisateur
  register: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (
        !EmailValidator.validate(email) ||
        !passwordSchema.validate(password)
      ) {
        return res
          .status(400)
          .json({ message: "Email ou mot de passe invalide" });
      }

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "Utilisateur déjà existant" });
      }

      // Hash du mot de passe
      const hashedPassword = await argon2.hash(password);

      // Création de l'utilisateur
      const newUser = await User.create({ email, password: hashedPassword });

      return res
        .status(201)
        .json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Erreur serveur", error: err.message });
    }
  },
};

export default authController;
