import { Router } from 'express';
import { 
  aianalysis, 
  getAnalysisResults, 
  getAnalysisById, 
  deleteAnalysis 
} from '../controllers/aianalysis.controller';
const analysisRouter = Router();

//Käynnistää analyysin kaikille tietyn työpaikan ehdokkaille
analysisRouter.post('/:jobPostingId', aianalysis);


//muut reitit
analysisRouter.get('/job/:jobPostingId', getAnalysisResults);

analysisRouter.get('/candidate/:candidateId', getAnalysisById);

analysisRouter.delete('/:analysisId', deleteAnalysis); 

export default analysisRouter;