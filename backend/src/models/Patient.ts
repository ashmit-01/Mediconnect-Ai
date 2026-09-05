import mongoose, { Schema } from "mongoose";

const PatientSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    dateOfBirth: Date,
    phone: String,
    address: String,
    bloodGroup: String
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", PatientSchema);
