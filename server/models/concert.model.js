import mongoose from "mongoose";

const ConcertSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    pic: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Concert", ConcertSchema);
