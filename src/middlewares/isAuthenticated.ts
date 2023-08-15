import { UserModel } from '@entities/users/UserMongo'
import AppError from '@error/AppError'
import { decodeToken } from '@utils/token'
import { NextFunction, Request, Response } from 'express'

type User = {
	id: number
	name: string
}

async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(/\s/)?.[1]
	if (!token) {
		return next(new AppError('Você não está autorizado', 401))
	}

	const payload = decodeToken<User>(token)

	const user = await UserModel.findById(payload.id)
	if (!user) {
		return next(new AppError('Você não está autorizado', 401))
	}

	req.user = payload
	next()
}

export default isAuthenticated
