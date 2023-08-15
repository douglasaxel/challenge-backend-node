import { z } from 'zod'

export const CreateUserDTO = z.object({
	name: z.string({ required_error: 'O nome é obrigatório' }),
	email: z
		.string({ required_error: 'O e-mail é obrigatório' })
		.email('Digite um e-mail válido'),
	password: z.string({ required_error: 'A senha é obrigatória' }),
})

export type CreateUserDTO = z.infer<typeof CreateUserDTO>
