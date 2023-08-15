import app from './app'
import handleMongoConnection from './database/mongoose'
// import { decodeToken, signToken } from './utils/token'

const PORT = process.env.EXPRESS_PORT ?? 3000

app.listen(PORT, async () => {
	await handleMongoConnection()
	console.log(`Servidor rodando na porta: ${PORT}`)
})
