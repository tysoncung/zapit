import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(['admin', 'user', 'moderator']),
  bio: z.string().optional(),
  age: z.number().min(0).optional(),
  isActive: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;
