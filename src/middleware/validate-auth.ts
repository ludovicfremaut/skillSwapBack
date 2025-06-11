import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod"; // Importer ZodError pour typer les erreurs
import authSchema from "../schemas/auth.schema";

export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    
    authSchema.parse(req.body);
    next(); 
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Données invalides",
        errors: error.errors.map((err) => ({
          field: err.path.join("."), //Transforme le chemin de l'erreur en une chaîne lisible
          message: err.message, //Fournit une description de l'erreur
        })),
      });
    }
    return res.status(500).json({ message: "Erreur serveur", error: (error as Error).message });
  }
};