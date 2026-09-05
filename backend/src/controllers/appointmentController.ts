import { Request, Response } from "express";
import { z } from "zod";
import { createAppointment } from "../services/appointments/appointmentService.js";

const schema = z.object({
  doctorId: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  notes: z.string().max(1000).optional()
});

export async function create(req: Request, res: Response) {
  const input = schema.parse(req.body);
  const appointment = await createAppointment({
    ...input,
    patientId: req.user!.userId
  });
  res.status(201).json(appointment);
}
