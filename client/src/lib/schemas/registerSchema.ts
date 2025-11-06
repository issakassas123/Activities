import z from "zod";
import { requiredString } from "../util/util";

export const registerSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: requiredString('password').min(6, { message: 'Password must be at least 6 characters' }),
    displayName: requiredString('displayName'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;