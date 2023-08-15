import AppError from '@error/AppError'
import IBookRepository, { BookGetAllFilter } from '@repositories/IBookRepository'

import { type CreateBookDTO } from './dto/CreateBookDto'
import { UpdateBookDTO } from './dto/UpdateBookDto'

export class BookService {
	constructor(private repository: IBookRepository) { }

	async create(data: CreateBookDTO) {
		const book = await this.repository.create(data)
		return book
	}

	async update(data: UpdateBookDTO, id: string) {
		const exist = await this.repository.getOne(id)
		if (!exist) {
			throw new AppError('Este livro não existe')
		}

		if (exist.isRented) {
			throw new AppError('Não é possível editar um livro alugado')
		}

		const book = await this.repository.update(data, id)
		return book
	}

	async getAll(filter?: BookGetAllFilter) {
		const book = await this.repository.getAll(filter)
		return book
	}

	async getOne(id: string) {
		const book = await this.repository.getOne(id)
		return book
	}

	async rent(id: string) {
		const book = await this.repository.getOne(id)
		if (!book) {
			throw new AppError('Livro não encontrado', 404)
		}

		if (book.isRented) {
			throw new AppError('Este livro já está alugado')
		}

		await this.repository.update({ ...book, isRented: true }, id)
	}

	async returnBook(id: string) {
		const book = await this.repository.getOne(id)
		if (!book) {
			throw new AppError('Livro não encontrado', 404)
		}

		if (!book.isRented) {
			throw new AppError('Este livro não estáva alugado')
		}

		await this.repository.update({ ...book, isRented: false }, id)
	}
}
