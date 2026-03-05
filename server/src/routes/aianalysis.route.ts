import { Router } from 'express';
import { 
  aianalysis, 
  getAnalysisById, 
  deleteAnalysis,
  getAiAnalysesByJobPostingId,
  createAnalysis,
  deleteAllAnalysesByJobPostingId
} from '../controllers/aianalysis.controller';
import { AiAnalysisRateLimitMiddleware, aiConcurrencyMiddleware } from '../middleware/rateLimiter';
const aiAnalysisRouter = Router();

//Käynnistää analyysin kaikille tietyn työpaikan ehdokkaille
aiAnalysisRouter.post('/:jobPostingId', AiAnalysisRateLimitMiddleware, aiConcurrencyMiddleware, aianalysis);

//Testi routti aiAnalyysien luontiin
aiAnalysisRouter.post('/', createAnalysis);

//Reitti hakee kaikki kandidaatit ja niiden analyysit yhdessä jobPostingissa
aiAnalysisRouter.get('/job/:jobPostingId', getAiAnalysesByJobPostingId);

// Hakee yhden kandidaatin ja sen ai analyysin
aiAnalysisRouter.get('/candidate/:analysisId', getAnalysisById);

// Poistaa kaikki analyysit tietystä jobPostingista
aiAnalysisRouter.delete('/job/:jobPostingId/all', deleteAllAnalysesByJobPostingId);

// Poistaa Ai analyysin ID:n perusteella
aiAnalysisRouter.delete('/:analysisId', deleteAnalysis); 

export default aiAnalysisRouter;
