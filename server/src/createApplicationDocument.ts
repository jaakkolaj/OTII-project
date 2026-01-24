import 'dotenv/config'
import prisma from './prisma'

export const createApplicationDocument = async (candidate_id: string) => {
    return prisma.applicationDocument.create({
        data: {
            candidate_id: candidate_id,
            document_type: "PDF"
        }
    })
}