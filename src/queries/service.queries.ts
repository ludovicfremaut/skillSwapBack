// src/queries/service.queries.ts
import { sequelize } from "../models/associations";
import { QueryTypes } from "sequelize";

export async function getAllServicesForUser(userId: number) {
  const [services] = await sequelize.query(
    `
    SELECT
      s.id,
      s.object,
      s.status,
      s.date,
      sender.firstname AS sender_firstname,
      sender.lastname AS sender_lastname,
      receiver.firstname AS receiver_firstname,
      receiver.lastname AS receiver_lastname
    FROM service s
    JOIN "user" sender ON s.sender_id = sender.id
    JOIN "user" receiver ON s.receiver_id = receiver.id
    WHERE s.sender_id = :userId OR s.receiver_id = :userId
    ORDER BY s.date DESC
    `,
    {
      replacements: { userId },
      type: QueryTypes.SELECT,
    }
  );

  return services;
}
