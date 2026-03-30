import prisma from "../../src/prisma";
import { createUser } from "../helpers/createUser";
import app from "../../src/app";
import request from "supertest";
import jwt from "jsonwebtoken";

jest.mock("../../src/middleware/rateLimiter", () => ({
    standardRateLimiter: () => (req: any, res: any, next: any) => next(),
    AiAnalysisRateLimitMiddleware: (req: any, res: any, next: any) => next(),
    aiConcurrencyMiddleware: (req: any, res: any, next: any) => next(),
    uploadRateLimitMiddleware: (req: any, res: any, next: any) => next()
}));

const SECRET = process.env.JWT_SECRET
if (!SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

describe('Authentication', () => {
    let user_id: string;
    let userEmail: string;
    let jobPosting_id: string | undefined;
    // Testien alustus
    beforeAll(async () => {
        // Luodaan käyttäjä tietokantaan
        userEmail = `authentication_${Date.now()}@gmail.com`;
        const user = await createUser(userEmail);
        user_id = user.id;
    });

    // Testien siivous
    afterAll(async () => {
        // Poistetaan käyttäjä tietokannasta
        if(jobPosting_id) {
            await prisma.jobPosting.deleteMany({ where: { id: jobPosting_id } });
        }
        await prisma.jobPosting.deleteMany({ where: { user_id: user_id } });
        await prisma.user.deleteMany({ where: { id: user_id } });
        await prisma.$disconnect();
    });

    // Testi, joka palauttaa 401 eli autentikointi errorin
    it('fails creating jobPosting if not authenticated', async () => {
        const response = await request(app)
            .post('/job-postings')
            .send({
                title: "Software engineer",
                description: "Testaus",
                location: "Kuopio",
                employmentType: "Full-Time",
                seniority: "Senior",
                department: "Engineering",
                requirements: "5 years of experience",
                salaryRange: "1000",
                closingDate: "2099-12-31",
                user_id: user_id
            });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Token is missing");
    });

    // Testi, joka palauttaa 201 kun tokeni löytyy requestista ja käyttäjä on autentikoitu
    it('creates jobPosting if authenticated', async () => {
        // Luodaan jwt token
        const token = jwt.sign(
            { id: user_id, email: userEmail },
            SECRET
        );

        const response = await request(app)
            .post('/job-postings')
            .set("Cookie", [`access_token=${token}`])
            .send({
                title: "Software engineer",
                description: "Testaus",
                location: "Kuopio",
                employmentType: "Full-Time",
                seniority: "Senior",
                department: "Engineering",
                requirements: "5 years of experience",
                salaryRange: "1000",
                closingDate: "2099-12-31",
                user_id: user_id
            });
        expect(response.status).toBe(201);

        const jobPosting = await prisma.jobPosting.findFirst({ where: { user_id: user_id } });
        jobPosting_id = jobPosting?.id;
        expect(jobPosting).toBeDefined();
    });
});
