import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  getMessages,
  getUsersForSidebar,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/getUsers", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

export default router;
