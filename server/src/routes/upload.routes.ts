import { Router } from "express";
import multer from "multer";
import { uploadFiles } from "../controllers/upload.controller";
import { uploadRateLimitMiddleware } from "../middleware/rateLimiter";

const uploadRouter = Router();

//sallitut tiedostotyypit
const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

// Tiedostosuodatin vain PDF- ja DOCX-tiedostoille
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Vain .pdf ja .docx tiedostot ovat sallittuja!"));
  }
}

const storage = multer.memoryStorage();
// Määritellään multer-latausasetukset
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimikoko: 5MB
  fileFilter,
});

// Reitti tiedostojen lataukselle
uploadRouter.post("/", uploadRateLimitMiddleware, upload.array("files", 30), uploadFiles);

export default uploadRouter;
