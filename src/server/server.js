import express from 'express'
import repertorioRouter from '../routes/repertorio.routes.js'
export const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())
app.use('/', repertorioRouter)
app.listen(PORT, console.log(`🔥 Server UP! 🔥 http://localhost:${PORT}`))
