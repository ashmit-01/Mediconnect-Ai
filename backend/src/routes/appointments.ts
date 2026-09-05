import { Router } from "express";
import { create } from "../controllers/appointmentController.js";
import { requireAuth, } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";

const router = Router();
router.post("/", requireAuth, requireRole("patient"), create);
export default router;
