import mongoose from "mongoose";

const ConcertSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  venue: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("Concert", ConcertSchema);