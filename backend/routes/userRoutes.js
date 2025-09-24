import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/user/profile
router.get("/profile", protect, (req, res) => {
  res.json({ message: "User Profile", user: req.user });
});

export default router;
