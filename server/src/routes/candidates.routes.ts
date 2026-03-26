import { Router } from "express";
import { authentication } from "../middleware/authentication";
import {
  updateCandidateStatus,
  getCandidates,
  getCandidateById,
  createCandidateNote,
  deleteCandidateNote,
} from "../controllers/candidates.controller";

const candidatesRouter = Router();

// Hakee kaikki käyttäjän kandidaatit
candidatesRouter.get("/user", authentication, getCandidates);

// Hakee yksittäisen kandidaatin täydet tiedot
candidatesRouter.get("/:id", authentication, getCandidateById);

// Päivittää kandidaatin statuksen
candidatesRouter.patch("/:id/status", authentication, updateCandidateStatus);

// Muistiinpanot
candidatesRouter.post("/:id/notes", authentication, createCandidateNote);
candidatesRouter.delete("/:id/notes/:noteId", authentication, deleteCandidateNote);

export default candidatesRouter;
