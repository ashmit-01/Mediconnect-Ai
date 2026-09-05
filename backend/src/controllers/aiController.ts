import { Request, Response } from "express";
import { symptomsSchema } from "../validators/ai.js";
import { analyzeSymptoms } from "../services/ai/geminiService.js";

export async function symptoms(req: Request, res: Response) {
  const { symptoms } = symptomsSchema.parse(req.body);
  const result = await analyzeSymptoms(symptoms);
  res.json(result);
}
