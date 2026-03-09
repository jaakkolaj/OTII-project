import { Request, Response } from "express";
import prisma from "../prisma";
import { CandidateStatus } from "@prisma/client";

const VALID_STATUSES = Object.values(CandidateStatus);

export const updateCandidateStatus = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { status } = req.body;

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: `Virheellinen status. Sallitut arvot: ${VALID_STATUSES.join(", ")}`,
    });
  }

  const candidate = await prisma.candidate.findUnique({
    where: { id: req.params.id },
    include: { job_posting: true },
  });

  if (!candidate) {
    return res.status(404).json({ error: "Kandidaattia ei löydy." });
  }

  // Varmistetaan että kandidaatti kuuluu kirjautuneelle käyttäjälle
  if (candidate.job_posting.user_id !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const updated = await prisma.candidate.update({
      where: { id: req.params.id },
      data: { status },
    });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: "Statuksen päivitys epäonnistui." });
  }
};

export const getCandidates = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized!" });
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
    return res.status(500).json({ error: "Internal server error" });
  }
};