import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.coerce.date(),
});

export default reviewSchema;
