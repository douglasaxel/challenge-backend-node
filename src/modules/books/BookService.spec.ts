import AppError from '@error/AppError'
import IBookRepository from '@repositories/IBookRepository'
import MockBookRepository from '@repositories/implementation/MockBookRepository'

import { BookService } from './BookService'
import { CreateBookDTO } from './dto/CreateBookDto'
import { UpdateBookDTO } from './dto/UpdateBookDto'

describe('BookService', () => {
	let bookRepository: IBookRepository
	let bookService: BookService
	const bookData: CreateBookDTO = {
		title: 'Livro 1',
		author: 'Fulano Otavio',
		isbn: '123456',
		description: 'Descrição Livro 1'
	}

	beforeAll(() => {
		bookRepository = new MockBookRepository()
		bookService = new BookService(bookRepository)
	})

	const createBook = async () => {
		const book = await bookService.create(bookData)
		return book
	}

	it('should be able to create a book', async () => {
		const book = await createBook()

		expect(book).toHaveProperty('id')
		expect(book).toHaveProperty('isRented')
		expect(book.title).toBe(bookData.title)
	})

	it('should be able to update a book', async () => {
		const book = await createBook()
		const updateData: UpdateBookDTO = {
			title: 'Livro 1 Editado',
			description: 'Descrição Livro 1 Editado',
		}

		const updatedBook = await bookService.update(updateData, book.id)

		expect(updatedBook.title).not.toBe(bookData.title)
		expect(updatedBook.description).toBe(updateData.description)
	})

	it('should be able to find a book by id', async () => {
		const book = await createBook()
		const findedBook = await bookService.getOne(book.id)

		expect(findedBook).not.toBeNull()
		expect(findedBook).not.toBeUndefined()
		expect(findedBook?.title).toBe(book.title)
		expect(findedBook?.description).toBe(book.description)
	})

	it('should be able to rent a book', async () => {
		const book = await createBook()
		await bookService.rent(book.id)
		const rentedBook = await bookService.getOne(book.id)

		expect(rentedBook?.isRented).toBe(true)
	})

	it('should not be able to rent the same book', async () => {
		const book = await createBook()

		try {
			await bookService.rent(book.id)
			await bookService.rent(book.id)
		} catch (err) {
			expect(err).toBeInstanceOf(AppError)
			expect(err).toHaveProperty('message', 'Este livro já está alugado')
		}
	})

	it('should not be able to return the same book', async () => {
		const book = await createBook()

		try {
			await bookService.returnBook(book.id)
			await bookService.returnBook(book.id)
		} catch (err) {
			expect(err).toBeInstanceOf(AppError)
			expect(err).toHaveProperty('message', 'Este livro não estáva alugado')
		}
	})

	it('should not be able to update a rented book', async () => {
		const book = await createBook()
		const updateData: UpdateBookDTO = {
			title: 'Livro 1 Editado',
			description: 'Descrição Livro 1 Editado',
		}

		await bookService.rent(book.id)

		try {
			await bookService.update(updateData, book.id)
		} catch (err) {
			expect(err).toBeInstanceOf(AppError)
			expect(err).toHaveProperty('message', 'Não é possível editar um livro alugado')
		}
	})
})
