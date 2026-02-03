import request from "supertest";
import app from "../src/app";


jest.mock("../src/services/parser.service", () => ({
  parseDocument: jest.fn().mockResolvedValue([
    {
      fileName: "test.pdf",
      status: "success",
      text: "Mocked PDF text",
    },
  ]),
}));

describe("POST /upload (integration)", () => {
  test("IT-01: returns 400 when no files are sent", async () => {
    const res = await request(app).post("/upload");

    expect(res.status).toBe(400);
  });

  test("IT-02: uploads single file successfully", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("files", Buffer.from("fake"), "test.pdf");

    expect(res.status).toBe(200);
    expect(res.body.results).toHaveLength(1);
    expect(res.body.results[0].status).toBe("success");
  });

  test("IT-03: uploads multiple files", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("files", Buffer.from("fake"), "a.pdf")
      .attach("files", Buffer.from("fake"), "b.pdf");

    expect(res.status).toBe(200);
    expect(res.body.results).toHaveLength(1); // mock palauttaa 1
  });

  test("IT-04: returns error if file count exceeds 30", async () => {
  const agent = request(app).post("/upload");
  // Tehdään 31 pientä liitettä
  for (let i = 0; i <= 30; i++) {
    agent.attach("files", Buffer.from("test"), `file${i}.pdf`);
  }
  const res = await agent;
  expect(res.status).not.toBe(200); 
});

});
