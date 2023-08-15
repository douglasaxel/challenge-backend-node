import AppError from '@error/AppError'
import IUserRepository from '@repositories/IUserRepository'
import { comparePassword, hashPassword } from '@utils/password'
import { signToken } from '@utils/token'

import { type CreateUserDTO } from './dto/CreateUserDTO'
import { type LoginUserDTO } from './dto/LoginUserDto'

export class AuthService {
	constructor(private repository: IUserRepository) { }

	async create(data: CreateUserDTO) {
		const password = await hashPassword(data.password)

		const book = await this.repository.create({
			...data,
			password,
		})

		return book
	}

	async login(data: LoginUserDTO) {
		const user = await this.repository.getOneByEmail(data.email)
		if (!user) {
			throw new AppError('Este usuário não existe')
		}

		const isEqual = await comparePassword(data.password, user.password ?? '')
		if (!isEqual) {
			throw new AppError('E-mail ou senha incorretos', 401)
		}

		delete user.password

		const token = signToken({
			id: user.id,
			name: user.name,
		})

		return {
			user,
			token,
		}
	}
}
