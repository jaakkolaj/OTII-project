import "dotenv/config";
import prisma from "../../src/prisma";
import bcrypt from 'bcrypt';

export async function createUser() {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash("secret", saltRounds);
    return prisma.user.create({
        data: {
            email: "jestTest@admin.com",
            password: passwordHash
        }
    });
};