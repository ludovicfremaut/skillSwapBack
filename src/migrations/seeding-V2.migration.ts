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

// * RÔLES
console.log("Adding roles...");
const roleMember = await Role.create({ id: 10, name: "Membre" });
const roleModerator = await Role.create({ id: 20, name: "Modérateur" });
const roleGuest = await Role.create({ id: 30, name: "Invité" });

// * COMPÉTENCES
console.log("Adding skills...");
const peinture = await Skill.create({ id: 10, name: "Peinture" });
const cuisine = await Skill.create({ id: 20, name: "Cuisine" });
const programmation = await Skill.create({ id: 30, name: "Programmation" });
const jardinage = await Skill.create({ id: 40, name: "Jardinage" });

const skills = [peinture, cuisine, programmation, jardinage];

// * UTILISATEURS
console.log("Adding users...");
const usersData = [
  { firstname: "Alice", lastname: "Martin", city: "Paris" },
  { firstname: "Lucas", lastname: "Dubois", city: "Lyon" },
  { firstname: "Emma", lastname: "Bernard", city: "Marseille" },
  { firstname: "Hugo", lastname: "Morel", city: "Toulouse" },
  { firstname: "Chloé", lastname: "Leroy", city: "Nice" },
  { firstname: "Noah", lastname: "Garcia", city: "Nantes" },
  { firstname: "Léa", lastname: "Faure", city: "Strasbourg" },
  { firstname: "Tom", lastname: "Roux", city: "Bordeaux" },
  { firstname: "Manon", lastname: "Dupont", city: "Lille" },
  { firstname: "Nathan", lastname: "Giraud", city: "Rennes" },
  { firstname: "Sarah", lastname: "Chevalier", city: "Reims" },
  { firstname: "Jules", lastname: "Lambert", city: "Le Havre" },
  { firstname: "Clara", lastname: "Marchand", city: "Saint-Étienne" },
  { firstname: "Louis", lastname: "Blanc", city: "Grenoble" },
  { firstname: "Camille", lastname: "Philippe", city: "Dijon" },
  { firstname: "Maxime", lastname: "Barbier", city: "Angers" },
  { firstname: "Inès", lastname: "Moulin", city: "Nîmes" },
  { firstname: "Antoine", lastname: "Henry", city: "Villeurbanne" },
  { firstname: "Lola", lastname: "Benoit", city: "Clermont-Ferrand" },
  { firstname: "Matéo", lastname: "Gomez", city: "Rouen" },
  { firstname: "Anna", lastname: "Renard", city: "Avignon" },
  { firstname: "Enzo", lastname: "Schmitt", city: "Caen" },
  { firstname: "Eva", lastname: "Meunier", city: "Metz" },
  { firstname: "Léna", lastname: "Baron", city: "Tours" },
  { firstname: "Théo", lastname: "Carpentier", city: "Amiens" },
];

const users = [];

for (let i = 0; i < usersData.length; i++) {
  const user = usersData[i];
  const gender = i % 2 === 0 ? "women" : "men";
  const profile_picture = `https://randomuser.me/api/portraits/${gender}/${i}.jpg`;

  const createdUser = await User.create({
    id: 10 + i,
    email: `${user.firstname.toLowerCase()}@example.com`,
    firstname: user.firstname,
    lastname: user.lastname,
    street: `${i + 1} Rue de ${user.lastname}`,
    zipcode: "75000",
    city: user.city,
    password: await argon2.hash(`password_${user.firstname.toLowerCase()}`),
    profile_picture,
    description: `Je suis ${user.firstname}, passionné(e) par la ${skills[i % 4].name.toLowerCase()}.`,
    availability: "Flexible",
    role_id: [roleMember.id, roleModerator.id, roleGuest.id][i % 3],
  });

  await createdUser.addSkills([skills[i % 4]]);
  users.push(createdUser);
}

// * SERVICES
console.log("Adding services...");
const service1 = await Service.create({
  id: 100,
  object: "Besoin d'aide pour jardiner",
  status: "pending",
  sender_id: users[0].id,
  receiver_id: users[1].id,
});

const service2 = await Service.create({
  id: 101,
  object: "Cours de programmation pour débutant",
  status: "accepted",
  sender_id: users[2].id,
  receiver_id: users[3].id,
});

// * REVIEWS
console.log("Adding reviews...");
await Review.create({
  id: 200,
  rating: 5,
  comment: "Super service ! Très efficace.",
  service_id: service1.id,
  user_id: users[1].id,
});

await Review.create({
  id: 201,
  rating: 4,
  comment: "Bonne expérience, merci !",
  service_id: service2.id,
  user_id: users[3].id,
});

// * MESSAGES
console.log("Adding messages...");
await Message.create({
  id: 300,
  body: "Salut, tu peux m'aider avec le jardinage ?",
  sender_id: users[0].id,
  receiver_id: users[1].id,
});

await Message.create({
  id: 301,
  body: "Oui bien sûr, ce week-end ça te va ?",
  sender_id: users[1].id,
  receiver_id: users[0].id,
});

console.log("Seeding done! Closing connection...");
await sequelize.close();
