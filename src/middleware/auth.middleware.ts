import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_KEY as string;

interface AuthenticatedRequest extends Request {
  user?: any; // Ajout direct du type user
}

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;

  if (!token) return res.status(401).json({ message: "Accès non autorisé" });

  jwt.verify(token, jwtSecretKey, (err: Error | null, payload: any) => {
    if (err) return res.status(403).json({ message: "Token invalide" });

    req.user = payload; 
    next();
  });
};

export default verifyToken;