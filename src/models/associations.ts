import sequelize from "../database/client";

// No .ts extension with Typescript
// Or add it with
// {
//  "compilerOptions": {
//    "allowImportingTsExtensions": true,
//  }
// }
// in tsconfig.json with moduleresolution : "bundler" and not compiled in JS
import Message from "./Message.model";
import Review from "./Review.model";
import Role from "./Role.model";
import Service from "./Service.model";
import Skill from "./Skill.model";
import User from "./User.model";

// User - Service
User.hasMany(Service, {
  foreignKey: "receiver_id",
  as: "requestedServices",
});

User.hasMany(Service, {
  foreignKey: "sender_id",
  as: "providedServices",
});

// Service - User
Service.belongsTo(User, {
  foreignKey: "receiver_id",
  as: "client",
});

Service.belongsTo(User, {
  foreignKey: "sender_id",
  as: "provider",
});

// User - Review
User.hasMany(Review, {
  foreignKey: "user_id",
  as: "postedReviews",
});

// Review - User
Review.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
});

// Service - Review
Service.hasOne(Review, {
  foreignKey: {
    name: "service_id",
    allowNull: true,
  },
  as: "review",
  onDelete: "CASCADE",
});

// Review - Service
Review.belongsTo(Service, {
  foreignKey: {
    name: "service_id",
    allowNull: false,
  },
  as: "service",
});

// User - Skill ( through user_has_skills )
User.belongsToMany(Skill, {
  as: "skills",
  through: "user_has_skills",
  foreignKey: "user_id",
  otherKey: "skill_id",
});

// Skill - User ( through user_has_skills )
Skill.belongsToMany(User, {
  as: "users",
  through: "user_has_skills",
  foreignKey: "skill_id",
  otherKey: "user_id",
});

// User - Role
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Role - User
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
});

// User - Message
User.hasMany(Message, {
  foreignKey: "sender_id",
  as: "sentMessages",
});

User.hasMany(Message, {
  foreignKey: "receiver_id",
  as: "receivedMessages",
});

// Message - User
Message.belongsTo(User, {
  foreignKey: "sender_id",
  as: "sender",
});

Message.belongsTo(User, {
  foreignKey: "receiver_id",
  as: "receiver",
});

export { Message, Review, Role, Service, Skill, User, sequelize };
