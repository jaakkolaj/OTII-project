import { Router } from "express";
import { authentication } from "../middleware/authentication";
import { updateCandidateStatus } from "../controllers/candidates.controller";

const candidatesRouter = Router();

// Päivittää kandidaatin statuksen
candidatesRouter.patch("/:id/status", authentication, updateCandidateStatus);

export default candidatesRouter;
