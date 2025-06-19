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
const roleAdmin = await Role.create({ id: 1, name: "Admin" });


// * AJOUT DE COMPÉTENCES
console.log("Adding skills...");
const peinture = await Skill.create({ id: 10, name: "Peinture" });
const cuisine = await Skill.create({ id: 20, name: "Cuisine" });
const programmation = await Skill.create({ id: 30, name: "Programmation" });
const jardinage = await Skill.create({ id: 40, name: "Jardinage" });
const menuiserie = await Skill.create({ id: 50, name: "Menuiserie" });
const photographie = await Skill.create({ id: 60, name: "Photographie" });
const couture = await Skill.create({ id: 70, name: "Couture" });
const dessin = await Skill.create({ id: 80, name: "Dessin" });
const mécanique = await Skill.create({ id: 90, name: "Mécanique" });
const ébénisterie = await Skill.create({ id: 100, name: "Ébénisterie" });
const danse = await Skill.create({ id: 110, name: "Danse" });
const chant = await Skill.create({ id: 120, name: "Chant" });
const écriture = await Skill.create({ id: 130, name: "Écriture" });
const musique = await Skill.create({ id: 140, name: "Musique" });
const coutureMachine = await Skill.create({ id: 150, name: "Couture à la machine" });
const modélisme = await Skill.create({ id: 160, name: "Modélisme" });
const sculpture = await Skill.create({ id: 170, name: "Sculpture" });
const origami = await Skill.create({ id: 180, name: "Origami" });
const broderie = await Skill.create({ id: 190, name: "Broderie" });
const maquillageArtistique = await Skill.create({ id: 200, name: "Maquillage artistique" });

