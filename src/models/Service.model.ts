import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

interface ServiceAttributes {
  id: number;
  object: string;
  status: string;
  sender_id: number;
  receiver_id: number;
  date: Date;
}

export default class Service extends Model<ServiceAttributes> {}

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
