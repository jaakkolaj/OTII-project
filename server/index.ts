import express, { Request, Response } from 'express';

const app = express()
const PORT = parseInt(process.env.PORT || '3000', 10)

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Test' })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
