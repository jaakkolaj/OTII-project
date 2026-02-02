import prisma from '../src/prisma';
import { createUser } from './helpers/createUser';
import { validateEmail } from '../src/utils/validation';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import app from '../src/app';
import request from 'supertest';

describe('email and password validation', () => {

    // Poistetaan mahdollinen testikäyttäjä ennen testejä
    beforeAll(async () => {
        await prisma.user.deleteMany({
            where: { email: "validationTest@admin.com" }
        });
    });

    // Suljetaan Prisma-yhteys testien jälkeen
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('creates user when both are valid', async () => {
        const user = await createUser("validationTest@admin.com");

        // Tarkistetaan että käyttäjä luotiin
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.email).toBe("validationTest@admin.com");

        // Tarkistetaan salasanan hash
        const isPasswordCorrect = await bcrypt.compare("secret", user.password);
        expect(isPasswordCorrect).toBe(true);
    });

    it('fails when email is invalid', async () => {
        const invalidEmail = "jestTestDecisionTableadmin.com";

        // Validaattori hylkää
        expect(validateEmail(invalidEmail)).toBe(false);

        // API palauttaa 400
        const response = await request(app)
            .post('/signup')
            .send({ email: invalidEmail, password: 'secret' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    it('fails when password is too short', async () => {
        // Liian lyhyt salasana -> 400
        const response = await request(app)
            .post('/signup')
            .send({ email: "validationTestPassword@admin.com", password: "123" });

        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });
});
