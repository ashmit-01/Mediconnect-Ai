import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { Patient, MedicalRecord } from "../models/index.js";

const router = Router();

router.get("/me", requireAuth, async (req, res) => {
  const patient = await Patient.findOne({ userId: req.user!.userId }).lean();
  res.json(patient);
});

router.get("/me/records", requireAuth, async (req, res) => {
  const patient = await Patient.findOne({ userId: req.user!.userId });
  if (!patient) return res.status(404).json({ message: "Patient profile not found" });
  const records = await MedicalRecord.find({ patientId: patient._id }).sort({ recordDate: -1 });
  res.json(records);
});

export default router;
