import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

export default class Message extends Model {}

Message.init(
  {
    sender_id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },    
    sending_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "message",
  },
);
