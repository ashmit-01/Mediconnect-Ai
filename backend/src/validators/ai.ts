import { z } from "zod";

export const symptomsSchema = z.object({
  symptoms: z.string().min(2).max(3000)
});
