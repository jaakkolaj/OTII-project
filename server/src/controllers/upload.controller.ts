
import { Request, Response } from "express";
import { parseDocument } from "../services/parser.service";

// Tiedostojen latauksen käsittelijä
export const uploadFiles = async (req: Request, res: Response) => {
  try {
    // Haetaan ladatut tiedostot pyynnöstä
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      res.status(400).json({ error: "Tiedostoja ei löytynyt" });
      return;
    }
    // Kutsutaan parser-palvelua tiedostojen käsittelyyn
    const parsedResults = await parseDocument(files);
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
