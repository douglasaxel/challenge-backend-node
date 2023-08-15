import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

function validateRoutePayload<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.parseAsync({ ...req.body, ...req.query, ...req.params })
			next()
		} catch (err) {
			return next(err)
		}
	}
}

export default validateRoutePayload
