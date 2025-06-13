import { Request, Response, NextFunction } from "express";
import leoProfanity from "leo-profanity";
import * as tf from "@tensorflow/tfjs-node";
import * as nsfwjs from "nsfwjs";
import multer from "multer";
import { fileTypeFromBuffer }from "file-type";

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

let nfswModel: nsfwjs.NSFWJS | null = null;

// Configuration de Multer pour utiliser memoryStorage
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5 Mo max

const loadModel = async (): Promise<nsfwjs.NSFWJS> => {
    try {
        if (!nfswModel) {
            nfswModel = await nsfwjs.load();
        }
        return nfswModel;
    } catch (error) {
        console.error("Erreur lors du chargement du modèle NSFW : ", error);
        throw new Error("Impossible de charger le modèle NSFW");
    }
};

export const moderateProfile = async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
        const model = await loadModel();

        const { description = '' } = req.body;
        const profilePicBuffer = req.file?.buffer; // Récupération du buffer de l'image

        // Vérification du type MIME de l'image
        if (req.file) {
            if (!req.file.mimetype.startsWith('image/')) {
                return res.status(400).json({ error: "File is not an image" });
            }

            // Vérification approfondie du contenu du fichier
    if (profilePicBuffer) {
      const fileTypeResult = await fileTypeFromBuffer(profilePicBuffer); // Utilisation corrigée
      if (!fileTypeResult || !fileTypeResult.mime.startsWith("image/")) {
          return res.status(400).json({ error: "File is not a valid image" });
      }
  } else {
      return res.status(400).json({ error: "File buffer is empty" });
  }

        }

        // Vérification de la description
        if (leoProfanity.check(description)) {
            return res.status(400).json({ error: "Description non appropriée" });
        }

        // Vérification de la photo de profil
        if (profilePicBuffer) {
            const imageTensor = tf.node.decodeImage(profilePicBuffer, 3) as tf.Tensor3D;
            const predictions = await model.classify(imageTensor);

            imageTensor.dispose();

            const isInappropriate = predictions.some(
                (p) => ["Porn", "Hentai", "Sexy"].includes(p.className) && p.probability > 0.7
            );

            if (isInappropriate) {
                return res.status(400).json({ error: "Photo de profil inappropriée" });
            }
        }

        next();

    } catch (error) {
        console.error("Échec de la vérification de la photo de profil : ", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

// Middleware pour gérer les téléchargements
export const uploadMiddleware = upload.single("profile_picture");