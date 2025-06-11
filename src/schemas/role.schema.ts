import { z } from "zod";

const roleSchema = z.object({
  name: z.string(),
});

export default roleSchema;
