import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

export default class Role extends Model {
  public id!: number;
  public name!: string;
}

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
