import { Request, Response } from "express";
import { User } from "../models/associations";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

const authController = {
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      console.log("Email reçu :", email);

      if (!email || !password) {
        res.status(400).json({ message: "Email et mot de passe sont requis" });
        return;
      }
  
      const user = await User.findOne({ where: { email } });
      console.log("Utilisateur trouvé :", user);

      if (!user) {
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
        return;
      }
  
      if (!user.password) {
        res.status(500).json({ message: "Erreur serveur : mot de passe manquant pour cet utilisateur" });
        return;
      }
  
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
        return;
      }
  
      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, {
        expiresIn: "2h",
      });
  
      res.cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 2 * 60 * 60 * 1000,
      });
  
      res.status(200).json({ message: "Connexion réussie" });
    } catch (err) {
      console.error("Erreur dans la méthode login :", err);
      res.status(500).json({ message: "Erreur serveur", error: (err as Error).message });
    }
  },
  logout: (req: Request, res: Response): void => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict", // Protection CSRF
    });

    res.status(200).json({ message: "Déconnexion réussie" });
  },


  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        email,
        password,
        firstname,
        lastname,
        street,
        zipcode,
        city,
        profil_photo,
        description,
        availability,
      } = req.body;
  
      if (
        !email ||
        !password ||
        !firstname ||
        !lastname ||
        !street ||
        !zipcode ||
        !city ||
        !profil_photo ||
        !description ||
        availability === undefined
      ) {
        res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
        return;
      }
  
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(409).json({ message: "Utilisateur déjà existant" });
        return;
      }

      const hashedPassword = await argon2.hash(password);
  
      const newUser = await User.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        street,
        zipcode,
        city,
        profil_photo,
        description,
        availability,
      });
  
      res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (err) {
      console.error("Erreur dans le contrôleur register :", err);
      res.status(500).json({ message: "Erreur serveur", error: (err as Error).message });
    }
  }
};

export default authController;
