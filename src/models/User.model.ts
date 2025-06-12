import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";
import Skill from "./Skill.model";

export default class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare firstname: string;
  declare lastname: string;
  declare street: string;
  declare zipcode: string;
  declare city: string;
  declare profil_photo: string;
  declare description: string;
  declare availability: string;
  declare role_id: number | null;

  declare addSkill: (skill: Skill) => Promise<void>;
  declare addSkills: (skill: Skill[]) => Promise<void>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    street: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    profile_photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    availability: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
