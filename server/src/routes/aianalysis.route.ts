import { Router } from 'express';
import { 
  aianalysis, 
  getAnalysisResults, 
  getAnalysisById, 
  deleteAnalysis 
} from '../controllers/aianalysis.controller';
const router = Router();

//Käynnistää analyysin kaikille tietyn työpaikan ehdokkaille
router.post('/analyze/:jobPostingId', aianalysis);


//muut reitit
router.get('/job/:jobPostingId', getAnalysisResults);

router.get('/candidate/:candidateId', getAnalysisById);

router.delete('/:analysisId', deleteAnalysis); 

export default router;