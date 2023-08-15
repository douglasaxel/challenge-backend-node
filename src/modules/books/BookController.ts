import { NextFunction, Request, Response } from 'express'

import { BookService } from './BookService'
import { CreateBookDTO } from './dto/CreateBookDto'
import { GetAllBookDTO } from './dto/GetAllBookDto'

export class BookController {
	constructor(private bookService: BookService) { }

	public async create(req: Request, res: Response, next: NextFunction) {
		const { title, author, description, isbn } = req.body as CreateBookDTO

		try {
			const book = await this.bookService.create({
				title,
				author,
				description,
				isbn
			})

			return res.status(201).json(book)
		} catch (err) {
			next(err)
		}
	}

	public async update(req: Request, res: Response, next: NextFunction) {
		const { idBook } = req.params as { idBook: string }
		const { title, author, description, isbn } = req.body as CreateBookDTO

		try {
			const book = await this.bookService.update({
				title,
				author,
				description,
				isbn
			}, idBook)

			return res.json(book)
		} catch (err) {
			next(err)
		}
	}

	public async getAll(req: Request, res: Response, next: NextFunction) {
		const { title, isbn, author, isRented } = req.query as GetAllBookDTO

		try {
			const book = await this.bookService.getAll({ title, isbn, author, isRented })

			return res.json(book)
		} catch (err) {
			next(err)
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { idBook } = req.params as { idBook: string }

		try {
			const book = await this.bookService.getOne(idBook)

			return res.json(book)
		} catch (err) {
			next(err)
		}
	}

	public async rent(req: Request, res: Response, next: NextFunction) {
		const { idBook } = req.params as { idBook: string }

		try {
			await this.bookService.rent(idBook)

			return res.json({ message: 'Livro alugado' })
		} catch (err) {
			next(err)
		}
	}

	public async returnBook(req: Request, res: Response, next: NextFunction) {
		const { idBook } = req.params as { idBook: string }

		try {
			await this.bookService.returnBook(idBook)

			return res.json({ message: 'Livro devolvido' })
		} catch (err) {
			next(err)
		}
	}
}
