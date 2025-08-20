import express from "express";
import {
  deletePicture,
  getPictures,
  postPicture,
} from "../controllers/gallery";
import upload from "../middlewares/multer";
import authenticate from "../middlewares/authentication";

const router = express.Router();

// get all images
router.get("/get", getPictures);

// add images to the gallery
router.post("/upload", upload.array("pictures", 20), postPicture);

// delete image from the gallery
router.delete("/delete/:pictureId", authenticate, deletePicture);

export default router;
