import {
  User,
  Role,
  Skill,
  Service,
  Review,
  Message,
  sequelize,
} from "../models/associations.js";
import argon2 from "argon2";

console.log("Starting database seeding...");

// * AJOUT DE RÔLES
console.log("Adding roles...");
const roleMember = await Role.create({ id: 10, name: "Membre" });
const roleModerator = await Role.create({ id: 20, name: "Modérateur" });
const roleGuest = await Role.create({ id: 30, name: "Invité" });

// * AJOUT DE COMPÉTENCES
console.log("Adding skills...");
const peinture = await Skill.create({ id: 10, name: "Peinture" });
const cuisine = await Skill.create({ id: 20, name: "Cuisine" });
const programmation = await Skill.create({ id: 30, name: "Programmation" });
const jardinage = await Skill.create({ id: 40, name: "Jardinage" });

// * AJOUT D'UTILISATEURS
console.log("Adding users...");
const user1 = await User.create({
  id: 10,
  email: "alice@example.com",
  firstname: "Alice",
  lastname: "Martin",
  street: "1 Rue de Martin",
  zipcode: "75000",
  city: "Paris",
  password: await argon2.hash("password_alice"),
  profile_picture: "https://randomuser.me/api/portraits/women/0.jpg",
  description: "Je suis Alice, passionnée par la peinture.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user1.addSkill(peinture);

const user2 = await User.create({
  id: 11,
  email: "lucas@example.com",
  firstname: "Lucas",
  lastname: "Dubois",
  street: "2 Rue de Dubois",
  zipcode: "75000",
  city: "Lyon",
  password: await argon2.hash("password_lucas"),
  profile_picture: "https://randomuser.me/api/portraits/men/1.jpg",
  description: "Je suis Lucas, passionné par la cuisine.",
  availability: "Flexible",
  role_id: roleModerator.id,
});
await user2.addSkill(cuisine);

const user3 = await User.create({
  id: 12,
  email: "emma@example.com",
  firstname: "Emma",
  lastname: "Bernard",
  street: "3 Rue de Bernard",
  zipcode: "75000",
  city: "Marseille",
  password: await argon2.hash("password_emma"),
  profile_picture: "https://randomuser.me/api/portraits/women/2.jpg",
  description: "Je suis Emma, passionnée par la programmation.",
  availability: "Flexible",
  role_id: roleGuest.id,
});
await user3.addSkill(programmation);

const user4 = await User.create({
  id: 13,
  email: "hugo@example.com",
  firstname: "Hugo",
  lastname: "Morel",
  street: "4 Rue de Morel",
  zipcode: "75000",
  city: "Toulouse",
  password: await argon2.hash("password_hugo"),
  profile_picture: "https://randomuser.me/api/portraits/men/3.jpg",
  description: "Je suis Hugo, passionné par le jardinage.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user4.addSkill(jardinage);

const user5 = await User.create({
  id: 14,
  email: "chloe@example.com",
  firstname: "Chloé",
  lastname: "Leroy",
  street: "5 Rue de Leroy",
  zipcode: "75000",
  city: "Nice",
  password: await argon2.hash("password_chloe"),
  profile_picture: "https://randomuser.me/api/portraits/women/4.jpg",
  description: "Je suis Chloé, passionnée par la peinture.",
  availability: "Flexible",
  role_id: roleModerator.id,
});
await user5.addSkill(peinture);

const user6 = await User.create({
  id: 15,
  email: "noah@example.com",
  firstname: "Noah",
  lastname: "Garcia",
  street: "6 Rue de Garcia",
  zipcode: "75000",
  city: "Nantes",
  password: await argon2.hash("password_noah"),
  profile_picture: "https://randomuser.me/api/portraits/men/5.jpg",
  description: "Je suis Noah, passionné par la cuisine.",
  availability: "Flexible",
  role_id: roleGuest.id,
});
await user6.addSkill(cuisine);

const user7 = await User.create({
  id: 16,
  email: "lea@example.com",
  firstname: "Léa",
  lastname: "Faure",
  street: "7 Rue de Faure",
  zipcode: "75000",
  city: "Strasbourg",
  password: await argon2.hash("password_lea"),
  profile_picture: "https://randomuser.me/api/portraits/women/6.jpg",
  description: "Je suis Léa, passionnée par la programmation.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user7.addSkill(programmation);

const user8 = await User.create({
  id: 17,
  email: "tom@example.com",
  firstname: "Tom",
  lastname: "Roux",
  street: "8 Rue de Roux",
  zipcode: "75000",
  city: "Bordeaux",
  password: await argon2.hash("password_tom"),
  profile_picture: "https://randomuser.me/api/portraits/men/7.jpg",
  description: "Je suis Tom, passionné par le jardinage.",
  availability: "Flexible",
  role_id: roleModerator.id,
});
await user8.addSkill(jardinage);

const user9 = await User.create({
  id: 18,
  email: "manon@example.com",
  firstname: "Manon",
  lastname: "Dupont",
  street: "9 Rue de Dupont",
  zipcode: "75000",
  city: "Lille",
  password: await argon2.hash("password_manon"),
  profile_picture: "https://randomuser.me/api/portraits/women/8.jpg",
  description: "Je suis Manon, passionnée par la peinture.",
  availability: "Flexible",
  role_id: roleGuest.id,
});
await user9.addSkill(peinture);

const user10 = await User.create({
  id: 19,
  email: "nathan@example.com",
  firstname: "Nathan",
  lastname: "Giraud",
  street: "10 Rue de Giraud",
  zipcode: "75000",
  city: "Rennes",
  password: await argon2.hash("password_nathan"),
  profile_picture: "https://randomuser.me/api/portraits/men/9.jpg",
  description: "Je suis Nathan, passionné par la cuisine.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user10.addSkill(cuisine);

const user11 = await User.create({
  id: 20,
  email: "sarah@example.com",
  firstname: "Sarah",
  lastname: "Chevalier",
  street: "11 Rue de Chevalier",
  zipcode: "75000",
  city: "Reims",
  password: await argon2.hash("password_sarah"),
  profile_picture: "https://randomuser.me/api/portraits/women/10.jpg",
  description: "Je suis Sarah, passionnée par la programmation.",
  availability: "Flexible",
  role_id: roleModerator.id,
});
await user11.addSkill(programmation);

const user12 = await User.create({
  id: 21,
  email: "jules@example.com",
  firstname: "Jules",
  lastname: "Lambert",
  street: "12 Rue de Lambert",
  zipcode: "75000",
  city: "Le Havre",
  password: await argon2.hash("password_jules"),
  profile_picture: "https://randomuser.me/api/portraits/men/11.jpg",
  description: "Je suis Jules, passionné par le jardinage.",
  availability: "Flexible",
  role_id: roleGuest.id,
});
await user12.addSkill(jardinage);

const user13 = await User.create({
  id: 22,
  email: "clara@example.com",
  firstname: "Clara",
  lastname: "Marchand",
  street: "13 Rue de Marchand",
  zipcode: "75000",
  city: "Saint-Étienne",
  password: await argon2.hash("password_clara"),
  profile_picture: "https://randomuser.me/api/portraits/women/12.jpg",
  description: "Je suis Clara, passionnée par la peinture.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user13.addSkill(peinture);

const user14 = await User.create({
  id: 23,
  email: "louis@example.com",
  firstname: "Louis",
  lastname: "Blanc",
  street: "14 Rue de Blanc",
  zipcode: "75000",
  city: "Grenoble",
  password: await argon2.hash("password_louis"),
  profile_picture: "https://randomuser.me/api/portraits/men/13.jpg",
  description: "Je suis Louis, passionné par la cuisine.",
  availability: "Flexible",
  role_id: roleModerator.id,
});
await user14.addSkill(cuisine);

const user15 = await User.create({
  id: 24,
  email: "camille@example.com",
  firstname: "Camille",
  lastname: "Philippe",
  street: "15 Rue de Philippe",
  zipcode: "75000",
  city: "Dijon",
  password: await argon2.hash("password_camille"),
  profile_picture: "https://randomuser.me/api/portraits/women/14.jpg",
  description: "Je suis Camille, passionnée par la programmation.",
  availability: "Flexible",
  role_id: roleGuest.id,
});
await user15.addSkill(programmation);

const user16 = await User.create({
  id: 25,
  email: "maxime@example.com",
  firstname: "Maxime",
  lastname: "Barbier",
  street: "16 Rue de Barbier",
  zipcode: "75000",
  city: "Angers",
  password: await argon2.hash("password_maxime"),
  profile_picture: "https://randomuser.me/api/portraits/men/15.jpg",
  description: "Je suis Maxime, passionné par le jardinage.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user16.addSkill(jardinage);

const user17 = await User.create({
  id: 26,
  email: "ines@example.com",
  firstname: "Inès",
  lastname: "Moulin",
  street: "17 Rue de Moulin",
  zipcode: "75000",
  city: "Nîmes",
  password: await argon2.hash("password_ines"),
  profile_picture: "https://randomuser.me/api/portraits/women/16.jpg",
  description: "Je suis Inès, passionnée par la peinture.",
  availability: "Flexible",
  role_id: roleModerator.id,
});
await user17.addSkill(peinture);

const user18 = await User.create({
  id: 27,
  email: "antoine@example.com",
  firstname: "Antoine",
  lastname: "Henry",
  street: "18 Rue de Henry",
  zipcode: "75000",
  city: "Villeurbanne",
  password: await argon2.hash("password_antoine"),
  profile_picture: "https://randomuser.me/api/portraits/men/17.jpg",
  description: "Je suis Antoine, passionné par la cuisine.",
  availability: "Flexible",
  role_id: roleGuest.id,
});
await user18.addSkill(cuisine);

const user19 = await User.create({
  id: 28,
  email: "lola@example.com",
  firstname: "Lola",
  lastname: "Benoit",
  street: "19 Rue de Benoit",
  zipcode: "75000",
  city: "Clermont-Ferrand",
  password: await argon2.hash("password_lola"),
  profile_picture: "https://randomuser.me/api/portraits/women/18.jpg",
  description: "Je suis Lola, passionnée par la programmation.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user19.addSkill(programmation);

const user20 = await User.create({
  id: 29,
  email: "mateo@example.com",
  firstname: "Matéo",
  lastname: "Gomez",
  street: "20 Rue de Gomez",
  zipcode: "75000",
  city: "Rouen",
  password: await argon2.hash("password_mateo"),
  profile_picture: "https://randomuser.me/api/portraits/men/19.jpg",
  description: "Je suis Matéo, passionné par le jardinage.",
  availability: "Flexible",
  role_id: roleModerator.id,
});
await user20.addSkill(jardinage);

const user21 = await User.create({
  id: 30,
  email: "anna@example.com",
  firstname: "Anna",
  lastname: "Renard",
  street: "21 Rue de Renard",
  zipcode: "75000",
  city: "Avignon",
  password: await argon2.hash("password_anna"),
  profile_picture: "https://randomuser.me/api/portraits/women/20.jpg",
  description: "Je suis Anna, passionnée par la peinture.",
  availability: "Flexible",
  role_id: roleGuest.id,
});
await user21.addSkill(peinture);

const user22 = await User.create({
  id: 31,
  email: "enzo@example.com",
  firstname: "Enzo",
  lastname: "Schmitt",
  street: "22 Rue de Schmitt",
  zipcode: "75000",
  city: "Caen",
  password: await argon2.hash("password_enzo"),
  profile_picture: "https://randomuser.me/api/portraits/men/21.jpg",
  description: "Je suis Enzo, passionné par la cuisine.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user22.addSkill(cuisine);

const user23 = await User.create({
  id: 32,
  email: "eva@example.com",
  firstname: "Eva",
  lastname: "Meunier",
  street: "23 Rue de Meunier",
  zipcode: "75000",
  city: "Metz",
  password: await argon2.hash("password_eva"),
  profile_picture: "https://randomuser.me/api/portraits/women/22.jpg",
  description: "Je suis Eva, passionnée par la programmation.",
  availability: "Flexible",
  role_id: roleModerator.id,
});
await user23.addSkill(programmation);

const user24 = await User.create({
  id: 33,
  email: "lena@example.com",
  firstname: "Léna",
  lastname: "Baron",
  street: "24 Rue de Baron",
  zipcode: "75000",
  city: "Tours",
  password: await argon2.hash("password_lena"),
  profile_picture: "https://randomuser.me/api/portraits/women/23.jpg",
  description: "Je suis Léna, passionnée par le jardinage.",
  availability: "Flexible",
  role_id: roleGuest.id,
});
await user24.addSkill(jardinage);

const user25 = await User.create({
  id: 34,
  email: "theo@example.com",
  firstname: "Théo",
  lastname: "Carpentier",
  street: "25 Rue de Carpentier",
  zipcode: "75000",
  city: "Amiens",
  password: await argon2.hash("password_theo"),
  profile_picture: "https://randomuser.me/api/portraits/men/24.jpg",
  description: "Je suis Théo, passionné par la peinture.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user25.addSkill(peinture);

console.log("Adding services...");
const service1 = await Service.create({
  id: 30,
  object: "Besoin d'aide pour coder une application",
  status: "accepted",
  sender_id: user19.id, // Lola
  receiver_id: user15.id, // Camille
});

const service2 = await Service.create({
  id: 31,
  object: "Peux-tu m’aider à jardiner samedi ?",
  status: "pending",
  sender_id: user24.id, // Léna
  receiver_id: user20.id, // Maxime
});

const service3 = await Service.create({
  id: 32,
  object: "Cours de cuisine végétarienne ?",
  status: "completed",
  sender_id: user22.id, // Enzo
  receiver_id: user14.id, // Louis
});

const service4 = await Service.create({
  id: 33,
  object: "Peinture murale pour chambre enfant",
  status: "rejected",
  sender_id: user25.id, // Théo
  receiver_id: user21.id, // Anna
});

console.log("Adding reviews...");
const review1 = await Review.create({
  id: 30,
  rating: 5,
  comment: "Camille est super pédagogue en développement !",
  service_id: service1.id,
  user_id: user19.id, // Lola
});

const review2 = await Review.create({
  id: 31,
  rating: 4,
  comment: "Très bon moment à jardiner ensemble.",
  service_id: service2.id,
  user_id: user24.id, // Léna
});

const review3 = await Review.create({
  id: 32,
  rating: 5,
  comment: "J'ai appris plein de recettes, merci Louis !",
  service_id: service3.id,
  user_id: user22.id, // Enzo
});

console.log("Adding messages...");
await Message.create({
  id: 30,
  body: "Salut Camille, tu pourrais m'aider avec React ?",
  sender_id: user19.id,
  receiver_id: user15.id,
});

await Message.create({
  id: 31,
  body: "Hello Maxime, disponible samedi pour le jardin ?",
  sender_id: user24.id,
  receiver_id: user20.id,
});

await Message.create({
  id: 32,
  body: "Enzo, rdv demain pour le cours de cuisine !",
  sender_id: user14.id,
  receiver_id: user22.id,
});

await Message.create({
  id: 33,
  body: "Désolée Théo, je suis déjà prise ce jour-là.",
  sender_id: user21.id,
  receiver_id: user25.id,
});

console.log("Seeding done! Closing connection...");
await sequelize.close();
