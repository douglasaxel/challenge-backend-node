import { z } from 'zod'

export const LoginUserDTO = z.object({
	email: z
		.string({ required_error: 'O e-mail é obrigatório' })
		.email('Digite um e-mail válido'),
	password: z.string({ required_error: 'A senha é obrigatória' }),
})

export type LoginUserDTO = z.infer<typeof LoginUserDTO>
