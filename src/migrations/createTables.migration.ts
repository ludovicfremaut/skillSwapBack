// on importe tous les modeles
import { Message, Review, Role, Service, Skill, User, sequelize } from "../models/associations";

// 1 - Avant d'effectuer une nouvelle installation
// on efface l'existant
console.log("Suppression des tables existantes...");
await sequelize.drop({ cascade: true });

// 2 - Il va synchroniser la base de données en créant
// de nouvelles tables basées sur nos modèles en serveur web
console.log("Définition des tables...");
await sequelize.sync();

// 3 - On va fermer la connexion entre le serveur web
// et la base de données après la fin ce ces opérations
console.log("Migration ok ! Fermeture de la connexion ...");
await sequelize.close();