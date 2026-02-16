import { Router } from "express";
import { resetPassword } from "../controllers/passwordReset.controller";

const resetPasswordRouter = Router();

resetPasswordRouter.post('/', resetPassword);

export default resetPasswordRouter;