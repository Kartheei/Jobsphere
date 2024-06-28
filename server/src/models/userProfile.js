import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    profilePicture: {
        type: String,
        default: './images/profile.png',
    },
    about: {
        type: String,
        default: '',
    },
    experiences: [{
        jobTitle: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }],
    education: [{
        degree: {
            type: String,
            required: true,
        },
        institutionName: {
            type: String,
            required: true,
        },
        yearsAttended: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }],
    resume: {
        type: String,
        required: true,
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
userProfileSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Update updatedAt before updating
userProfileSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
