import { z } from 'zod'

export const GetAllBookDTO = z.object({
	title: z.string().optional(),
	author: z.string().optional(),
	isbn: z.string().optional(),
	isRented: z.boolean().optional(),
})

export type GetAllBookDTO = z.infer<typeof GetAllBookDTO>
