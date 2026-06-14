import { z } from "zod";

export const userRoleSchema = z.enum(["STUDENT", "PROFESSIONAL", "CURATOR", "ADMIN"]);
export const authProviderSchema = z.enum(["EMAIL", "GOOGLE", "APPLE"]);

export const sessionUserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  role: userRoleSchema,
  isPremium: z.boolean()
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type AuthProvider = z.infer<typeof authProviderSchema>;
export type SessionUser = z.infer<typeof sessionUserSchema>;
