import { Router } from 'express';
import { authentication } from '../middleware/authentication';
import { logoutUser } from '../controllers/logout.controller';

const logouRouter = Router();

logouRouter.post('/', authentication, logoutUser)

export default logouRouter;