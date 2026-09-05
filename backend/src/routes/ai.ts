import { Router } from "express";
import { symptoms } from "../controllers/aiController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.post("/symptoms", requireAuth, symptoms);
export default router;
