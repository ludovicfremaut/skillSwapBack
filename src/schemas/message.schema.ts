import { z } from "zod";

// JE vais créer un schéma de validation
// des données de mon model List
const messageSchema = z.object({
  sending_date: z.coerce.date(),
  updated_at: z.coerce.date(),
  body: z.string(),
});

export default messageSchema;
