import { Router } from "express";
import { Doctor } from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const filter: Record<string, unknown> = {};
  if (typeof req.query.specialty === "string") filter.specialty = req.query.specialty;
  const doctors = await Doctor.find(filter).limit(50).lean();
  res.json(doctors);
});

router.get("/:id", async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).lean();
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  res.json(doctor);
});

export default router;
