import prisma from '../src/prisma'
import { createApplicationDocument } from './helpers/createApplicationDocument'

describe("createApplication", () => {
    let candidate_id: string;
    beforeEach(async () => {
        await prisma.candidate.deleteMany();
        await prisma.applicationDocument.deleteMany();
        const candidate = await prisma.candidate.create({
            data: {
                name: "Seed candidate",
                email: "seed@test.com"
            }
        })
        candidate_id = candidate.id
    })

    afterAll(async () => {
        await prisma.$disconnect();
    })

    it("creates a applicationDocument in the database", async () => {
        if (!candidate_id) {
            throw new Error("User not found");
        }
        const applicationDocument = await createApplicationDocument(candidate_id);
        expect(applicationDocument).toBeDefined();
        expect(applicationDocument.document_type).toBe("PDF");
        expect(applicationDocument.candidate_id).toBe(candidate_id);
    });
});