const user1 = await User.create({
  id: 1,
  email: "alice@example.com",
  firstname: "Alice",
  lastname: "Martin",
  street: "1 Rue de Martin",
  zipcode: "75000",
  city: "Paris",
  password: await argon2.hash("password_alice"),
  profile_picture: "https://api.dicebear.com/7.x/adventurer/svg?seed=alice-martin",
  description: "Je suis Alice, passionnée par la peinture.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user1.addSkill(peinture);

const user2 = await User.create({
  id: 2,
  email: "bob@example.com",
  firstname: "Bob",
  lastname: "Durand",
  street: "10 Avenue des Champs",
  zipcode: "69000",
  city: "Lyon",
  password: await argon2.hash("password_bob"),
  profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob-durand",
  description: "Bob aime le jardinage et le bricolage.",
  availability: "Weekends",
  role_id: roleMember.id,
});
await user2.addSkill(jardinage);

const user3 = await User.create({
  id: 3,
  email: "carol@example.com",
  firstname: "Carol",
  lastname: "Lemoine",
  street: "22 Rue Lafayette",
  zipcode: "31000",
  city: "Toulouse",
  password: await argon2.hash("password_carol"),
  profile_picture: "https://api.dicebear.com/7.x/big-smile/svg?seed=carol-lemoine",
  description: "Carol est experte en photographie.",
  availability: "Soirées",
  role_id: roleMember.id,
});
await user3.addSkill(photographie);

const user4 = await User.create({
  id: 4,
  email: "david@example.com",
  firstname: "David",
  lastname: "Moreau",
  street: "5 Place Bellecour",
  zipcode: "69002",
  city: "Lyon",
  password: await argon2.hash("password_david"),
  profile_picture: "https://api.dicebear.com/7.x/gridy/svg?seed=david-moreau",
  description: "David est passionné de programmation.",
  availability: "Matin",
  role_id: roleMember.id,
});
await user4.addSkill(programmation);

const user5 = await User.create({
  id: 5,
  email: "emma@example.com",
  firstname: "Emma",
  lastname: "Petit",
  street: "15 Rue de la Paix",
  zipcode: "75002",
  city: "Paris",
  password: await argon2.hash("password_emma"),
  profile_picture: "https://api.dicebear.com/7.x/personas/svg?seed=emma-petit",
  description: "Emma adore la cuisine française.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user5.addSkill(cuisine);

const user6 = await User.create({
  id: 6,
  email: "francois@example.com",
  firstname: "François",
  lastname: "Dubois",
  street: "30 Boulevard Haussmann",
  zipcode: "75009",
  city: "Paris",
  password: await argon2.hash("password_francois"),
  profile_picture: "https://api.dicebear.com/7.x/adventurer/svg?seed=francois-dubois",
  description: "François aime le jardinage.",
  availability: "Weekends",
  role_id: roleMember.id,
});
await user6.addSkill(jardinage);

const user7 = await User.create({
  id: 7,
  email: "gabriel@example.com",
  firstname: "Gabriel",
  lastname: "Leroy",
  street: "12 Rue de Rivoli",
  zipcode: "75001",
  city: "Paris",
  password: await argon2.hash("password_gabriel"),
  profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=gabriel-leroy",
  description: "Gabriel est fan de bricolage.",
  availability: "Soirées",
  role_id: roleMember.id,
});
await user7.addSkill(menuiserie);

const user8 = await User.create({
  id: 8,
  email: "hannah@example.com",
  firstname: "Hannah",
  lastname: "Morel",
  street: "40 Rue Saint-Honoré",
  zipcode: "75001",
  city: "Paris",
  password: await argon2.hash("password_hannah"),
  profile_picture: "https://api.dicebear.com/7.x/big-smile/svg?seed=hannah-morel",
  description: "Hannah aime la photographie.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user8.addSkill(photographie);

const user9 = await User.create({
  id: 9,
  email: "isaac@example.com",
  firstname: "Isaac",
  lastname: "Simon",
  street: "18 Avenue Victor Hugo",
  zipcode: "75016",
  city: "Paris",
  password: await argon2.hash("password_isaac"),
  profile_picture: "https://api.dicebear.com/7.x/gridy/svg?seed=isaac-simon",
  description: "Isaac adore le développement web.",
  availability: "Matin",
  role_id: roleMember.id,
});
await user9.addSkill(programmation);

const user10 = await User.create({
  id: 10,
  email: "julia@example.com",
  firstname: "Julia",
  lastname: "Fabre",
  street: "25 Rue du Faubourg",
  zipcode: "69003",
  city: "Lyon",
  password: await argon2.hash("password_julia"),
  profile_picture: "https://api.dicebear.com/7.x/personas/svg?seed=julia-fabre",
  description: "Julia est passionnée par la cuisine.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user10.addSkill(cuisine);

const user11 = await User.create({
  id: 11,
  email: "kevin@example.com",
  firstname: "Kevin",
  lastname: "Garnier",
  street: "7 Rue des Lilas",
  zipcode: "31000",
  city: "Toulouse",
  password: await argon2.hash("password_kevin"),
  profile_picture: "https://api.dicebear.com/7.x/adventurer/svg?seed=kevin-garnier",
  description: "Kevin aime le jardinage.",
  availability: "Weekends",
  role_id: roleMember.id,
});
await user11.addSkill(jardinage);

const user12 = await User.create({
  id: 12,
  email: "laura@example.com",
  firstname: "Laura",
  lastname: "Bernard",
  street: "9 Rue des Fleurs",
  zipcode: "69007",
  city: "Lyon",
  password: await argon2.hash("password_laura"),
  profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=laura-bernard",
  description: "Laura est une experte en photographie.",
  availability: "Soirées",
  role_id: roleMember.id,
});
await user12.addSkill(photographie);

const user13 = await User.create({
  id: 13,
  email: "maxime@example.com",
  firstname: "Maxime",
  lastname: "Rousseau",
  street: "14 Boulevard Voltaire",
  zipcode: "75011",
  city: "Paris",
  password: await argon2.hash("password_maxime"),
  profile_picture: "https://api.dicebear.com/7.x/big-smile/svg?seed=maxime-rousseau",
  description: "Maxime adore la programmation.",
  availability: "Matin",
  role_id: roleMember.id,
});
await user13.addSkill(programmation);

const user14 = await User.create({
  id: 14,
  email: "nina@example.com",
  firstname: "Nina",
  lastname: "Garcia",
  street: "8 Rue des Acacias",
  zipcode: "75017",
  city: "Paris",
  password: await argon2.hash("password_nina"),
  profile_picture: "https://api.dicebear.com/7.x/gridy/svg?seed=nina-garcia",
  description: "Nina aime la peinture.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user14.addSkill(peinture);

const user15 = await User.create({
  id: 15,
  email: "olivier@example.com",
  firstname: "Olivier",
  lastname: "Petit",
  street: "20 Avenue Jean Jaurès",
  zipcode: "69008",
  city: "Lyon",
  password: await argon2.hash("password_olivier"),
  profile_picture: "https://api.dicebear.com/7.x/personas/svg?seed=olivier-petit",
  description: "Olivier est passionné par le bricolage.",
  availability: "Weekends",
  role_id: roleMember.id,
});
await user15.addSkill(couture);

const user16 = await User.create({
  id: 16,
  email: "pauline@example.com",
  firstname: "Pauline",
  lastname: "Lemoine",
  street: "3 Rue de la République",
  zipcode: "31000",
  city: "Toulouse",
  password: await argon2.hash("password_pauline"),
  profile_picture: "https://api.dicebear.com/7.x/adventurer/svg?seed=pauline-lemoine",
  description: "Pauline adore la cuisine.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user16.addSkill(cuisine);

const user17 = await User.create({
  id: 17,
  email: "quentin@example.com",
  firstname: "Quentin",
  lastname: "Dumas",
  street: "11 Rue de la Liberté",
  zipcode: "69003",
  city: "Lyon",
  password: await argon2.hash("password_quentin"),
  profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=quentin-dumas",
  description: "Quentin aime le jardinage.",
  availability: "Weekends",
  role_id: roleMember.id,
});
await user17.addSkill(jardinage);

const user18 = await User.create({
  id: 18,
  email: "rachel@example.com",
  firstname: "Rachel",
  lastname: "Moreau",
  street: "29 Rue Saint-Michel",
  zipcode: "75005",
  city: "Paris",
  password: await argon2.hash("password_rachel"),
  profile_picture: "https://api.dicebear.com/7.x/big-smile/svg?seed=rachel-moreau",
  description: "Rachel est passionnée de photographie.",
  availability: "Soirées",
  role_id: roleMember.id,
});
await user18.addSkill(photographie);

const user19 = await User.create({
  id: 19,
  email: "sebastien@example.com",
  firstname: "Sébastien",
  lastname: "Dubois",
  street: "17 Boulevard Saint-Germain",
  zipcode: "75006",
  city: "Paris",
  password: await argon2.hash("password_sebastien"),
  profile_picture: "https://api.dicebear.com/7.x/gridy/svg?seed=sebastien-dubois",
  description: "Sébastien adore la programmation.",
  availability: "Matin",
  role_id: roleMember.id,
});
await user19.addSkill(programmation);

const user20 = await User.create({
  id: 20,
  email: "tania@example.com",
  firstname: "Tania",
  lastname: "Lemoine",
  street: "6 Rue des Lilas",
  zipcode: "31000",
  city: "Toulouse",
  password: await argon2.hash("password_tania"),
  profile_picture: "https://api.dicebear.com/7.x/personas/svg?seed=tania-lemoine",
  description: "Tania aime la peinture.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user20.addSkill(peinture);

const user21 = await User.create({
  id: 21,
  email: "ulrich@example.com",
  firstname: "Ulrich",
  lastname: "Germain",
  street: "19 Rue des Fleurs",
  zipcode: "75010",
  city: "Paris",
  password: await argon2.hash("password_ulrich"),
  profile_picture: "https://api.dicebear.com/7.x/adventurer/svg?seed=ulrich-germain",
  description: "Ulrich aime le bricolage.",
  availability: "Weekends",
  role_id: roleMember.id,
});
await user21.addSkill(chant);

const user22 = await User.create({
  id: 22,
  email: "valerie@example.com",
  firstname: "Valérie",
  lastname: "Carpentier",
  street: "21 Avenue du Général",
  zipcode: "69005",
  city: "Lyon",
  password: await argon2.hash("password_valerie"),
  profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=valerie-carpentier",
  description: "Valérie adore la cuisine.",
  availability: "Flexible",
  role_id: roleMember.id,
});
await user22.addSkill(cuisine);

const user23 = await User.create({
  id: 23,
  email: "william@example.com",
  firstname: "William",
  lastname: "Lemoine",
  street: "8 Rue des Champs",
  zipcode: "31000",
  city: "Toulouse",
  password: await argon2.hash("password_william"),
  profile_picture: "https://api.dicebear.com/7.x/big-smile/svg?seed=william-lemoine",
  description: "William aime le jardinage.",
  availability: "Weekends",
  role_id: roleMember.id,
});
await user23.addSkill(jardinage);

const user24 = await User.create({
  id: 24,
  email: "xavier@example.com",
  firstname: "Xavier",
  lastname: "Martin",
  street: "2 Rue de la Paix",
  zipcode: "75002",
  city: "Paris",
  password: await argon2.hash("password_xavier"),
  profile_picture: "https://api.dicebear.com/7.x/personas/svg?seed=xavier-martin",
  description: "Xavier est passionné de programmation.",
  availability: "Matin",
  role_id: roleMember.id,
});
await user24.addSkill(programmation);

const user25 = await User.create({
  id: 25,
  email: "yasmine@example.com",
  firstname: "Yasmine",
  lastname: "Roux",
  street: "11 Rue Lafayette",
  zipcode: "31000",
  city: "Toulouse",
  password: await argon2.hash("password_yasmine"),
  profile_picture: "https://api.dicebear.com/7.x/personas/svg?seed=yasmine-roux",
  description: "Yasmine aime la photographie.",
  availability: "Soirées",
  role_id: roleMember.id,
});
await user25.addSkill(photographie);
console.log("Adding services...");
const service1 = await Service.create({
  id: 30,
  object: "Besoin d'aide pour coder une application",
  status: "accepted",
  date: new Date(),
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
  status: "pending",
  sender_id: user25.id, // Théo
  receiver_id: user21.id, // Anna
});

const service5 = await Service.create({
  id: 34,
  object: "Aide en photographie",
  status: "pending",
  date: new Date(),
  sender_id: user10.id, // Nathan = donneur
  receiver_id: user7.id, // Léa
});

const service6 = await Service.create({
  id: 35,
  object: "Besoin d'aide en jardinage",
  status: "accepted",
  date: new Date(),
  sender_id: user6.id, // Noah
  receiver_id: user10.id, // Nathan = receveur
});

const service7 = await Service.create({
  id: 36,
  object: "Cours de programmation pour débutant",
  status: "completed",
  date: new Date(),
  sender_id: user10.id, // Nathan
  receiver_id: user8.id, // Tom
});

const service8 = await Service.create({
  id: 37,
  object: "Besoin de conseils en photo",
  status: "accepted",
  date: new Date(),
  sender_id: user9.id, // Manon
  receiver_id: user10.id, // Nathan
});

const service9 = await Service.create({
  id: 38,
  object: "Apprendre à coudre à la machine",
  status: "pending",
  date: new Date(),
  sender_id: user10.id, // Nathan
  receiver_id: user12.id, // Jules
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
console.log("Syncing PostgreSQL sequences...");

await sequelize.query(`
  SELECT setval(pg_get_serial_sequence('"user"', 'id'), (SELECT MAX(id) FROM "user"));
`);
await sequelize.query(`
  SELECT setval(pg_get_serial_sequence('service', 'id'), (SELECT MAX(id) FROM service));
`);
await sequelize.query(`
  SELECT setval(pg_get_serial_sequence('review', 'id'), (SELECT MAX(id) FROM review));
`);
await sequelize.query(`
  SELECT setval(pg_get_serial_sequence('message', 'id'), (SELECT MAX(id) FROM message));
`);

console.log("Seeding done! Closing connection...");
await sequelize.close();
