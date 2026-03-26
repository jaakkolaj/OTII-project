import { getDocument } from "../controllers/supabase.controller";
import { Router } from "express";
import { authentication } from "../middleware/authentication";

// Muodostetaan Router
const supaBaseRouter = Router();

// Liitetään function supabase routeriin
supaBaseRouter.get('/:candidate', authentication, getDocument);

export default supaBaseRouter;