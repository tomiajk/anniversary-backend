import express from "express";
import { getDeclines, sendDecline } from "../controllers/declines";
import authenticate from "../middlewares/authentication";

const router = express.Router();

// admin should be able to search for all decline
router.get("/get", authenticate, getDeclines);

// send a decline (you won't be able to attend)
router.post("/send", sendDecline);

export default router;
