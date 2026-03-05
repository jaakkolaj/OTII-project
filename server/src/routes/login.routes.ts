import { loginUser } from "../controllers/login.controller";
import { Router } from "express";
import { standardRateLimiter } from "../middleware/rateLimiter";

// Router
const loginRouter = Router();

// Routti kirjaa käyttäjän sisään ja asettaa tokenin Cookieen
loginRouter.post('/', standardRateLimiter("login"), loginUser)

export default loginRouter;