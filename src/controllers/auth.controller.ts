import { Request, Response } from "express";
import { User } from "../models/associations";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

const authController = {
  // Méthode login pour connecter un utilisateur
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      // Récupération des données envoyées par le frontend (email et mot de passe)
      const { email, password } = req.body;
      console.log("Email reçu :", email);
      console.log(Date.now()); // Affichage de la date en millisecondes (debug)

      // Vérification : les champs sont obligatoires
      if (!email || !password) {
        res.status(400).json({ message: "Email et mot de passe sont requis" });
        return;
      }

      // Recherche de l’utilisateur en base à partir de l'email
      const user = await User.findOne({ where: { email } });
      console.log("Utilisateur trouvé :", user);

      // Si aucun utilisateur n’est trouvé, on arrête là
      if (!user) {
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
        return;
      }

      // Si aucun mot de passe n’est enregistré (ce qui ne devrait pas arriver)
      if (!user.password) {
        res.status(500).json({
          message:
            "Erreur serveur : mot de passe manquant pour cet utilisateur",
        });
        return;
      }

      // Vérification du mot de passe avec argon2
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
        return;
      }
  
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "4h",
      });

      // Envoi du token dans un cookie httpOnly
      res.cookie("accessToken", token, {
        httpOnly: true, // Le cookie ne peut pas être lu par JavaScript (protection XSS)
        secure: false, // À mettre à true en production avec HTTPS
        sameSite: "strict", // Protection CSRF
        path: "/", // Le cookie est accessible partout sur le site
        maxAge: 4 * 60 * 60 * 1000, // Expire après 4 heures
      });

      // Réponse envoyée au frontend avec les infos utiles de l’utilisateur
      res.status(200).json({
        message: "Connexion réussie",
        user: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          profile_picture: user.profile_picture,
          description: user.description,
          availability: user.availability,
        },
      });
    } catch (err) {
      // En cas d'erreur inattendue, log + message générique
      console.error("Erreur dans la méthode login :", err);
      res
        .status(500)
        .json({ message: "Erreur serveur", error: (err as Error).message });
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
      // Récupération des données envoyées depuis le formulaire d'inscription
      const {
        email,
        password,
        firstname,
        lastname,
        street,
        zipcode,
        city,
        profile_picture,
        description,
        availability,
      } = req.body;

      // Vérifie que tous les champs obligatoires sont bien présents
      if (
        !email ||
        !password ||
        !firstname ||
        !lastname ||
        !street ||
        !zipcode ||
        !city ||
        !description ||
        availability === undefined
      ) {
        res.status(400).json({
          message: "Tous les champs obligatoires doivent être remplis.",
        });
        return;
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(409).json({ message: "Utilisateur déjà existant" });
        return;
      }

      const hashedPassword = await argon2.hash(password);

      // Création de l'utilisateur dans la base de données
      const newUser = await User.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        street,
        zipcode,
        city,
        profile_picture:
          profile_picture ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(firstname + lastname)}`,
        description,
        availability,
      });

      // Génère un token JWT pour connecter l'utilisateur dès l'inscription
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        jwtSecretKey,
        {
          expiresIn: "4h",
        },
      );

      // Pose le cookie sécurisé dans la réponse HTTP
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false, // true en prod avec HTTPS
        sameSite: "strict",
        path: "/",
        maxAge: 4 * 60 * 60 * 1000,
      });

      // Retourne l'utilisateur comme réponse
      res
        .status(201)
        .json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (err) {
      console.error("Erreur dans le contrôleur register :", err);
      res
        .status(500)
        .json({ message: "Erreur serveur", error: (err as Error).message });
    }
  },
};

export default authController;
