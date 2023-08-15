import AppError from '@error/AppError'
import IUserRepository from '@repositories/IUserRepository'
import { comparePassword, hashPassword } from '@utils/password'

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
		const exist = await this.repository.getOneByEmail(data.email)
		if (!exist) {
			throw new AppError('Este usuário não existe')
		}

		const isEqual = await comparePassword(data.password, exist.password ?? '')
		if (!isEqual) {
			throw new AppError('E-mail ou senha incorretos', 401)
		}

		delete exist.password
		return exist
	}
}
