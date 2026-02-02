import { parsePdfFiles } from "../src/services/pdf.service";
import { getDocumentProxy, extractText } from "unpdf";
import { performance } from "perf_hooks";

jest.mock("unpdf", () => ({
  getDocumentProxy: jest.fn(),
  extractText: jest.fn(),
}));

const mockFile = (name = "test.pdf"): Express.Multer.File =>
  ({
    originalname: name,
    buffer: Buffer.from("fake-pdf"),
  }) as Express.Multer.File;

describe("Parse pdf files", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("UT-01: parses one valid PDF successfully", async () => {
    (getDocumentProxy as jest.Mock).mockResolvedValue({});
    (extractText as jest.Mock).mockResolvedValue({ text: "Hello CV" });

    const result = await parsePdfFiles([mockFile()]);

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("success");
    expect(result[0].text).toBe("Hello CV");
  });

   test("UT-02: parses multiple PDFs", async () => {
    (getDocumentProxy as jest.Mock).mockResolvedValue({});
    (extractText as jest.Mock).mockResolvedValue({ text: "Text" });

    const result = await parsePdfFiles([
      mockFile("a.pdf"),
      mockFile("b.pdf"),
      mockFile("c.pdf"),
    ]);
    expect(result).toHaveLength(3);
    result.forEach(r => expect(r.status).toBe("success"));
  });


  test("UT-03: returns error status when PDF parsing fails", async () => {
    (getDocumentProxy as jest.Mock).mockRejectedValue(
      new Error("Invalid PDF")
    );

    const result = await parsePdfFiles([mockFile()]);

    expect(result[0].status).toBe("error");
    expect(result[0].error).toBe("Invalid PDF");
  });

  test("UT-04: joins text array into single string", async () => {
    (getDocumentProxy as jest.Mock).mockResolvedValue({});
    (extractText as jest.Mock).mockResolvedValue({
      text: ["Page 1", "Page 2"],
    });

    const result = await parsePdfFiles([mockFile()]);

    expect(result[0].text).toBe("Page 1\nPage 2");
  });
  test("UT-05: empty file array returns empty result", async () => {
    const result = await parsePdfFiles([]);
    expect(result).toEqual([]);
  });

});


