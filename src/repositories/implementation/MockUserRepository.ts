import User from '@entities/users/User'
import AppError from '@error/AppError'

import IUserRepository, { CreateUserData } from '../IUserRepository'

class MockUserRepository implements IUserRepository {
	users: User[] = []

	async create(data: CreateUserData): Promise<User> {
		const user = new User(data)
		this.users.push(user)
		return Promise.resolve(user)
	}

	async getOneByEmail(email: string): Promise<User | null | undefined> {
		const user = this.users.find(u => u.email === email)
		if (!user) {
			throw new AppError('Usuário não encontrado')
		}

		return Promise.resolve(user)
	}
}

export default MockUserRepository
