import isAuthenticated from '@middlewares/isAuthenticated'
import validateRoutePayload from '@middlewares/validateRoutePayload'
import { Router } from 'express'

import { bookController } from '.'
import { CreateBookDTO } from './dto/CreateBookDto'
import { UpdateBookDTO } from './dto/UpdateBookDto'

const router = Router()

// POST routes
router.post('/', isAuthenticated, validateRoutePayload(CreateBookDTO), (req, res, next) => {
	return bookController.create(req, res, next)
})

// PUT routes
router.put('/:idBook', isAuthenticated, validateRoutePayload(UpdateBookDTO), (req, res, next) => {
	return bookController.update(req, res, next)
})

// PATCH routes
router.patch('/:idBook/rent', isAuthenticated, validateRoutePayload(UpdateBookDTO), (req, res, next) => {
	return bookController.rent(req, res, next)
})
router.patch('/:idBook/return', isAuthenticated, validateRoutePayload(UpdateBookDTO), (req, res, next) => {
	return bookController.returnBook(req, res, next)
})

// // GET routes
router.get('/', isAuthenticated, (req, res, next) => {
	return bookController.getAll(req, res, next)
})
router.get('/:idBook', isAuthenticated, (req, res, next) => {
	return bookController.getOne(req, res, next)
})

// // DELETE routes
// router.delete('/:idBook', controller.remove)

export default router
