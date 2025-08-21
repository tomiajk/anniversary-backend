import express from "express";
import authenticate from "../middlewares/authentication";
import {
  loginUser,
  registerUser,
  updateUserPassword,
  getUser,
} from "../controllers/admin";

const router = express.Router();

// create an admin user
router.post("/create", registerUser);
router.post("/login", loginUser);
router.post("/getUser", authenticate, getUser);
router.put("/update/:userId", authenticate, updateUserPassword);

export default router;
