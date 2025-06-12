import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  street: z.string(),
  zipcode: z.string(),
  city: z.string(),
  password: z.string(),
  profile_picture: z.string(),
  description: z.string(),
  availability: z.string(),
});

export default userSchema;
