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