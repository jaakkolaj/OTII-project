
import { definePDFJSModule ,getDocumentProxy, extractText } from "unpdf";
import { Express } from "express";




// Funktio PDF-tiedostojen käsittelyyn
export const parsePdfFiles = async (files: Express.Multer.File[]) => {
// Käsitellään kaikki tiedostot rinnakkain Promise.all-metodilla
  return Promise.all(
    files.map(async (file) => {
      try {
        // Muunnetaan buffer Uint8Array-muotoon
        const uint8Array = new Uint8Array(file.buffer);

        const pdf = await getDocumentProxy(uint8Array);
        const { text } = await extractText(pdf);
        
        // Yhdistetään sivut yhdeksi tekstiksi, jos kyseessä on taulukko
        const fullText = Array.isArray(text) ? text.join("\n") : text;

        // Palautetaan onnistunut tulos
        return {
          fileName: file.originalname,
          status: "success",
          text: fullText,
        };
      } catch (err: any) {
        // Käsitellään virhe tiedoston käsittelyssä
        return {
          fileName: file.originalname,
          status: "error",
          error: err.message,
        };
      }
    })
  );
};
