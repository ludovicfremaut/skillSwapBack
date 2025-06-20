import { describe, it, expect } from "vitest";
import userSchema from "../../schemas/user.schema";

describe("userSchema", () => {
  // On crée un exemple d'utilisateur :
  const validUser = {
    email: "user@example.com",
    firstname: "John",
    lastname: "Doe",
    street: "123 Rue de la paix",
    zipcode: "75001",
    city: "Paris",
    password: "securePassword123",
    profile_picture: "http://example.com/image.jpg",
    description: "Utilisateur actif",
    availability: "Lun-Ven",
  };

  it("accepte un utilisateur valide", () => {
    // On teste si le schéma accepte un utilisateur valide, safePrse doit renvoyer un objet avec une propriété success à true :
    const result = userSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("rejette un email invalide", () => {
    // On teste si le schéma rejette un email invalide, safeParse doit renvoyer un objet avec une propriété success à false :
    const invalidUser = { ...validUser, email: "pas-un-email" };
    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("email");
    }
  });

  it("rejette un champ manquant", () => {
    // On teste si le schéma rejette un utilisateur avec un champ (ici firstname) manquant, safeParse doit renvoyer un objet avec une propriété success à false :
    const { firstname, ...partialUser } = validUser; 
    const result = userSchema.safeParse(partialUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path.includes("firstname"))).toBe(true);
    }
  });

  it("rejette un champ de type incorrect", () => {
    // On teste si le schéma rejette un champ de type incorrect, ici zipcode qui doit être une chaîne de caractères, pas un nombre :
    const invalidUser = { ...validUser, zipcode: 75001 }; 
    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path.includes("zipcode"))).toBe(true);
    }
  });
});