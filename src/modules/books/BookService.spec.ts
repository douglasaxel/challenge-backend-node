import IBookRepository from '@repositories/IBookRepository'
import MockBookRepository from '@repositories/implementation/MockBookRepository'

import { BookService } from './BookService'
import { CreateBookDTO } from './dto/CreateBookDto'
import { UpdateBookDTO } from './dto/UpdateBookDto'

describe('BookService', () => {
	let bookRepository: IBookRepository
	let bookService: BookService

	beforeAll(() => {
		bookRepository = new MockBookRepository()
		bookService = new BookService(bookRepository)
	})

	it('should be able to create a book', async () => {
		const bookData: CreateBookDTO = {
			title: 'Livro 1',
			author: 'Fulano Otavio',
			isbn: '123456',
			description: 'Descrição Livro 1'
		}

		const book = await bookService.create(bookData)

		expect(book).toHaveProperty('id')
		expect(book).toHaveProperty('isRented')
		expect(book.title).toBe(bookData.title)
	})

	it('should be able to update a book', async () => {
		const bookData: CreateBookDTO = {
			title: 'Livro 1',
			author: 'Fulano Otavio',
			isbn: '123456',
			description: 'Descrição Livro 1'
		}
		const updateData: UpdateBookDTO = {
			title: 'Livro 1 Editado',
			description: 'Descrição Livro 1 Editado',
		}

		const book = await bookService.create(bookData)
		const updatedBook = await bookService.update(updateData, book.id)

		expect(updatedBook.title).not.toBe(bookData.title)
		expect(updatedBook.description).toBe(updateData.description)
	})

	it('should be able to find a book by id', async () => {
		const bookData: CreateBookDTO = {
			title: 'Livro 1',
			author: 'Fulano Otavio',
			isbn: '123456',
			description: 'Descrição Livro 1'
		}

		const book = await bookService.create(bookData)
		const findedBook = await bookService.getOne(book.id)

		expect(findedBook).not.toBeNull()
		expect(findedBook).not.toBeUndefined()
		expect(findedBook?.title).toBe(book.title)
		expect(findedBook?.description).toBe(book.description)
	})
})
