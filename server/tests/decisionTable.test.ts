import prisma from '../src/prisma';
import { createUser } from './helpers/createUser';
import { validateEmail } from '../src/utils/validation';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import app from '../src/app';
import request from 'supertest';

describe('email and password validation', () => {
    beforeAll(async () => {
        await prisma.user.deleteMany({
            where: {
                email: "jestTest1@admin.com"
            }
        });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('creates user when both are valid', async () => {
        const user = await createUser("jestTest1@admin.com");
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.email).toBe("jestTest1@admin.com");
        
        const isPasswordCorrect = await bcrypt.compare("secret", user.password);
        expect(isPasswordCorrect).toBe(true);
    });
    it('fails when email is invalid', async () => {
        const invalidEmail = "jestTestDecisionTableadmin.com";
        expect(validateEmail(invalidEmail)).toBe(false);
        
        const response = await request(app)
            .post('/signup')
            .send({
                email: invalidEmail,
                password: 'secret'
            });
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });
    it('fails when password is too short', async () => {
        const response = await request(app)
            .post('/signup')
            .send({
                email: "testUserJest@admin.com",
                password: "123"
            });
            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined()
    });
});