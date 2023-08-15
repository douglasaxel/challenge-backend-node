import { randomUUID } from 'crypto'

type BookData = {
	title: string
	author: string
	description: string
	isbn: string
	isRented?: boolean
} & ({
	id?: undefined
} | {
	id: string
	createdAt: Date
})

class Book {
	id: string
	title: string
	author: string
	description: string
	isbn: string
	isRented: boolean
	createdAt: Date

	constructor(data: BookData) {
		this.id = data.id ? data.id : randomUUID()
		this.title = data.title
		this.author = data.author
		this.description = data.description
		this.isbn = data.isbn
		this.isRented = data.isRented === undefined ? false : data.isRented
		this.createdAt = data.id ? data.createdAt : new Date()
	}
}

export default Book
