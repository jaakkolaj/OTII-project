import prisma from '../../src/prisma';
import { createUser } from '../helpers/createUser';
import 'dotenv/config';
import bcrypt from 'bcrypt';

describe("createUser", () => {
    let user_id: string;
   
    afterAll(async () => {
        await prisma.$disconnect();
        await prisma.user.delete({ where: { id: user_id } });
    });

    it('creates a user in database', async () => {
        const user = await createUser("createUserTest@admin.com");

        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.email).toBe("createUserTest@admin.com");
        
        const isPasswordCorrect = await bcrypt.compare("secret", user.password);
        expect(isPasswordCorrect).toBe(true);

        const found = await prisma.user.findUnique({
            where: { id: user.id }
        });

        expect(found).not.toBeNull();
        user_id = user.id;
    });
});