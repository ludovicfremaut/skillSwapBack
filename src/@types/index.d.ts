import "express";
import type { IUser } from "../models/User.model";

declare module "express" {
  interface Request {
    user?: {
      user: IUser
      // Ajoute d'autres propriétés si besoin
    };
  }
}