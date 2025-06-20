import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import authSchema from "../schemas/auth.schema";

export const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // console.log("Je suis dans validateAuth");
  try {
    // Valider les données du corps de la requête
    authSchema.parse(req.body);
    next(); // Passer au middleware ou contrôleur suivant si la validation réussit
  } catch (error) {
    if (error instanceof ZodError) {
      // Retourner une erreur si la validation échoue
      res.status(400).json({
        message: "Données invalides",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
      return;
    }

    console.error("Erreur inattendue dans validateAuth :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur", error: (error as Error).message });
  }
};
