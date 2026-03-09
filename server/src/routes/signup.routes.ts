import { Router } from "express";
import { createUser } from "../controllers/signup.controller";
import { standardRateLimiter } from "../middleware/rateLimiter";

// Router
const signupRouter = Router();

// Routti luo käyttäjän tietokantaan
signupRouter.post('/', standardRateLimiter("signup"), createUser);

export default signupRouter;