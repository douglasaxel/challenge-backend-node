import User from '@entities/users/User'

export type CreateUserData = Omit<User, 'id' | 'createdAt'>

interface IUserRepository {
	create(data: CreateUserData): Promise<User>
	getOneByEmail(email: string): Promise<User | undefined | null>
}

export default IUserRepository
