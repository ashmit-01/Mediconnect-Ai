import mongoose, { Schema } from "mongoose";

const DoctorAvailabilitySchema = new Schema(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true, index: true },
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true },
    isBooked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const DoctorAvailability = mongoose.model("DoctorAvailability", DoctorAvailabilitySchema);
