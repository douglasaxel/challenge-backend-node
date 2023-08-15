import validateRoutePayload from '@middlewares/validateRoutePayload'
import { Router } from 'express'

import { authController } from '.'
import { CreateUserDTO } from './dto/CreateUserDTO'
import { LoginUserDTO } from './dto/LoginUserDto'

const router = Router()

// POST routes
router.post('/', validateRoutePayload(CreateUserDTO), (req, res, next) => {
	return authController.create(req, res, next)
})
router.post('/login', validateRoutePayload(LoginUserDTO), (req, res, next) => {
	return authController.login(req, res, next)
})

export default router
