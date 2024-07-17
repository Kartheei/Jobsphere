import mongoose from "mongoose";
const { Schema } = mongoose;

const applicationSchema = new Schema({
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "reviewed", "accepted", "rejected"],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  job_id: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Update updated_at before saving
applicationSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

// Update updated_at before updating
applicationSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updated_at: Date.now() });
  next();
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
