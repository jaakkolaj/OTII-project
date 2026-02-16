import { loginUser } from "../controllers/login.controller";
import { Router } from "express";

// Router
const loginRouter = Router();

// Routti kirjaa käyttäjän sisään ja asettaa tokenin Cookieen
loginRouter.post('/', loginUser)

export default loginRouter;