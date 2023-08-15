// import { AxiosError } from 'axios';

import { logger } from '@utils/logger'
import { ZodError } from 'zod'

import AppError from './AppError'

interface IErrorHandled {
	code: number;
	message: string;
	data?: string;
}

function handleError(err: unknown): IErrorHandled {
	const error = err as Error
	logger.error(err)

	// if (err instanceof AxiosError) {
	// 	return {
	// 		code: err.response?.status ?? 500,
	// 		message: 'Erro de requisição',
	// 		data: JSON.stringify(err.response?.data),
	// 	};
	// }

	if (error instanceof AppError) {
		return {
			code: error.code,
			message: error.message,
		}
	}
	if (/prisma/g.test(error?.message)) {
		return {
			code: 400,
			message: 'Transaction Error',
			data: error.message,
		}
	}
	if (error instanceof ZodError) {
		return {
			code: 400,
			message: error.issues.map(issue => issue.message).join('\n'),
			data: error.toString()
		}
	}

	return {
		code: 500,
		message: 'Ocorreu algum erro no servidor, tente novamente mais tarde',
		data: error?.message,
	}
}

export default handleError
