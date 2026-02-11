import prisma from "../../src/prisma";
import "dotenv/config";

export const createJobPosting = async (id: any) => {
    return prisma.jobPosting.create({
        data: {
            title: "Software engineer",
            description: "Testaus",
            location: "Kuopio",
            employmentType: "Full-Time",
            seniority: "Senior",
            department: "Engineering",
            requirements: "5 years of experience",
            salaryRange: "1000",
            closingDate: "2099-12-31",
            user_id: id
        }
    });
};
