import express, { Request, Response } from 'express';
import signupRouter from './routes/signup.routes';
import loginRouter from './routes/login.routes';
import jobPostingsRouter from './routes/jobPostings.routes';
import logouRouter from './routes/logout.routes';
import aiAnalysisRouter from './routes/aianalysis.route';
import resetPasswordRouter from './routes/passwordReset.routes';
import cors from 'cors';
import uploadRouter from './routes/upload.routes';
import cookieParser from 'cookie-parser';

const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true 
}));


app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/job-postings', jobPostingsRouter);
app.use('/upload', uploadRouter);
app.use('/logout', logouRouter);
app.use('/aiAnalysis', aiAnalysisRouter);
app.use('/reset-password', resetPasswordRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Test' })
})

export default app;
