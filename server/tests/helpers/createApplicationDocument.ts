import 'dotenv/config'
import prisma from "../../src/prisma";

export const createApplicationDocument = async (candidate_id: string) => {
    return prisma.applicationDocument.create({
        data: {
            candidate_id: candidate_id,
            document_type: "PDF",
            original_filename: "cv.pdf",
            file_type: "pdf",
            extracted_text: "Test CV content"
        }
    })
}
