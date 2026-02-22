import prisma from '../../src/prisma';
import { createUser } from '../helpers/createUser';
import 'dotenv/config';
import bcrypt from 'bcrypt';

describe("createUser", () => {
    beforeAll(async () => {
        await prisma.user.deleteMany({
            where: {
                email: "jestTest@admin.com"
            }
        });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('creates a user in database', async () => {
        const user = await createUser("jestTest@admin.com");

        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.email).toBe("jestTest@admin.com");
        
        const isPasswordCorrect = await bcrypt.compare("secret", user.password);
        expect(isPasswordCorrect).toBe(true);

        const found = await prisma.user.findUnique({
            where: { id: user.id }
        });

        expect(found).not.toBeNull();
    });
});