import { z } from "zod";

const serviceSchema = z.object({
  object: z.string(),
  status: z.string(),
  date: z.coerce.date(),
});

export default serviceSchema;
