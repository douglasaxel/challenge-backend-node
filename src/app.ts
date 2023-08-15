
import { configDotenv } from 'dotenv'
import express from 'express'

import errorHandler from './middlewares/errorHandler'
import appRoutes from './routes'

configDotenv()
const app = express()

app.use(express.json())

app.use((req, _res, next) => {
	console.log(`[${req.method}] url:: ${req.url}`)
	next()
})

app.get('/', (_req, res) => res.send('API de Livros'))
app.use(appRoutes)
app.use(errorHandler)

app.use((_req, res) => {
	return res.status(404).json({ message: 'Rota não encontrada' })
})

export default app
