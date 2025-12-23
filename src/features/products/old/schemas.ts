// import { z } from 'zod';

// export const productStatusSchema = z.enum(['draft', 'active', 'archived']);

// export const productFiltersSchema = z.object({
// 	search: z.string().max(100).optional(),
// 	status: productStatusSchema.or(z.literal('all')).optional(),
// 	category: z.string().max(50).or(z.literal('all')).optional(),
// 	minPrice: z.number().min(0).optional(),
// 	maxPrice: z.number().min(0).optional(),
// 	page: z.number().int().min(1).default(1),
// 	pageSize: z.number().int().min(5).max(50).default(20),
// });

// export const createProductSchema = z.object({
// 	name: z.string().min(2).max(100),
// 	sku: z.string().min(2).max(50),
// 	price: z.number().min(0),
// 	stock: z.number().int().min(0),
// 	status: productStatusSchema,
// 	category: z.string().max(50).nullable().optional(),
// 	description: z.string().max(2000).nullable().optional(),
// });

// export const updateProductSchema = createProductSchema.partial().extend({
// 	id: z.string(),
// });

// export type ProductFiltersFormValues = z.infer<typeof productFiltersSchema>;
