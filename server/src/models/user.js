import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['job_seeker', 'employer'],
    required: true
  },
  profile: {
    bio: String,
    experience: String,
    education: String,
    skills: [String],
    resume: String // URL to the resume file
  },
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const user = mongoose.model('user', userSchema);

export default user;
