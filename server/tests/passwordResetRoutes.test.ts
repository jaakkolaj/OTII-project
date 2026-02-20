import prisma from "../src/prisma";
import jwt from 'jsonwebtoken';
import request from "supertest";
import app from "../src/app";
import { createUser } from "./helpers/createUser";

describe('Password reset routes', () => {
    let email = 'passwordResetRoutes@gmail.com';
    let user_id: string;
    beforeAll(async () => {
        email = 'passwordResetRoutes@gmail.com';
        const user = await createUser(email);
        user_id = user.id;
    });

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } });
    });

    it('fails if email is incorrect', async () => {
        const response = await request(app)
            .post('/reset-password')
            .send({ email: 'passwordResetRoutes123@gmail.com' });
        expect(response.status).toBe(404);
    });

    it('sends email when email is correct', async () => {
        const response = await request(app)
            .post('/reset-password')
            .send({ email: 'passwordResetRoutes@gmail.com' });
        expect(response.status).toBe(200);
    });

    it('fails to update password if token is not correct', async() => {
        const token = jwt.sign(
            { id: user_id, email: email },
            "kosodpskopssss"
        );
        const response = await request(app)
            .post(`/reset-password/${token}`)
            .send({ password: "123123" });
        expect(response.status).toBe(400);
    });

    it('fails if password is not valid', async() => {
        const token = jwt.sign(
            { id: user_id, email: email },
            "kosodpskop"
        );
        const response = await request(app)
            .post(`/reset-password/${token}`)
            .send({ password: "123" });
        expect(response.status).toBe(400);
    });

    it('Updates password correctly', async() => {
        const token = jwt.sign(
            { id: user_id, email: email },
            "kosodpskop"
        );
        const response = await request(app)
            .post(`/reset-password/${token}`)
            .send({ password: "123123123" });
        expect(response.status).toBe(201);
    });
});