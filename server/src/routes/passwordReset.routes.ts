import { Router } from "express";
import { sendPasswordResetEmail, resetPasswordWithToken } from "../controllers/passwordReset.controller";
import { standardRateLimiter } from "../middleware/rateLimiter";

const resetPasswordRouter = Router();

// Routti lähettää sähköpostin sisältäen linkin salasanan vaihtamista varten
resetPasswordRouter.post('/', standardRateLimiter("password-reset"), sendPasswordResetEmail);

// Routti vaihtaa käyttäjän salasanan
resetPasswordRouter.post('/:token', standardRateLimiter("password-reset"), resetPasswordWithToken);

export default resetPasswordRouter;