import { User, Role, Skill, Service, Review, Message, sequelize } from "../models/associations.js";
import argon2 from "argon2";

console.log("Starting database seeding...");

// * AJOUT DE RÔLES
console.log("Adding roles...");
const roleMember = await Role.create({ id: 10, name: "Member" });
const roleModerator = await Role.create({ id: 20, name: "Moderator" });
const roleGuest = await Role.create({ id: 30, name: "Guest" });

// * AJOUT DE COMPÉTENCES
console.log("Adding skills...");
const painting = await Skill.create({ id: 10, name: "Painting" });
const cooking = await Skill.create({ id: 20, name: "Cooking" });
const programming = await Skill.create({ id: 30, name: "Programming" });
const gardening = await Skill.create({ id: 40, name: "Gardening" });

// * AJOUT D'UTILISATEURS
console.log("Adding users...");
const emily = await User.create({
  id: 10,
  email: "emily@example.com",
  firstname: "Emily",
  lastname: "Stone",
  street: "45 Green Street",
  zipcode: "10010",
  city: "New York",
  profile_photo: "emily.jpg",
  password: await argon2.hash("password_emily"),
  description: "Avid painter and art lover.",
  availability: "Weekdays after 5 PM",
  role_id: roleMember.id,
});

const david = await User.create({
  id: 20,
  email: "david@example.com",
  firstname: "David",
  lastname: "Smith",
  street: "99 Oak Avenue",
  zipcode: "90210",
  city: "Beverly Hills",
  profile_photo: "david.jpg",
  password: await argon2.hash("password_david"),
  description: "Chef with a passion for Italian cuisine.",
  availability: "Weekends",
  role_id: roleModerator.id,
});

const claire = await User.create({
  id: 30,
  email: "claire@example.com",
  firstname: "Claire",
  lastname: "Johnson",
  street: "15 River Road",
  zipcode: "60614",
  city: "Chicago",
  profile_photo: "claire.jpg",
  password: await argon2.hash("password_claire"),
  description: "Tech enthusiast and programmer.",
  availability: "Evenings",
  role_id: roleGuest.id,
});

// * ASSOCIATION DES COMPÉTENCES AUX UTILISATEURS
console.log("Associating skills to users...");
await emily.addSkill(painting);
await david.addSkill(cooking);
await claire.addSkills([programming, gardening]);

// * AJOUT DE SERVICES
console.log("Adding services...");
const serviceA = await Service.create({
  id: 10,
  object: "Need help painting my living room",
  status: "pending",
  sender_id: emily.id,
  receiver_id: david.id,
});

const serviceB = await Service.create({
  id: 20,
  object: "Looking for a programming tutor",
  status: "accepted",
  sender_id: claire.id,
  receiver_id: emily.id,
});

// * AJOUT DE REVIEWS
console.log("Adding reviews...");
const review1 = await Review.create({
  id: 10,
  rating: 4,
  comment: "Great help with painting, thanks!",
  service_id: serviceA.id,
  user_id: david.id,
});

const review2 = await Review.create({
  id: 20,
  rating: 5,
  comment: "Excellent tutoring sessions.",
  service_id: serviceB.id,
  user_id: emily.id,
});

// * AJOUT DE MESSAGES
console.log("Adding messages...");
const message1 = await Message.create({
  id: 10,
  body: "Hi David, can you help me with painting?",
  sender_id: emily.id,
  receiver_id: david.id,
});

const message2 = await Message.create({
  id: 20,
  body: "Sure Emily, I’m available this weekend.",
  sender_id: david.id,
  receiver_id: emily.id,
});

console.log("Seeding done! Closing connection...");

await sequelize.close();
