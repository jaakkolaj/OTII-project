
import { getDocumentProxy, extractText } from "unpdf";
import mammoth from 'mammoth';

interface ParseResult {
  fileName: string;
  status: "success" | "error";
  fileType: string;
  text?: string;
  error?: string;
}

// Funktio, joka käsittelee ladatut tiedostot ja palauttaa niiden parsimis tulokset
export const parseDocument = async (files: Express.Multer.File[]) => {
// Käsitellään kaikki tiedostot rinnakkain Promise.all-metodilla
  return Promise.all(
    files.map(async (file) : Promise<ParseResult> => {
      try {
        
        //pdf-tiedostojen käsittely
        if(file.mimetype === "application/pdf"){
        // Muunnetaan buffer Uint8Array-muotoon
        const uint8Array = new Uint8Array(file.buffer);
        const pdf = await getDocumentProxy(uint8Array);
        const { text } = await extractText(pdf);
    
        // Yhdistetään sivut yhdeksi tekstiksi, jos kyseessä on taulukko
        const pdfText = Array.isArray(text) ? text.join("\n") : text;
    
        return {
          fileName: file.originalname,
          fileType: "pdf",
          status: "success",
          text: pdfText,
        };
        }

        //docx-tiedostojen käsittely
        if(file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
          // Käytetään mammoth-kirjastoa tekstin purkamiseen DOCX-tiedostosta
          const result = await mammoth.extractRawText({ buffer: file.buffer });
          const docxText = result.value; 
          return {
            fileName: file.originalname,
            fileType: "docx",
            status: "success",
            text: docxText,
          };
        }

        // Heitetään virhe, jos tiedostomuotoa ei tueta
        throw new Error(`Tiedostomuotoa ${file.mimetype} ei tueta`);
        
      } catch (err: any) {
        // Käsitellään virhe tiedoston käsittelyssä
        return {
          fileName: file.originalname,
          fileType: file.mimetype,
          status: "error",
          error: err.message,
        };
      }
    })
  );
};
