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

  let token: string | undefined;

  // cookies lus manuellement (sans cookie-parser)
  const rawCookie = req.headers.cookie;
  if (rawCookie) {
    const cookies = Object.fromEntries(
      rawCookie.split(";").map((c) => c.trim().split("="))
    );
    token = cookies["accessToken"];
  }

  // fallback possible via header Authorization
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.log("Aucun token fourni");
    res.status(401).json({ message: "Aucun token fourni" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey) as jwt.JwtPayload;

    // contrôle du contenu minimal du token
    if (!decoded.id || !decoded.email) {
      console.log("Payload JWT invalide");
      res.status(403).json({ message: "Token invalide" });
      return;
    }

    // ID forcé en number (utile si string)
    req.user = { id: Number(decoded.id), email: decoded.email };

    console.log("Token valide, utilisateur authentifié");
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.log("Token expiré");
      res.status(401).json({ message: "Token expiré, veuillez vous reconnecter" });
      return;
    }

    console.log("Erreur lors de la vérification du token :", error);
    res.status(403).json({ message: "Token invalide" });
  }
};
