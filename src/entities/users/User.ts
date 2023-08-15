import { randomUUID } from 'crypto'

type UserData = {
	name: string
	email: string
	password?: string
} & ({
	id?: undefined
} | {
	id: string
	createdAt: Date
})

class User {
	id: string
	name: string
	email: string
	password?: string
	createdAt: Date

	constructor(data: UserData) {
		this.id = data.id ? data.id : randomUUID()
		this.name = data.name
		this.email = data.email
		this.password = data.password
		this.createdAt = data.id ? data.createdAt : new Date()
	}
}

export default User
