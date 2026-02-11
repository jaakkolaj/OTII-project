import { Router } from "express";
import { createUser } from "../controllers/signup.controller";

// Router
const signupRouter = Router();

// Routti luo käyttäjän tietokantaan
signupRouter.post('/', createUser);

export default signupRouter;