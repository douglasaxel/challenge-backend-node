import Book from '@entities/books/Book'

export type CreateBookData = Omit<Book, 'id' | 'isRented' | 'createdAt'>
export type UpdateBookData = Partial<Book>
export type BookGetAllFilter = {
	title?: string
	isbn?: string
	author?: string
	isRented?: boolean
}

interface IBookRepository {
	create(data: CreateBookData): Promise<Book>
	update(data: UpdateBookData, id: string): Promise<Book>
	getAll(filter?: BookGetAllFilter): Promise<Book[]>
	getOne(id: string): Promise<Book | undefined | null>
	remove(id: string): Promise<void>
}

export default IBookRepository
