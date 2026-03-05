import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { supabase } from "../config/supabaseClient";

export const getDocument = async (
  req: Request<{ candidate: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Haetaan candidate
    const candidate = await prisma.candidate.findFirst({
      where: { id: req.params.candidate },
    });

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found!" });
    }

    // 2. Haetaan dokumentin polku
    const applicationDocument = await prisma.applicationDocument.findFirst({
      where: { candidate_id: candidate.id },
    });

    const pathToFile = applicationDocument?.path;

    if (!pathToFile) {
      return res.status(404).json({ error: "Document path not found" });
    }

    // 3. Muodostetaan SignedURL

    const { data, error } = await supabase.storage
      .from("ATS")
      .createSignedUrl(pathToFile, 60 * 10);

    if (error) {
      console.error("Supabase Storage Error:", error);
      return res.status(500).json({ error: "Failed to generate signed URL" });
    }

    if (!data?.signedUrl) {
      return res
        .status(404)
        .json({ error: "Signed URL generation returned empty" });
    }   


    return res.json({ url: data.signedUrl });

  } catch (err) {
    console.error("Internal Server Error in getDocument:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
