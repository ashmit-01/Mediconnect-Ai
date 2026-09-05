import mongoose, { Schema } from "mongoose";

const DoctorSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    specialty: { type: String, required: true, index: true },
    rating: { type: Number, default: 0 },
    bio: String,
    hospitalIds: [{ type: Schema.Types.ObjectId, ref: "Hospital" }]
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", DoctorSchema);
