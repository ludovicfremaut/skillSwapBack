import { z } from "zod";

// JE vais créer un schéma de validation
// des données de mon model List
const messageSchema = z.object({
  sending_date: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  body: z.string(),
});

export default messageSchema;
