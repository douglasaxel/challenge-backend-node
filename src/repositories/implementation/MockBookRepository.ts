
import Book from '@entities/books/Book'
import AppError from '@error/AppError'

import type IBookRepository from '../IBookRepository'
import { type BookGetAllFilter, type CreateBookData } from '../IBookRepository'

class MockBookRepository implements IBookRepository {
	books: Book[] = []

	async create(data: CreateBookData): Promise<Book> {
		const book = new Book(data)
		this.books.push(book)
		return Promise.resolve(book)
	}

	async update(data: Partial<Book>, id: string): Promise<Book> {
		const exist = this.books.find((b) => b.id === id)
		if (exist == null) throw new AppError('Livro não encontrado')
		this.books = this.books.map((b) => {
			if (b.id === id) {
				return { ...b, ...data }
			}
			return b
		})

		return Promise.resolve(this.books.find((b) => b.id === id)!)
	}

	async getAll(_filter?: BookGetAllFilter): Promise<Book[]> {
		return this.books
	}

	async getOne(id: string): Promise<Book | undefined | null> {
		const book = this.books.find(b => b.id === id)
		return Promise.resolve(book)
	}

	async remove(id: string): Promise<void> {
		const index = this.books.findIndex(b => b.id === id)
		this.books.splice(index, 1)
	}
}

export default MockBookRepository
