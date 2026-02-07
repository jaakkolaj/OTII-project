import { Router, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import { authentication } from "../middleware/authentication";

const jobPostingsRouter = Router();

// Hakee kaikki kirjautuneen käyttäjän jobPostingit.
jobPostingsRouter.get("/", authentication, async (req: Request, res: Response) => {

  // Käyttäjän autentikointi
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const jobs = await prisma.jobPosting.findMany({
      where: {
        user_id: req.user.id
      }
    });
    return res.json(jobs);
  } catch(error) {
    return res.status(400).json({ error: "Job-postings not found!" })
  }
});

// Hakee kirjautuneen käyttäjän yhden jobPostingin ID:n perusteella
jobPostingsRouter.get("/:id", authentication, async (req: Request<{ id: string }>, res: Response) => {

  // Käyttäjän autentikointi
  if(!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const job = await prisma.jobPosting.findUnique({
    where: { id: req.params.id },
  });

  if (!job) {
    return res.status(404).json({ error: "Job posting not found." });
  }

  res.json(job);
});

// Luo uuden jobPostingin kirjautuneelle käyttäjälle
jobPostingsRouter.post("/", authentication, async (req: Request, res: Response) => {
  const { title, description, location, employmentType, seniority, department, requirements, salaryRange, closingDate } = req.body ?? {};

  // Title ja description ovat pakolliset kentät jobPostingissa.
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required." });
  }

  // Käyttäjän autentikointi
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const job = await prisma.jobPosting.create({
      data: {
        title,
        description,
        location,
        employmentType,
        seniority,
        department,
        requirements,
        salaryRange,
        closingDate,
        user_id: req.user.id as string,
      },
    });

    res.status(201).json(job);
  } catch(error) {
    return res.status(400).json({ error: "Invalid request" });
  }
});

// Muokkaa kirjautuneen käyttäjän olemassa olevaa jobPostingia
jobPostingsRouter.put("/:id", authentication, async (req: Request<{ id: string }>, res: Response) => {
  const { title, description, location, employmentType, seniority, department, requirements, salaryRange, closingDate } = req.body ?? {};

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required." });
  }

  // Tarkistetaan löytyykö tietokannasta jobPosting annetulla ID:llä.
  const jobPosting = await prisma.jobPosting.findUnique({
    where: { id: req.params.id }
  });

  if(!jobPosting) {
    return res.status(404).json({ message: "JobPosting not found!" });
  }

  // Päivitetään jobPosting
  try {
    const job = await prisma.jobPosting.update({
      where: { id: req.params.id },
      data: { title, description, location, employmentType, seniority, department, requirements, salaryRange, closingDate },
    });
    return res.status(200).json(job);
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

// Poistetaan kirjautuneen käyttäjän jobPosting annetun ID:n perusteella.
jobPostingsRouter.delete("/:id", authentication, async (req: Request<{ id: string }>, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Tarkistetaan löytyykö tietokannasta jobPosting annetulla ID:llä.
  const jobPosting = await prisma.jobPosting.findUnique({
    where: { id: req.params.id }
  });

  if(!jobPosting) {
    return res.status(404).json({ message: "JobPosting not found!" });
  }

  // Poistetaan jobPosting
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
