import { Router } from "express";
import { authentication } from "../middleware/authentication";
import { updateCandidateStatus } from "../controllers/candidates.controller";
import { getCandidates } from "../controllers/candidates.controller";

const candidatesRouter = Router();

// Päivittää kandidaatin statuksen
candidatesRouter.patch("/:id/status", authentication, updateCandidateStatus);

// Hakee kaikki käyttäjän kandidaatit home page dataa varten
candidatesRouter.get('/user', authentication, getCandidates);

export default candidatesRouter;
