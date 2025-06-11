import { z } from "zod";

const skillSchema = z.object({
  name: z.string(),
});

export default skillSchema;
