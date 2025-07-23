import express from "express";
import {
  login,
  signup,
  logout,
  updateProfile,
  checkUser,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.put("/check", protectRoute, checkUser);

export default router;
