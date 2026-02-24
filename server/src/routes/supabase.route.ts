import { getDocument } from "../controllers/supabase.controller";
import { Router } from "express";

// Muodostetaan Router
const supaBaseRouter = Router();

// Liitetään function supabase routeriin
supaBaseRouter.get('/:candidate', getDocument);

export default supaBaseRouter;