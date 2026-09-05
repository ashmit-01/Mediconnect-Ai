import { Appointment } from "../../models/index.js";
import mongoose from "mongoose";

export async function createAppointment(input: {
  patientId: string;
  doctorId: string;
  startTime: Date;
  endTime: Date;
  notes?: string;
}) {
  const conflict = await Appointment.findOne({
    doctorId: input.doctorId,
    startTime: input.startTime,
    status: { $in: ["booked", "rescheduled"] }
  });

  if (conflict) {
    const error = new Error("Doctor is already booked for this time");
    (error as Error & { status?: number }).status = 409;
    throw error;
  }

  // For production, wrap conflict checking + creation in a MongoDB transaction
  // on Atlas to make concurrent booking requests atomic.
  return Appointment.create({
    ...input,
    doctorId: new mongoose.Types.ObjectId(input.doctorId),
    patientId: new mongoose.Types.ObjectId(input.patientId)
  });
}
