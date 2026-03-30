import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { supabase } from "../config/supabaseClient";
import { AuthenticationError, NotFoundError, ValidationError } from "../utils/errors";

export const getDocument = async (
  req: Request<{ candidate: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new AuthenticationError("Unauthorized"));
    }
    // 1. Haetaan candidate
    const candidate = await prisma.candidate.findFirst({
      where: { id: req.params.candidate },
    });

    if (!candidate) {
      return next(new NotFoundError("Candidate not found!"));
    }

    // 2. Haetaan dokumentin polku
    const applicationDocument = await prisma.applicationDocument.findFirst({
      where: { candidate_id: candidate.id },
    });

    const pathToFile = applicationDocument?.path;

    if (!pathToFile) {
      return next(new NotFoundError("Document path not found"));
    }

    // 3. Muodostetaan SignedURL

    const { data, error } = await supabase.storage
      .from("ATS")
      .createSignedUrl(pathToFile, 60 * 10);

    if (error) {
      return next(error);
    }

    if (!data?.signedUrl) {
      return next(new NotFoundError("Signed URL not found"));
    }   


    return res.json({ url: data.signedUrl });

  } catch (error) {
    next(error);
  }
};
