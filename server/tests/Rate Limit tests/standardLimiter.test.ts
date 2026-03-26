import { createUser } from "../helpers/createUser";
import app from "../../src/app";
import request from 'supertest';
import { redis } from "../../src/config/redis";

describe('standard ratelimiter tests', () => {
    const standardRateLimit = 5;

    beforeAll(async() => {
        await redis.flushall();
    });

    afterAll(async() => {
        await redis.flushall();
    });

    // Tests for standard rate limiter. 
    it('fails when rate limit is reached', async () => {
        // Rate limit is 5 requests for 60 seconds. 
        for (let i = 0; i < standardRateLimit; i++) {
            const response = await request(app)
            .post('/signup')
            .send({
                email: `standardRateLimit${i}@admin.com`,
                password: 'secret'
            });

            // 5 Requests should not send 429 yet.
            expect(response.status).not.toBe(429);
        }

        // Sixth request is not allowed within 30 seconds.
        const blocked = await request(app)
            .post('/signup')
            .send({
                email: `blocked@test.com`,
                password: 'secret'
            });

        expect(blocked.status).toBe(429);
    });

    // Testing to see that you can send requests to different endpoints even after one of the endpoints rate limit is reached.
    // Standard rate limit uses keyprefix that is passed in as different values for every route.
    it("let's send requests to different endpoint after rate limit is reached in signup", async() => {
        for (let i = 0; i < standardRateLimit; i++) {
            const response = await request(app)
            .post('/login')
            .send({
                email: `standardRateLimit${i}@admin.com`,
                password: 'secret'
            });

            expect(response.status).not.toBe(429);
        }

        // And fails when rateLimit is reached
        const blocked = await request(app)
            .post('/login')
            .send({
                email: `blocked@test.com`,
                password: 'secret'
            });

        expect(blocked.status).toBe(429);
    });
});