import app from './src/app'
import './src/workers/aiAnalysis.worker';

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});