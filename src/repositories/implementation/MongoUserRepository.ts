import User from '@entities/users/User'
import { UserModel } from '@entities/users/UserMongo'
import AppError from '@error/AppError'

import IUserRepository, { CreateUserData } from '../IUserRepository'

class MongoUserRepository implements IUserRepository {

	async create(user: CreateUserData): Promise<User> {
		const newUser = new UserModel(user)
		const saved = await newUser.save()

		const obj = saved.toObject()

		return new User({
			...obj,
			id: obj._id.toHexString(),
		})
	}

	async getOneByEmail(email: string): Promise<User | null | undefined> {
		const user = await UserModel.findOne({ email })
		if (!user) {
			throw new AppError('Usuário não encontrado')
		}

		const obj = user.toObject()

		return new User({
			...obj,
			id: obj._id.toHexString()
		})
	}
}

export default MongoUserRepository
