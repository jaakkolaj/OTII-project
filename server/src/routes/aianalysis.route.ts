import { Router } from 'express';
import { 
  aianalysis, 
  getAnalysisResults, 
  getAnalysisById, 
  deleteAnalysis,
  getAiAnalysesByJobPostingId,
  createAnalysis
} from '../controllers/aianalysis.controller';
const aiAnalysisRouter = Router();

//Käynnistää analyysin kaikille tietyn työpaikan ehdokkaille
aiAnalysisRouter.post('/analyze/:jobPostingId', aianalysis);


aiAnalysisRouter.get('/:jobPostingId', getAiAnalysesByJobPostingId);

//Testi routti aiAnalyysien luontiin
aiAnalysisRouter.post('/', createAnalysis);


//muut reitit
aiAnalysisRouter.get('/job/:jobPostingId', getAnalysisResults);

aiAnalysisRouter.get('/candidate/:candidateId', getAnalysisById);

aiAnalysisRouter.delete('/:analysisId', deleteAnalysis); 

export default aiAnalysisRouter;