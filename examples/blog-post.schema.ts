import { z } from 'zod';

export const BlogPostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string(),
  authorId: z.string().uuid(),
  status: z.enum(['draft', 'published', 'archived']),
  tags: z.array(z.string()).optional(),
  publishedAt: z.string().optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
