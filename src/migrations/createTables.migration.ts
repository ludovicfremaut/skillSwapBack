import {
  Message,
  Review,
  Role,
  Service,
  Skill,
  User,
  sequelize,
} from "../models/associations";

console.log("Suppression des tables existantes...");
await sequelize.drop({ cascade: true });

console.log("Définition des tables...");
await sequelize.sync();

console.log("Migration ok ! Fermeture de la connexion ...");
await sequelize.close();
