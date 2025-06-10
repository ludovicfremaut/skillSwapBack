import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

export default class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "role",
  },
);
