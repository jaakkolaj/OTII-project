import { Router } from "express";
import { changeEmail, passwordChange } from "../controllers/user.controller";
import { authentication } from "../middleware/authentication";

const userRouter = Router();

// Routti vaihtaa käyttäjän salasanan
userRouter.put('/change/password', authentication, passwordChange)

// Routti vaihtaa käyttäjän sähköpostin
userRouter.put('/change/email', authentication, changeEmail)

export default userRouter;
