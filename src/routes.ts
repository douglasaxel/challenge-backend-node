import { authRoutes } from '@modules/auth'
import { bookRoutes } from '@modules/books'
import { Router } from 'express'

const router = Router()

router.use('/auth', authRoutes)
router.use('/books', bookRoutes)

export default router
