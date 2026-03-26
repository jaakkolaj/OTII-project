import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { CandidateStatus } from "@prisma/client";
import { AuthorizationError, ValidationError, NotFoundError } from "../utils/errors";

const VALID_STATUSES = Object.values(CandidateStatus);

export const updateCandidateStatus = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AuthorizationError("Unauthorized"));
  }

  const { status } = req.body;

  if (!VALID_STATUSES.includes(status)) {
    return next(new ValidationError("Invalid status value"));
  }

  const candidate = await prisma.candidate.findUnique({
    where: { id: req.params.id },
    include: { job_posting: true },
  });

  if (!candidate) {
    return next(new NotFoundError("Candidate not found"));
  }

  // Varmistetaan että kandidaatti kuuluu kirjautuneelle käyttäjälle
  if (candidate.job_posting.user_id !== req.user.id) {
    return next(new AuthorizationError("Forbidden"));
  }

  try {
    const updated = await prisma.candidate.update({
      where: { id: req.params.id },
      data: { status },
    });
    return res.status(200).json(updated);
  } catch (error) {
    return next(error);
  }
};

export const getCandidateById = async (req: Request<{ id: string }>, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: req.params.id },
      include: {
        job_posting: { select: { id: true, title: true, user_id: true } },
        documents: {
          select: {
            id: true, document_type: true, original_filename: true,
            file_type: true, file_size: true, path: true, created_at: true,
          },
        },
        ai_analyses: {
          select: {
            id: true, score: true, skills: true, years_experience: true,
            education_level: true, keyword_matches: true, strengths: true,
            weaknesses: true, summary: true, created_at: true,
          },
          orderBy: { created_at: "desc" },
          take: 1,
        },
        notes: { orderBy: { created_at: "desc" } },
      },
    });

    if (!candidate) return res.status(404).json({ error: "Kandidaattia ei löydy" });
    if (candidate.job_posting.user_id !== req.user.id) return res.status(403).json({ error: "Forbidden" });

    return res.status(200).json(candidate);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createCandidateNote = async (req: Request<{ id: string }>, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const { content } = req.body;
  if (!content?.trim()) return res.status(400).json({ error: "Muistiinpano ei voi olla tyhjä" });
  if (content.trim().length > 5000) return res.status(400).json({ error: "Muistiinpano on liian pitkä (max 5000 merkkiä)" });

  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: req.params.id },
      include: { job_posting: { select: { user_id: true } } },
    });

    if (!candidate) return res.status(404).json({ error: "Kandidaattia ei löydy" });
    if (candidate.job_posting.user_id !== req.user.id) return res.status(403).json({ error: "Forbidden" });

    const note = await prisma.candidateNote.create({
      data: { candidate_id: req.params.id, content: content.trim() },
    });

    return res.status(201).json(note);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCandidateNote = async (
  req: Request<{ id: string; noteId: string }>,
  res: Response
) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  try {
    const note = await prisma.candidateNote.findUnique({
      where: { id: req.params.noteId },
      include: { candidate: { include: { job_posting: { select: { user_id: true } } } } },
    });

    if (!note) return res.status(404).json({ error: "Muistiinpanoa ei löydy" });
    if (note.candidate.job_posting.user_id !== req.user.id) return res.status(403).json({ error: "Forbidden" });

    await prisma.candidateNote.delete({ where: { id: req.params.noteId } });
    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCandidates = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AuthorizationError("Unauthorized"));
  }

  try {
    const jobPostings = await prisma.jobPosting.findMany({
      where: { user_id: req.user.id },
      select: { id: true },
    });

    const jobPostingIds = jobPostings.map((job) => job.id);

    const candidates = await prisma.candidate.findMany({
      where: {
        job_posting_id: { in: jobPostingIds }
      },
    });

    return res.status(200).json(candidates);
  } catch (error) {
    return next(error);
  }
};