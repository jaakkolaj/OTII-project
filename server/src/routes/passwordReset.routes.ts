import { Router } from "express";
import { sendPasswordResetEmail, resetPasswordWithToken } from "../controllers/passwordReset.controller";

const resetPasswordRouter = Router();

// Routti lähettää sähköpostin sisältäen linkin salasanan vaihtamista varten
resetPasswordRouter.post('/', sendPasswordResetEmail);

// Routti vaihtaa käyttäjän salasanan
resetPasswordRouter.post('/:token', resetPasswordWithToken);

export default resetPasswordRouter;