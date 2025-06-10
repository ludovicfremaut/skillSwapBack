import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

// Connexion test
try {
  await sequelize.authenticate();
  console.log("connection has been established succesfully.");
} catch (error) {
  console.log("Unable to connect to the database.", error);
}

export default sequelize;
