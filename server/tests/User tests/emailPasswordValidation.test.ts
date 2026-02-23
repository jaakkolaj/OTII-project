import prisma from '../../src/prisma';
import { createUser } from '../helpers/createUser';
import { validateEmail } from '../../src/utils/validation';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import app from '../../src/app';
import request from 'supertest';

describe('email and password validation', () => {
    let newUser;
    let user_id: string;
    let new_user_id: string;
    beforeAll(async () => {
        newUser = await createUser('emailPasswordValidationFail@gmail.com');
        new_user_id = newUser.id;
    });

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } });
        await prisma.user.delete({ where: { id: new_user_id } });
        await prisma.$disconnect();
    });

    it('creates user when both are valid', async () => {
        const user = await createUser("emailPasswordValidationPass@admin.com");
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.email).toBe("emailPasswordValidationPass@admin.com");
        
        const isPasswordCorrect = await bcrypt.compare("secret", user.password);
        expect(isPasswordCorrect).toBe(true);
        user_id = user.id;
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

    it('fails if email is not unique', async() => {
        const response = await request(app)
            .post('/signup')
            .send({
                email: "emailPasswordValidationFail@gmail.com",
                password: "123456"
            });
            // Expect status 400, email is not unique.
            expect(response.status).toBe(400)
            expect(response.body.error).toBeDefined();
    });
});