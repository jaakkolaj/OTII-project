import prisma from '../../src/prisma'
import { createApplicationDocument } from '../helpers/createApplicationDocument'
import { createCandidate } from '../helpers/createCandidate';
import { createUser } from '../helpers/createUser';
import { createJobPosting } from '../helpers/createJobPosting';

/*
    application Dokumenttia luodessa tietokannasta pitää löytyä seuraavat tiedot:
    User
    JobPosting
    Candidate
*/ 
describe("createApplication", () => {
    let candidate_id: string;
    let user_id: string;
    let jobPosting_id: string;
    let applicationDocument_id: string;

    // Testien alustus
    beforeEach(async () => {
        // Luodaan käyttäjä, jobPosting ja kandidaatti testiä varten.
        const userEmail = "createApplication@gmail.com";
        const user = await createUser(userEmail);
        const jobPosting = await createJobPosting(user.id);
        const candidate = await createCandidate(jobPosting.id);

        // Asetetaan ID:t muuttujiin.
        candidate_id = candidate.id;
        user_id = user.id;
        jobPosting_id = jobPosting.id;
    });

    // Suljetaan Prisma-yhteys testien jälkeen
    afterAll(async () => {
        // Siivotaan testien jälkeen ja poistetaan applicationDocument, candidaatti, jobPosting ja user.
        await prisma.applicationDocument.delete({ where: { id: applicationDocument_id } });
        await prisma.candidate.delete({ where: { id: candidate_id } });
        await prisma.jobPosting.delete({ where: { id: jobPosting_id } });
        await prisma.user.delete({ where: { id: user_id } });
        await prisma.$disconnect();
    });

    it("creates a applicationDocument in the database", async () => {
        const applicationDocument = await createApplicationDocument(candidate_id);
        applicationDocument_id = applicationDocument.id;
        expect(applicationDocument).toBeDefined();
        expect(applicationDocument.document_type).toBe("PDF");
        expect(applicationDocument.candidate_id).toBe(candidate_id);
    });
});
