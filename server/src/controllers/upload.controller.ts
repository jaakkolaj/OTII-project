import { Request, Response, NextFunction} from "express";
import { parseDocument } from "../services/parser.service";
import prisma from "../prisma";
import { uploadFileToSupabase } from "../services/supabase.service";
import { ValidationError } from "../utils/errors";

// Tiedostonimen puhdistaja, joka poistaa erikoismerkit ja korvaa ne alaviivalla
const sanitizeFileName = (fileName: string): string => {
  return fileName
    .normalize("NFD")               // Hajotetaan esim. 'ä' -> 'a' + 'pisteet'
    .replace(/[\u0300-\u036f]/g, "") // Poistetaan ne pisteet (diakriittiset merkit)
    .replace(/[^a-zA-Z0-9.\-_]/g, "_") // Kaikki muu paitsi kirjaimet, numerot, piste ja viivat -> alaviivaksi
    .replace(/\s+/g, "_");          // Välilyönnit -> alaviivaksi
};

// Tiedostojen latauksen käsittelijä
export const uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Haetaan ladatut tiedostot pyynnöstä
    const files = req.files as Express.Multer.File[];

    const jobPostingId = req.body?.jobPostingId;
    
    if (!files || files.length === 0) {
      return next(new ValidationError("Tiedostoja ei löytynyt"));
    }
    if (!jobPostingId) {
      return next(new ValidationError("jobPostingId puuttuu pyynnöstä"));
    }
    // Kutsutaan parser-palvelua tiedostojen käsittelyyn
    const parsedResults = await parseDocument(files);
    
    // Tallennetaan käsitellyt tiedot tietokantaan
    const savedCandidates = await Promise.all(
      parsedResults.map(async (doc, index) => {
        // Tallennetaan vain onnistuneet parsimiset tietokantaan
        if(doc.status === "error"){
          console.error(`Error processing file ${doc.fileName}: ${doc.error}`);
          return null;
        }

      
        const originalName = files[index].originalname;
        // Luodaan turvallinen tiedostonimi, joka sisältää aikaleiman ja puhdistetun alkuperäisen nimen      
        const safeName = `${Date.now()}-${sanitizeFileName(originalName)}`;
        const uploadedFile = await uploadFileToSupabase(safeName, files[index]);

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
                path: uploadedFile?.path // Osoite Supabaseen
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
    next(error);
    };
  }
