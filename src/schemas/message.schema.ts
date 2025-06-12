import { z } from "zod";

const messageSchema = z.object({
  sending_date: z.coerce.date(),
  updated_at: z.coerce.date(),
  body: z.string(),
});

export default messageSchema;
