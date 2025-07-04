import { z } from 'zod';

export const setPasswordSchema = z.object({
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    confirm_password: z.string()
        .min(6, { message: "Confirm password must be at least 6 characters long" }),
}).refine(
    (data) => data.password === data.confirm_password,
    {
        message: "Passwords must match!",
        path: ["confirm_password"], 
    }
);
