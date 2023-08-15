import handleError from '@error/handleError'
import { NextFunction, Request, Response } from 'express'

async function errorHandler(error: Error, _req: Request, res: Response, next: NextFunction) {
	if (!error) return next()

	const { code, message } = handleError(error)
	return res.status(code).json({ message })
}

export default errorHandler
