import { parseDocument } from "../../src/services/parser.service";
import { getDocumentProxy, extractText } from "unpdf";
import mammoth from "mammoth";

// Mockataan molemmat kirjastot
jest.mock("unpdf", () => ({
  getDocumentProxy: jest.fn(),
  extractText: jest.fn(),
}));

jest.mock("mammoth", () => ({
  extractRawText: jest.fn(),
}));

// Apufunktio, joka tukee nyt mimetypeä
const mockFile = (
  name = "test.pdf", 
  mimetype = "application/pdf"
): Express.Multer.File => ({
  originalname: name,
  mimetype: mimetype,
  buffer: Buffer.from("fake-content"),
}) as Express.Multer.File;

describe("Document Parser Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- PDF TESTIT ---
  test("UT-01: parses valid PDF successfully", async () => {
    (getDocumentProxy as jest.Mock).mockResolvedValue({});
    (extractText as jest.Mock).mockResolvedValue({ text: ["Hello", "CV"] });

    const result = await parseDocument([mockFile()]);

    expect(result[0].status).toBe("success");
    expect(result[0].text).toBe("Hello\nCV");
  });

  // --- DOCX TESTIT ---
  test("UT-06: parses valid DOCX successfully", async () => {
    const docxMime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    (mammoth.extractRawText as jest.Mock).mockResolvedValue({
      value: "Word content",
      messages: []
    });

    const result = await parseDocument([mockFile("test.docx", docxMime)]);

    expect(result[0].status).toBe("success");
    expect(result[0].text).toBe("Word content");
    expect(mammoth.extractRawText).toHaveBeenCalled();
  });

  test("UT-07: returns error when DOCX parsing fails", async () => {
    const docxMime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    (mammoth.extractRawText as jest.Mock).mockRejectedValue(new Error("Mammoth Error"));

    const result = await parseDocument([mockFile("broken.docx", docxMime)]);

    expect(result[0].status).toBe("error");
    expect(result[0].error).toBe("Mammoth Error");
  });

  // --- SEKASEALAISET TESTIT ---
  test("UT-08: parses both PDF and DOCX in the same batch", async () => {
    const docxMime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    
    // PDF mockit
    (getDocumentProxy as jest.Mock).mockResolvedValue({});
    (extractText as jest.Mock).mockResolvedValue({ text: "PDF text" });
    
    // DOCX mockit
    (mammoth.extractRawText as jest.Mock).mockResolvedValue({ value: "DOCX text" });

    const result = await parseDocument([
      mockFile("resume.pdf", "application/pdf"),
      mockFile("letter.docx", docxMime)
    ]);

    expect(result).toHaveLength(2);
    expect(result.find(r => r.fileName === "resume.pdf")?.text).toBe("PDF text");
    expect(result.find(r => r.fileName === "letter.docx")?.text).toBe("DOCX text");
  });

  test("UT-09: returns error for unsupported file types", async () => {
    const result = await parseDocument([mockFile("image.png", "image/png")]);

    expect(result[0].status).toBe("error");
    expect(result[0].error).toContain("ei tueta");
  });
});