import { z } from "zod";

export const newletterSchema = z.object({
    email: z.string().email()
})