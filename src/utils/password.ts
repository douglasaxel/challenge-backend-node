import { compare, genSalt, hash } from 'bcrypt'

export async function hashPassword(password: string) {
	const salt = await genSalt(10)
	const hashedPassword = await hash(password, salt)

	return hashedPassword
}

export async function comparePassword(
	password: string,
	hashedPassword: string
) {
	const isPasswordValid = await compare(password, hashedPassword)

	return isPasswordValid
}
