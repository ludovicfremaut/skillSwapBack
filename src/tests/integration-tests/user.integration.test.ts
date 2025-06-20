import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../../../app"; 
import { sequelize } from "../../models/associations";
import { User, Role } from "../../models/associations";


beforeAll(async () => {
  await sequelize.sync({ force: true }); // Nettoie la BDD avant les tests
});

afterAll(async () => {
  await sequelize.close(); // Ferme la connexion après les tests
});

describe("Test d'intégration - GET /users/:id", () => {
  let userId: number;
  let roleId: number

  beforeAll(async () => {
    // Crée un rôle
    const role = await Role.create({ name: "user" });
    roleId = role.id;
    // Crée un utilisateur réel dans la BDD
    const user = await User.create({
      email: "profil@example.com",
      password: "Hashed_pw",
      firstname: "Jean",
      lastname: "Dupont",
      street: "123 rue Exemple",
      zipcode: "75001",
      city: "Paris",
      profile_picture: "https://example.com/profile.jpg",
      description: "Description test",
      availability: "Disponible",
      role_id: roleId,
    });
    userId = user.id;
  });

  it("doit retourner le profil de l'utilisateur", async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      id: userId,
      firstname: "Jean",
      lastname: "Dupont",
      city: "Paris",
      description: "Description test",
    });
  })
});
