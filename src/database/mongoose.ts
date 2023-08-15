import mongoose from 'mongoose'

async function handleMongoConnection() {
	await mongoose.connect(process.env.MONGO_URL ?? '', {
		dbName: 'library'
	})
}

// async function handleMongoConnection<T>(cb: (conn: typeof mongoose) => Promise<T>) {
// 	const connection = await mongoose.connect(process.env.MONGO_URL ?? '', {
// 		dbName: 'library'
// 	})

// 	const result = await cb(connection)

// 	await mongoose.disconnect()

// 	return result
// }

export default handleMongoConnection
