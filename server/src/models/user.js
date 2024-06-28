import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    enum: ['Candidate', 'Employer'],
    required: true
  },
  organizationName: {
    type: String,
    required: function () {
      return this.role === 'Employer';
    }, // Specific to Employers, required only for Employer role
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
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
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Update updatedAt before saving
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Update updatedAt before updating
userSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const user = mongoose.model('user', userSchema);

export default user;
