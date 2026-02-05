import {Router, Request, Response, NextFunction } from 'express';
import { authentication } from '../middleware/authentication';

const logouRouter = Router();

logouRouter.post('/', authentication, (req: Request, res: Response) => {

    res.cookie("access_token", "", {
        httpOnly: true,
        secure: false,        // vain HTTPS
        sameSite: "lax",     // suojaa CSRF:ltä
        expires: new Date(0),
        path: "/"
    });
    res.status(200).json({ message: "Logged out" })
});

export default logouRouter;