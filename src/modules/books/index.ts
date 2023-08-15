import MongoBookRepository from '@repositories/implementation/MongoBookRepository'

import { BookController } from './BookController'
import { BookService } from './BookService'
import bookRoutes from './routes'

const bookRepository = new MongoBookRepository()
const bookService = new BookService(bookRepository)
const bookController = new BookController(bookService)

export { bookController, bookRoutes }
