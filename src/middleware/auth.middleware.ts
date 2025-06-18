import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  console.log("Vérification du token...");
  // D'abord on cherche dans les cookies
  let token = req.cookies?.accessToken;
console.log("Token trouvé dans les cookies :", req.cookies);
  // Si pas trouvé, on regarde le header Authorization: Bearer <token>
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

    if (!token) {
    console.log("Perdu");
    res.status(401).json({ message: "Perdu" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey) as jwt.JwtPayload;

    if (!decoded.id || !decoded.email) {
      console.log("Payload JWT invalide");
      res.status(403).json({ message: "Token invalide" });
      return;
    }

    if (typeof decoded.id !== "number" && typeof decoded.id !== "string") {
      res.status(403).json({ message: "ID utilisateur manquant ou invalide" });
      return;
    }

    req.user = { id: Number(decoded.id), email: decoded.email };

    console.log("Token valide, utilisateur authentifié");
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.log("Token expiré");
      res
        .status(401)
        .json({ message: "Token expiré, veuillez vous reconnecter" });
      return;
    }

    console.log("Erreur lors de la vérification du token :", error);
    res.status(403).json({ message: "Token invalide" });
    return;
  }
};
