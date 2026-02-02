import prisma from '../src/prisma'
import { createApplicationDocument } from './helpers/createApplicationDocument'
import { createCandidate } from './helpers/createCandidate'

describe("createApplication", () => {
    let candidate_id: string

    // Poistetaan mahdollinen testikandidaatti ja dokumentit ennen jokaista testiä
    beforeEach(async () => {
        await prisma.candidate.deleteMany({ where: { email: "seedTestCandidate@test.com" } })
        await prisma.applicationDocument.deleteMany()
        const candidate = await createCandidate("seedTestCandidate@test.com")
        candidate_id = candidate.id
    })

    // Suljetaan Prisma-yhteys testien jälkeen
    afterAll(async () => {
        await prisma.$disconnect()
    })

    it("creates a applicationDocument in the database", async () => {
        if (!candidate_id) throw new Error("User not found")

        const applicationDocument = await createApplicationDocument(candidate_id)

        // Tarkistetaan, että dokumentti luotiin oikein
        expect(applicationDocument).toBeDefined()
        expect(applicationDocument.document_type).toBe("PDF")
        expect(applicationDocument.candidate_id).toBe(candidate_id)
    })
})
