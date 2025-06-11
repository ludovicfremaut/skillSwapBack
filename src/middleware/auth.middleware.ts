import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string }; 
}

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  console.log("Vérification du token...");
  const token = req.cookies?.accessToken;

  if (!token) {
    console.log("Token manquant");
    return res.status(401).json({ message: "Accès non autorisé : token manquant" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey) as jwt.JwtPayload;

    if (!decoded.id || !decoded.email) {
      console.log("Payload JWT invalide");
      return res.status(403).json({ message: "Token invalide" });
    }

    req.user = { id: decoded.id, email: decoded.email };

    console.log("Token valide, utilisateur authentifié");
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.log("Token expiré");
      return res.status(401).json({ message: "Token expiré, veuillez vous reconnecter" });
    }

    console.log("Erreur lors de la vérification du token :", error);
    return res.status(403).json({ message: "Token invalide" });
  }
};

export default verifyToken;