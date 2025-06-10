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

// Service - User

// User - Review

// Review - User

// Service - Review

// Review - Service

// User - Skill ( through user_has_skills )

// Skill - User ( through user_has_skills )

// User - Role

// Role - User

// User - Message

// Message - User
