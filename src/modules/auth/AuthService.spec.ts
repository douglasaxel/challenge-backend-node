import MockUserRepository from '@repositories/implementation/MockUserRepository'

import { AuthService } from './AuthService'
import { CreateUserDTO } from './dto/CreateUserDTO'

describe('AuthService', () => {
	let userRepository: MockUserRepository
	let authService: AuthService

	beforeAll(() => {
		userRepository = new MockUserRepository()
		authService = new AuthService(userRepository)
	})

	it('should be able to create a user', async () => {
		const userData: CreateUserDTO = {
			name: 'Fulano',
			email: 'teste@teste.com',
			password: '123123'
		}

		const user = await authService.create(userData)

		expect(user).toHaveProperty('id')
		expect(user.email).toBe(userData.email)
	})

	it('should be able to sign in', async () => {
		const userData: CreateUserDTO = {
			name: 'Fulano',
			email: 'teste@teste.com',
			password: '123123'
		}

		await authService.create(userData)
		const logged = await authService.login({
			email: userData.email,
			password: userData.password,
		})

		expect(logged).toHaveProperty('user')
		expect(logged).toHaveProperty('token')
	})
})
