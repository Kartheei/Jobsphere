import mongoose from "mongoose";
const { Schema } = mongoose;

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: String,
  requirements: { type: String, required: true },
  job_type: {
    type: String,
    required: true,
    enum: ["full_time", "part_time", "contract", "internship"],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  // companyId: { type: Schema.Types.ObjectId, ref: "company" },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

const jobs = mongoose.model("job", jobSchema);

export { jobs };
