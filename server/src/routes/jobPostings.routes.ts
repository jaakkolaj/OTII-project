import { Router, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma";

const jobPostingsRouter = Router();

jobPostingsRouter.get("/", async (_req: Request, res: Response) => {
  const jobs = await prisma.jobPosting.findMany({
    orderBy: { created_at: "desc" },
  });
  res.json(jobs);
});

jobPostingsRouter.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const job = await prisma.jobPosting.findUnique({
    where: { id: req.params.id },
  });

  if (!job) {
    return res.status(404).json({ error: "Job posting not found." });
  }

  res.json(job);
});

jobPostingsRouter.post("/", async (req: Request, res: Response) => {
  const { title, description, location, employmentType, seniority, department, requirements, salaryRange, closingDate } = req.body ?? {};

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required." });
  }

  const job = await prisma.jobPosting.create({
    data: { title, description, location, employmentType, seniority, department, requirements, salaryRange, closingDate },
  });

  res.status(201).json(job);
});

jobPostingsRouter.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const { title, description, location, employmentType, seniority, department, requirements, salaryRange, closingDate } = req.body ?? {};

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required." });
  }

  try {
    const job = await prisma.jobPosting.update({
      where: { id: req.params.id },
      data: { title, description, location, employmentType, seniority, department, requirements, salaryRange, closingDate },
    });
    res.json(job);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Job posting not found." });
    }
    throw error;
  }
});

jobPostingsRouter.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    await prisma.jobPosting.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Job posting not found." });
    }
    throw error;
  }
});

export default jobPostingsRouter;
