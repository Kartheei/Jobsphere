// import mongoose from 'mongoose';


// const jobSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   company: {
//     type: String,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   salary: {
//     type: Number
//   },
//   postedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   applicants: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     }
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const job = mongoose.model('job', jobSchema);

// export default job;



//part 2

// const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//     jobTitle: { type: String, required: true },
//     companyName: { type: String, required: true },
//     location: { type: String, required: true },
//     jobDescription: { type: String, required: true },
//     jobRequirements: { type: String, required: true },
//     employmentType: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Job', jobSchema);


// job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    jobTitle: String,
    companyName: String,
    location: String,
    jobDescription: String,
    jobRequirements: String,
    employmentType: String,
    // Add more fields as needed
});

const Job = mongoose.model('Job', jobSchema);

export { Job }; // Named export

