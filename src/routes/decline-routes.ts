import express from "express";
import {
	getDeclines,
	sendDecline,
	deleteDecline,
} from "../controllers/declines";
import authenticate from "../middlewares/authentication";

const router = express.Router();

// admin should be able to search for all decline
router.get("/get", authenticate, getDeclines);

// send a decline (you won't be able to attend)
router.post("/send", sendDecline);

// delete a decline
router.delete("/delete/:declineId", authenticate, deleteDecline);

export default router;
