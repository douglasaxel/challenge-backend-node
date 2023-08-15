
import MongoUserRepository from '@repositories/implementation/MongoUserRepository'

import { AuthController } from './AuthController'
import { AuthService } from './AuthService'
import authRoutes from './routes'

const authRepository = new MongoUserRepository()
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

export { authController, authRoutes }
