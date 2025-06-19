// Configuration de l'environnement pour les tests
process.env.JWT_SECRET_KEY = "my-secret-key";

import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import authController from "../controllers/auth.controller"; 
import { User } from "../models/associations"; // Assurez-vous que le chemin est correct

// Mocks : permet de simuler les modules externes
vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(),
    verify: vi.fn(),
  }
}));
vi.mock("argon2");
vi.mock("../models/associations", () => ({
  // Simule les méthodes de l'ORM Sequelize pour le modèle User avec des fausses fonctions
  User: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}));

// Simule la réponse express en créant un objet pour vérifier que la fonction est appelée correctement
const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  res.clearCookie = vi.fn().mockReturnValue(res);
  return res;
};

describe("authController", () => {

  // On réinitialise les mocks avant chaque test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Tests pour le contrôleur d'authentification
  it("hash le mot de passe et crée un utilisateur", async () => {
    const req: any = {
      // Simule une requête entrante
      body: {
        email: "test@example.com",
        password: "secret123",
        firstname: "John",
        lastname: "Doe",
        street: "1 rue de Paris",
        zipcode: "75000",
        city: "Paris",
        description: "dev",
        availability: ["weekdays"],
      },
    };
    // Simule la réponse express
    const res = mockResponse();

    // Simule le comportement de argon2 et User
    (argon2.hash as any).mockResolvedValue("hashed_pw");
    (User.findOne as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    (User.create as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ id: 1 });

    // Appel le contrôleur
    await authController.register(req, res);
    //On vérifie que la fonction hash a été appelée avec le mot de passe d'origine :
    expect(argon2.hash).toHaveBeenCalledWith("secret123");
    // On vérifie que le mdp a été haché
    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({ password: "hashed_pw" })
    );
    // On vérifie que l'utilisateur a bien été créé grâce au code statut 201 :
    expect(res.status).toHaveBeenCalledWith(201);
    // On vérifie que la réponse JSON contient un message et l'utilisateur créé :
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String), user: { id: 1 } })
    );
  });

  // Tests pour la connexion avec la création d'un cookie
  it("connecte un utilisateur avec email/mdp corrects", async () => {
    const req: any = {
      body: {
        email: "test@example.com",
        password: "secret123",
      },
    };
    const res = mockResponse();

    const fakeUser = {
      id: 1,
      email: "test@example.com",
      password: "hashed_pw",
    };

    (User.findOne as any).mockResolvedValue(fakeUser);
    (argon2.verify as any).mockResolvedValue(true);
    // Mock de jwt.sign ici
    (jwt.sign as Mock).mockImplementation(() => "mocked.token");

    await authController.login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
    expect(argon2.verify).toHaveBeenCalledWith("hashed_pw", "secret123");
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1, email: "test@example.com" },
      "my-secret-key",
      { expiresIn: "4h" }
    );
    expect(res.cookie).toHaveBeenCalledWith(
      "accessToken",
      "mocked.token",
      expect.objectContaining({ httpOnly: true })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Connexion réussie" });
  });
});

// Tests pour la déconnexion et la suppression du cookie
it("supprime le cookie à la déconnexion", () => {
  const req: any = {};
  const res = mockResponse();

  authController.logout(req, res);

  expect(res.clearCookie).toHaveBeenCalledWith("accessToken", {
    httpOnly: true,
    sameSite: "strict",
  });
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: "Déconnexion réussie" });
});
