import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

export default class Service extends Model {
  public id!: number;
  public object!: string;
  public status!: string;
  public sender_id!: number;
  public receiver_id!: number;
}

Service.init(
  {
    object: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    tableName: "service",
  },
);
