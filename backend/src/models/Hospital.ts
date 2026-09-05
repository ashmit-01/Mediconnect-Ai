import mongoose, { Schema } from "mongoose";

const HospitalSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    address: { type: String, required: true },
    latitude: Number,
    longitude: Number,
    specialties: [String]
  },
  { timestamps: true }
);

export const Hospital = mongoose.model("Hospital", HospitalSchema);
