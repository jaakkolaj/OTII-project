import { loginUser } from "../controllers/login.controller";
import { Router } from "express";
import { loginRateLimitMiddleware } from "../middleware/rateLimiter";

// Router
const loginRouter = Router();

// Routti kirjaa käyttäjän sisään ja asettaa tokenin Cookieen
loginRouter.post('/', loginRateLimitMiddleware, loginUser)

export default loginRouter;