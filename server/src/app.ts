import express, { Request, Response } from 'express';
import signupRouter from './Controls/signup.routes.js';
import loginRouter from './Controls/login.routes.js';
import cors from 'cors';

const app = express()
app.use(express.json())
app.use(cors());

app.use('/signup', signupRouter);
app.use('/login', loginRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Test' })
})

export default app;