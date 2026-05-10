import express from "express";
import { uploadMandala } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/mandala", uploadMandala);

export default router;