import { Router } from "express";
import { authentication } from "../middleware/authentication";
import { getJobPostings, 
  getJobPostingById,
  createJobPosting,
  editJobPostingById,
  deleteJobPostingById
} from "../controllers/jobPostings.controller";

const jobPostingsRouter = Router();

// Routti hakee kaikki käyttäjän jobPostingit
jobPostingsRouter.get('/', authentication, getJobPostings);

// Routti hakee yhden jobPostingin ID:n perusteella
jobPostingsRouter.get('/:id', authentication, getJobPostingById);

// Routti luo uuden jobPostingin
jobPostingsRouter.post('/', authentication, createJobPosting);

// Routti muokkaa olemassa olevaa jobPostingia ID:n perusteella
jobPostingsRouter.put('/:id', authentication, editJobPostingById);

// Routti poistaa olemassa olevan jobPostingin ID:n perusteella
jobPostingsRouter.delete('/:id', authentication, deleteJobPostingById);

export default jobPostingsRouter;
