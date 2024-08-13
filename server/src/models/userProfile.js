import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  profilePicture: {
    type: String,
    default: "./images/profile.webp",
  },
  about: {
    type: String,
    default: "",
  },
  experiences: [
    {
      jobTitle: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },
      durationFrom: {
        type: Date,
        required: true,
      },
      durationTo: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  education: [
    {
      degree: {
        type: String,
        required: true,
      },
      institutionName: {
        type: String,
        required: true,
      },
      yearsAttendedFrom: {
        type: Date,
        required: true,
      },
      yearsAttendedTo: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  address: {
    streetName: { type: String, default: "" },
    city: { type: String, default: "" },
    postalCode: { type: String, default: "" },
    country: { type: String, default: "" },
  },
  contact: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  resume: {
    filename: String,
    mimeType: String,
    path: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt before saving
userProfileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Update updatedAt before updating
userProfileSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
