import { Router, Request, Response } from "express";
import multer from "multer";
import { extractText, getDocumentProxy } from 'unpdf';

const uploadRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per tiedosto
});


uploadRouter.post(
  "/",
  upload.array("files", 30), 
  async (req: Request, res: Response): Promise<void> => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        res.status(400).json({ error: "Tiedostoja ei löytynyt" });
        return;
      }
      console.log(`Vastaanotettu ${files.length} tiedostoa.`);
    
      // Käsitellään kaikki tiedostot rinnakkain Promise.all-metodilla
      const parsedResults = await Promise.all(
        files.map(async (file) => {
          try {
            const uint8Array = new Uint8Array(file.buffer);
            const pdf = await getDocumentProxy(uint8Array);
            const { text } = await extractText(pdf);
            
            // Yhdistetään sivut yhdeksi tekstiksi, jos kyseessä on taulukko
            const fullText = Array.isArray(text) ? text.join('\n') : text;

            return {
              fileName: file.originalname,
              status: "success",
              text: fullText,
            };

          } catch (err: any) {
            return {
              fileName: file.originalname,
              status: "error",
              error: err.message,
            };
          }
        })
      );

      res.status(200).json({
        message: "Käsittely valmis",
        results: parsedResults,
      });

    } catch (error: any) {
      console.error("Virhe palvelimella:", error);
      res.status(500).json({
        error: "Virhe tiedostojen käsittelyssä",
        details: error.message,
      });
    }
  }
);

export default uploadRouter;