import "express";
import type { IUser } from "../models/User.model";

declare module "express" {
  interface Request {
    user?: {
      user: IUser;
      // On pourra ajouter des propriétés si besoin
    };
  }
}
