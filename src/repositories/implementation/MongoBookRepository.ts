import Book from '@entities/books/Book'
import { BookModel } from '@entities/books/BookMongo'
import AppError from '@error/AppError'

import IBookRepository, { BookGetAllFilter, CreateBookData, UpdateBookData } from '../IBookRepository'

class MongoBookRepository implements IBookRepository {
	async create(book: CreateBookData): Promise<Book> {
		const newBook = new BookModel(book)
		const saved = await newBook.save()

		const obj = saved.toObject()

		return new Book({
			...obj,
			id: obj._id.toHexString(),
		})
	}

	async update(book: UpdateBookData, id: string): Promise<Book> {
		const updatedBook = await BookModel.findByIdAndUpdate(id, book)
		if (!updatedBook) {
			throw new AppError('Erro ao atualizar livro', 400)
		}

		return new Book({
			...updatedBook,
			id: updatedBook._id.toHexString(),
		})
	}

	async getAll({ title, isbn, author, isRented }: BookGetAllFilter): Promise<Book[]> {
		const findedBooks = await BookModel.find({
			title: !title ? /.*/i : RegExp(title, 'i'),
			author: !author ? /.*/i : RegExp(author, 'i'),
			isbn: !isbn ? /.*/i : RegExp(isbn, 'i'),
		}).exec()

		const result = findedBooks.map(b => b.toObject())

		return result.map(r => new Book({
			...r,
			id: r._id.toHexString(),
		}))
	}

	async getOne(id: string): Promise<Book | undefined | null> {
		const findedBook = await BookModel.findById(id)
		if (!findedBook) return null

		const result = findedBook.toObject()

		return new Book({
			...result,
			id: result._id.toHexString(),
		})
	}

	async remove(id: string): Promise<void> {
		await BookModel.findByIdAndDelete(id)
	}
}

export default MongoBookRepository
