import { Request, Response } from "express";
import { parseDocument } from "../services/parser.service";
import prisma from "../prisma";


// Tiedostojen latauksen käsittelijä
export const uploadFiles = async (req: Request, res: Response) => {
  try {
    // Haetaan ladatut tiedostot pyynnöstä
    const files = req.files as Express.Multer.File[];

    const { jobPostingId } = req.body;
    
    if (!files || files.length === 0) {
      res.status(400).json({ error: "Tiedostoja ei löytynyt" });
      return;
    }
    if (!jobPostingId) {
      return res.status(400).json({ error: "jobPostingId puuttuu pyynnöstä" });
    }
    // Kutsutaan parser-palvelua tiedostojen käsittelyyn
    const parsedResults = await parseDocument(files);

    // Tallennetaan käsitellyt tiedot tietokantaan
    const savedCandidates = await Promise.all(
      parsedResults.map(async (doc) => {
        // Tallennetaan vain onnistuneet parsimiset tietokantaan
        if(doc.status === "error"){
          console.error(`Error processing file ${doc.fileName}: ${doc.error}`);
          return null;
        }
        // Luodaan uusi ehdokas ja liitetään dokumentti siihen
        return prisma.candidate.create({
          data: {
            job_posting_id: jobPostingId,
            name: "odotetaan analyysia", // AI päivittää myöhemmin
            email: "odotetaan@analyysia.fi", // AI päivittää myöhemmin
            documents: {
              create: {
                document_type: "odotetaan analyysia", // AI päivittää myöhemmin
                original_filename: doc.fileName,
                file_type: doc.fileType, // "pdf" tai "docx"
                extracted_text: doc.text || "",
              }
            }
          },
          include: {
            documents: true // Palauttaa tallennetun dokumentin vastauksessa
          }
        });
      }
    ));

    // Lähetetään vastaus takaisin asiakkaalle
    res.status(200).json({
      message: "Käsittely valmis",
      results: parsedResults,
    });
    // Virheen käsittely
  } catch (error: any) {
    res.status(500).json({
      error: "Virhe tiedostojen käsittelyssä",
      details: error.message,
    });
  }
};
