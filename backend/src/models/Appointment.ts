import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true, index: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true, index: true },
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled", "rescheduled"],
      default: "booked",
      index: true
    },
    notes: String
  },
  { timestamps: true }
);

AppointmentSchema.index({ doctorId: 1, startTime: 1 });

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
