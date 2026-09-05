import mongoose, { Schema } from "mongoose";

const MedicalRecordSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true, index: true },
    title: { type: String, required: true },
    description: String,
    recordDate: { type: Date, default: Date.now },
    fileUrl: String
  },
  { timestamps: true }
);

export const MedicalRecord = mongoose.model("MedicalRecord", MedicalRecordSchema);
