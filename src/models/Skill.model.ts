import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

export default class Skill extends Model {}

Skill.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "skill",
  },
);
