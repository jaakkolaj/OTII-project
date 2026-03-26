import { Router } from "express";
import { authentication } from "../middleware/authentication";
import { standardRateLimiter } from "../middleware/rateLimiter";
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
jobPostingsRouter.post('/', authentication, standardRateLimiter("create-job-posting"), createJobPosting);

// Routti muokkaa olemassa olevaa jobPostingia ID:n perusteella
jobPostingsRouter.put('/:id', authentication, standardRateLimiter("update-job-posting"), editJobPostingById);

// Routti poistaa olemassa olevan jobPostingin ID:n perusteella
jobPostingsRouter.delete('/:id', authentication, standardRateLimiter("delete-job-posting"), deleteJobPostingById);

export default jobPostingsRouter;
