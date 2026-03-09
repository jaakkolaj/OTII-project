import express, { Request, Response } from 'express';

import signupRouter from './routes/signup.routes';
import loginRouter from './routes/login.routes';
import jobPostingsRouter from './routes/jobPostings.routes';
import logouRouter from './routes/logout.routes';
import aiAnalysisRouter from './routes/aianalysis.route';
import resetPasswordRouter from './routes/passwordReset.routes';
import supaBaseRouter from './routes/supabase.route';

import cors from 'cors';
import uploadRouter from './routes/upload.routes';
import cookieParser from 'cookie-parser';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

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
app.use('/supabase', supaBaseRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Test' })
})
app.use(notFoundHandler)
app.use(errorHandler)

export default app;
