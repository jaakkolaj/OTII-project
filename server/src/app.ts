import express, { Request, Response } from 'express';
import signupRouter from './routes/signup.routes';
import loginRouter from './routes/login.routes';
import jobPostingsRouter from './routes/jobPostings.routes';
import cors from 'cors';
import uploadRouter from './routes/upload.routes';
import { analyzeTextWithAI } from './services/ai.service';
import { tokenizeText, getTopKeywords } from './services/nlp.services';

const app = express()
app.use(express.json())
app.use(cors());

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/job-postings', jobPostingsRouter);
app.use('/upload', uploadRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Test' })
})

// async function main() {
//   const mockText = `
//     Software developer with 2 years of experience.
//     Skills: JavaScript, React, Node.js, SQL.
//     Bachelor's degree in Computer Science.
//   `;

//   console.log("TOKENS:", tokenizeText(mockText));
//   console.log("KEYWORDS:", getTopKeywords(mockText));

//   const aiResult = await analyzeTextWithAI(mockText);
//   console.log("AI RESULT:", aiResult);
// }

// main();

export default app;
