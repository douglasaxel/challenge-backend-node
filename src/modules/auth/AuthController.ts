import { signToken } from '@utils/token'
import { NextFunction, Request, Response } from 'express'

import { AuthService } from './AuthService'
import { CreateUserDTO } from './dto/CreateUserDTO'
import { LoginUserDTO } from './dto/LoginUserDto'

export class AuthController {
	constructor(private authService: AuthService) { }

	public async create(req: Request, res: Response, next: NextFunction) {
		const { name, email, password } = req.body as CreateUserDTO

		try {
			const user = await this.authService.create({
				name,
				email,
				password
			})

			return res.status(201).json(user)
		} catch (err) {
			next(err)
		}
	}

	public async login(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body as LoginUserDTO

		try {
			const result = await this.authService.login({ email, password })

			return res.json(result)
		} catch (err) {
			next(err)
		}
	}
}
