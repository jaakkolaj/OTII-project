import { Request, Response } from "express";
import prisma from "../prisma";
import { supabase } from "../config/supabaseClient";

export const getDocument = async (req: Request<{ candidate: string }>, res: Response) => {

    // Haetaan tietokannasta candidate url:n id:n perusteella
    const candidate = await prisma.candidate.findUnique({ 
        where: { id: req.params.candidate }
    });

    // 404, jos candidatea ei löydy tietokannasta
    if(!candidate) {
        return res.status(404).json({ error: "Candidate not found!" });
    };

    // Haetaan applicationDocumen tietokannasta, joka sisältää path kentän supabasea varten
    const applicationDoument = await prisma.applicationDocument.findFirst({ 
        where: { candidate_id: candidate.id } 
    });
    const pathToFile = applicationDoument?.path;

    // 404, jos path kenttää ei löydy applicationDocumentista
    if(!pathToFile) {
        return res.status(404).json({ error: "Document not found" });
    }

    // Muodostetaan "SignedURL", vanhenee 120 sekunnin päästä
    const { data, error } = await supabase.storage
        .from('ATS')
        .createSignedUrl(pathToFile, 120)
    
    if(error) throw error;

    // Heitetään error jos palautus supabasesta on undefined
    if(!data) throw new Error("Signed URL is expired!");

    // Lähetetään URL clientille
    return res.status(200).send(data.signedUrl);
};