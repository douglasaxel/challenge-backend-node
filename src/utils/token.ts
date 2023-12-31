import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken'

export function signToken(payload: string | Buffer | object) {
	const token = jwtSign(payload, process.env.JWT_SECRET ?? 'teste')

	return token
}

export function decodeToken<T>(token: string): T {
	const body = jwtVerify(token, process.env.JWT_SECRET ?? 'teste') as T

	return body
}
