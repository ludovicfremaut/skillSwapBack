import sequelize from "../database/client";

async function alterServiceStatusColumn() {
  try {
    // Étape 1 : Créer le type ENUM si ce n'est pas déjà fait
    await sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE service_status AS ENUM ('pending', 'accepted', 'completed');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Étape 2 : Modifier la colonne "status" de TEXT à ENUM
    await sequelize.query(`
      ALTER TABLE "service"
      ALTER COLUMN "status" TYPE service_status
      USING status::service_status;
    `);

    console.log("Colonne 'status' de service modifiée avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la migration de la colonne 'status':", error);
    process.exit(1);
  }
}

alterServiceStatusColumn();
