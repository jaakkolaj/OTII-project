import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma";
import { createUser } from "./helpers/createUser";
import { createJobPosting } from "./helpers/createJobPosting";


jest.mock("../src/services/parser.service", () => ({
  parseDocument: jest.fn().mockImplementation(async (files: Express.Multer.File[]) =>
    files.map((file) => ({
      fileName: file.originalname,
      fileType: file.originalname.endsWith(".docx") ? "docx" : "pdf",
      status: "success",
      text: "Mocked parsed text",
    })),
  ),
}));

describe("POST /upload (integration)", () => {
  let userId: string;
  let jobPostingId: string;

  beforeAll(async () => {
    const user = await createUser(`upload_integration@test.com`);
    const jobPosting = await createJobPosting(user.id);
    userId = user.id;
    jobPostingId = jobPosting.id;
  });

  afterAll(async () => {
    await prisma.applicationDocument.deleteMany({
      where: {
        candidate: {
          job_posting_id: jobPostingId,
        },
      },
    });
    await prisma.candidate.deleteMany({
      where: { job_posting_id: jobPostingId },
    });
    await prisma.jobPosting.deleteMany({
      where: { id: jobPostingId },
    });
    await prisma.user.deleteMany({
      where: { id: userId },
    });
    await prisma.$disconnect();
  });

  test("IT-01: returns 400 when no files are sent", async () => {
    const res = await request(app).post("/upload");

    expect(res.status).toBe(400);
  });

  test("IT-02: uploads single file successfully", async () => {
    const res = await request(app)
      .post("/upload")
      .field("jobPostingId", jobPostingId)
      .attach("files", Buffer.from("fake"), {
        filename: "test.pdf",
        contentType: "application/pdf",
      });

    expect(res.status).toBe(200);
    expect(res.body.results).toHaveLength(1);
    expect(res.body.results[0].status).toBe("success");
  });

  test("IT-03: uploads multiple files", async () => {
    const res = await request(app)
      .post("/upload")
      .field("jobPostingId", jobPostingId)
      .attach("files", Buffer.from("fake"), {
        filename: "a.pdf",
        contentType: "application/pdf",
      })
      .attach("files", Buffer.from("fake"), {
        filename: "b.pdf",
        contentType: "application/pdf",
      });

    expect(res.status).toBe(200);
    expect(res.body.results).toHaveLength(2);
  });

  test("IT-04: returns error if file count exceeds 30", async () => {
    const agent = request(app).post("/upload").field("jobPostingId", jobPostingId);
    for (let i = 0; i <= 30; i++) {
      agent.attach("files", Buffer.from("test"), {
        filename: `file${i}.pdf`,
        contentType: "application/pdf",
      });
    }
    const res = await agent;
    expect(res.status).not.toBe(200);
  });

});
