import "express";

declare module "express" {
  interface Request {
    user?: {
      id: number;
      // Ajoute d'autres propriétés si besoin
    };
  }
}