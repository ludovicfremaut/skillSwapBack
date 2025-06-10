import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";
import Skill from "./Skill.model";

export default class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;

  declare addSkill: (skill: Skill)=>Promise<void>;
  declare addSkills: (skill: Skill[])=>Promise<void>;
}

User.init(
  {
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
    profil_photo: {
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
  },
  {
    sequelize,
    tableName: "user",
  },
);
