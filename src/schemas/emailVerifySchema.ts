import { z } from "zod";

const emailSchema = z.string()
  .email("Invalid email format")

export const emailVerifySchema = z.object({
  email: emailSchema,
});