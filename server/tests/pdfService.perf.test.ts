import fs from "fs";
import path from "path";
import { performance } from "perf_hooks";
import { parsePdfFiles } from "../src/services/pdf.service";

describe("Suorituskykytesti aidoilla tiedostoilla", () => {
  let warnSpy: jest.SpyInstance;

  beforeAll(() => {
    //Piilotettaan tietyt unpdf-kirjaston fonttivaroitukset testilokista
    warnSpy = jest.spyOn(console, 'warn').mockImplementation((msg) => {
      // Jos viesti sisältää tuon tietyn fonttivaroituksen, ei tulosteta mitään
      if (typeof msg === 'string' && msg.includes('TT: undefined function')) {
        return;
      }
      // Muut (oikeat) varoitukset tulostetaan normaalisti
      console.info("Varoitus:", msg);
    });
  });
  
  test("UT-PERF: prosessoi 30 kopiota oikeasta CV:stä", async () => {
    
    // 1. Luetaan aito PDF-tiedosto fixtures-kansiosta
    const pdfPath = path.resolve(__dirname, "./fixtures/test.pdf");
    
    if (!fs.existsSync(pdfPath)) {
      throw new Error("Esimerkki-PDF-tiedostoa ei löytynyt polusta: " + pdfPath);
    }

    const realPdfBuffer = fs.readFileSync(pdfPath);

    // 2. Luodaan 30 tiedoston taulukko (kopioidaan bufferia)
    const mockFiles: Express.Multer.File[] = Array.from({ length: 30 }, (_, i) => ({
      originalname: `cv-kopio-${i + 1}.pdf`,
      buffer: realPdfBuffer,
      fieldname: "files",
      encoding: "7bit",
      mimetype: "application/pdf",
      size: realPdfBuffer.length,
      destination: "",
      filename: "",
      path: "",
      stream: null as any,
    }));

    // 3. Mitataan suoritusaika
    const start = performance.now();
    const results = await parsePdfFiles(mockFiles);
    const end = performance.now();

    const duration = end - start;
    console.log(`--- 30 aidon PDF-tiedoston parsiminen kesti: ${duration.toFixed(2)} ms ---`);

    // 4. Tarkistukset
    expect(results).toHaveLength(30);
    
    // Varmistetaan että jokainen tiedosto onnistui (status: success)
    results.forEach((res, index) => {
      if (res.status === "error") {
        console.error(`Virhe tiedostossa ${index}:`, res.error);
      }
      expect(res.status).toBe("success");
      expect(res.text).toBeDefined();
      expect(res.text!.length).toBeGreaterThan(0);
    });

    // Asetetaan aikaraja esim. 10 sekuntia (riippuu CV:n koosta)
    expect(duration).toBeLessThan(10000);
  });

  afterAll(() => {
    // Palautetaan konsolin normaali toiminta testien jälkeen
    warnSpy.mockRestore();
  });

});