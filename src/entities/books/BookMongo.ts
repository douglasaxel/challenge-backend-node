import mongoose from 'mongoose'

const { Schema } = mongoose

const bookSchema = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	description: { type: String, required: true },
	isbn: { type: String, required: true },
	isRented: { type: Boolean, default: false },
	createdAt: { type: Date, required: false },
})

const BookModel = mongoose.model('Book', bookSchema)

export {
	BookModel,
	bookSchema,
}
