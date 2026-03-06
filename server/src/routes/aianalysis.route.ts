import { Router } from 'express';
import { 
  aianalysis, 
  getAiAnalysisStatus,
  getAnalysisById, 
  deleteAnalysis,
  getAiAnalysesByJobPostingId,
  deleteAllAnalysesByJobPostingId
} from '../controllers/aianalysis.controller';
import { AiAnalysisRateLimitMiddleware, aiConcurrencyMiddleware } from '../middleware/rateLimiter';
import { authentication } from '../middleware/authentication';
const aiAnalysisRouter = Router();

//Käynnistää analyysin kaikille tietyn työpaikan ehdokkaille
aiAnalysisRouter.post('/:jobPostingId', authentication, AiAnalysisRateLimitMiddleware, aiConcurrencyMiddleware, aianalysis);

//Hakee statuksen onko analyysi tehty ja palauttaa sen
aiAnalysisRouter.post('/jobPostings/:jobPostingId/ai-analysis', getAiAnalysisStatus);

//Reitti hakee kaikki kandidaatit ja niiden analyysit yhdessä jobPostingissa
aiAnalysisRouter.get('/job/:jobPostingId', authentication, getAiAnalysesByJobPostingId);

// Hakee yhden kandidaatin ja sen ai analyysin
aiAnalysisRouter.get('/candidate/:analysisId', authentication, getAnalysisById);

// Poistaa kaikki analyysit tietystä jobPostingista
aiAnalysisRouter.delete('/job/:jobPostingId/all', authentication, AiAnalysisRateLimitMiddleware, deleteAllAnalysesByJobPostingId);

// Poistaa Ai analyysin ID:n perusteella
aiAnalysisRouter.delete('/:analysisId', authentication, AiAnalysisRateLimitMiddleware, deleteAnalysis); 

export default aiAnalysisRouter;
