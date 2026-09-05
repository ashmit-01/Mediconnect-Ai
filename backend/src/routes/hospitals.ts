import { Router } from "express";
import { Hospital } from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : "";
  const hospitals = await Hospital.find(
    query ? { $text: { $search: query } } : {}
  ).limit(50).lean();
  res.json(hospitals);
});

export default router;
