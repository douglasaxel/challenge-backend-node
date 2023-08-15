import { z } from 'zod'

export const CreateBookDTO = z.object({
	title: z.string({ required_error: 'O titulo é obrigatório' }),
	author: z.string({ required_error: 'O autor é obrigatório' }),
	description: z.string({ required_error: 'A descrição é obrigatório' }),
	isbn: z.string({ required_error: 'O ISBN é obrigatório' }),
	isRented: z.boolean().optional(),
})

export type CreateBookDTO = z.infer<typeof CreateBookDTO>
