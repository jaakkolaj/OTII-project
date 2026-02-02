import prisma from '../src/prisma';
import { createUser } from './helpers/createUser';
import 'dotenv/config';
import bcrypt from 'bcrypt';

describe("createUser", () => {

    // Poistetaan mahdollinen testikäyttäjä ennen testejä
    beforeAll(async () => {
        await prisma.user.deleteMany({
            where: { email: "createUserTest@admin.com" }
        });
    });

    // Suljetaan Prisma-yhteys testien jälkeen
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('creates a user in database', async () => {
        const user = await createUser("createUserTest@admin.com");

        // Perustarkistukset
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.email).toBe("createUserTest@admin.com");

        // Tarkistetaan salasana hashattu oikein
        const isPasswordCorrect = await bcrypt.compare("secret", user.password);
        expect(isPasswordCorrect).toBe(true);

        // Varmistetaan että käyttäjä löytyy tietokannasta
        const found = await prisma.user.findUnique({ where: { id: user.id } });
        expect(found).not.toBeNull();
    });
});