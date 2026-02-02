import { Router } from "express";
import multer from "multer";
import { uploadFiles } from "../controllers/upload.controller";

const uploadRouter = Router();
const storage = multer.memoryStorage();

// Määritellään multer-latausasetukset
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimikoko: 5MB
});

// Reitti tiedostojen lataukselle
uploadRouter.post("/", upload.array("files", 30), uploadFiles);

export default uploadRouter;
