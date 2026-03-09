import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import { ValidationError, NotFoundError, AuthenticationError } from "../utils/errors";

// Hakee kaikki kirjautuneen käyttäjän jobPostingit.
export const getJobPostings = async (req: Request, res: Response, next: NextFunction) => {
    try {
    // Käyttäjän autentikointi
    if (!req.user) {
        return next(new AuthenticationError("Unauthorized"));
    }
    const jobs = await prisma.jobPosting.findMany({
        where: { user_id: req.user.id}
        });

        return res.json(jobs);
    } catch (error) {
        next(error);
    }
};

// Hakee kirjautuneen käyttäjän yhden jobPostingin ID:n perusteella
export const getJobPostingById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
   try { // Käyttäjän autentikointi
    if(!req.user) {
        return next(new AuthenticationError("Unauthorized"));
    }

    const job = await prisma.jobPosting.findUnique({
        where: { id: req.params.id },
    });

    if (!job) {
        return next(new NotFoundError("Job posting not found."));
    }

    return res.json(job);
    } catch (error) {
        next(error);
    }
};

// Luo uuden jobPostingin kirjautuneelle käyttäjälle
export const createJobPosting = async (req: Request, res: Response, next: NextFunction) => {
    try {const { title, description, location, employmentType, seniority, department, requirements, salaryRange, closingDate } = req.body ?? {};

    // Title ja description ovat pakolliset kentät jobPostingissa.
    if (!title || !description) {
        return next(new ValidationError("Title and description are required."));
    }

    // Käyttäjän autentikointi
    if (!req.user) {
        return next(new AuthenticationError("Unauthorized"));
    }

   
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
        next(error);
    }
};

// Muokkaa kirjautuneen käyttäjän olemassa olevaa jobPostingia
export const editJobPostingById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { title, description, location, employmentType, seniority, department, requirements, salaryRange, closingDate } = req.body ?? {};

    if (!req.user) {
        return next(new AuthenticationError("Unauthorized"));
    }

    if (!title || !description) {
        return next(new ValidationError("Title and description are required."));
    }

    // Tarkistetaan löytyykö tietokannasta jobPosting annetulla ID:llä.
    const jobPosting = await prisma.jobPosting.findUnique({
        where: { id: req.params.id }
    });

    if(!jobPosting) {
        return next(new NotFoundError("Job posting not found."));
    }

    // Päivitetään jobPosting
    try {
        const job = await prisma.jobPosting.update({
        where: { id: req.params.id },
        data: { title, description, location, employmentType, seniority, department, requirements, salaryRange, closingDate },
        });
        return res.status(200).json(job);
    } catch (error) {
        next(error);
    }
};

// Poistetaan kirjautuneen käyttäjän jobPosting annetun ID:n perusteella.
export const deleteJobPostingById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(new AuthenticationError("Unauthorized"));
    }

    // Tarkistetaan löytyykö tietokannasta jobPosting annetulla ID:llä.
    const jobPosting = await prisma.jobPosting.findUnique({
        where: { id: req.params.id }
    });

    if(!jobPosting) {
        return next(new NotFoundError("Job posting not found."));
    }

    // Poistetaan jobPosting
    try {
        await prisma.jobPosting.delete({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};