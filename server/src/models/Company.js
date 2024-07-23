import mongoose from "mongoose";
const { Schema } = mongoose;

const companySchema = new Schema({
  aboutCompany: {
    type: String,
  },
  website: {
    type: String,
  },
  industry: {
    type: String,
  },
  location: {
    type: String,
  },
  insights: {
    totalEmployees: { type: String },
    globalOffices: { type: String },
    yearFounded: { type: Number },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

// Update updatedAt before saving
companySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Update updatedAt before updating
companySchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Company = mongoose.model("Company", companySchema);

export default Company;
