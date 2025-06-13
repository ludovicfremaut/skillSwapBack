import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

export default class Review extends Model {}

Review.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_DATE"),
    },
  },
  {
    sequelize,
    tableName: "review",
  },
);
