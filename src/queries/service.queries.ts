// src/queries/service.queries.ts
import { sequelize } from "../models/associations";
import { QueryTypes } from "sequelize";

export async function getAllServicesForUser(userId: number) {
  const rows = await sequelize.query(
    `
    SELECT
      s.id,
      s.object AS title,
      s.status,
      s.date AS date,
      sender.id AS "giverId",
      receiver.id AS "receiverId",
      CONCAT(sender.firstname, ' ', sender.lastname) AS "giverName",
      CONCAT(receiver.firstname, ' ', receiver.lastname) AS "receiverName"
    FROM service s
    JOIN "user" sender ON s.sender_id = sender.id
    JOIN "user" receiver ON s.receiver_id = receiver.id
    WHERE s.sender_id = :userId OR s.receiver_id = :userId
    ORDER BY s.date DESC
    `,
    {
      replacements: { userId },
      type: QueryTypes.SELECT,
    },
  );

  // console.log("→ Nombre de services trouvés :", rows.length);
  return rows;
}
