import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  currency: z.enum(['AUD', 'USD', 'EUR', 'GBP']),
  sku: z.string().min(1),
  inStock: z.boolean(),
  quantity: z.number().int().min(0),
});

export type Product = z.infer<typeof ProductSchema>;
