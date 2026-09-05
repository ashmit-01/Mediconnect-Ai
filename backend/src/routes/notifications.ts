import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { Notification } from "../models/index.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const items = await Notification.find({ userId: req.user!.userId }).sort({ createdAt: -1 });
  res.json(items);
});

router.patch("/:id/read", requireAuth, async (req, res) => {
  const item = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user!.userId },
    { read: true },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "Notification not found" });
  res.json(item);
});

export default router;
