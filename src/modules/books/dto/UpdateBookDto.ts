import { z } from 'zod'

export const UpdateBookDTO = z.object({
	title: z.string().optional(),
	author: z.string().optional(),
	description: z.string().optional(),
	isbn: z.string().optional(),
	isRented: z.boolean().optional(),
})

export type UpdateBookDTO = z.infer<typeof UpdateBookDTO>
