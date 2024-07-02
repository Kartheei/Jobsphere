// import mongoose from 'mongoose';


// const jobSchema = new mongoose.Schema({
//   jobTitle: {
//     type: String,
//     required: true
//   },
//   jobDescription: {
//     type: String,
//     required: true
//   },
//   companyName: {
//     type: String,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   jobRequirements: {
//     type: String,
//     required: true
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



import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    jobTitle: { type:String, required: true },
    companyName: { type:String, required: true },
    location: { type:String, required: true },
    jobDescription: { type:String, required: true },
    jobRequirements: { type:String, required: true },
    employmentType: { type:String, required: true },
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export { Job }; // Named export

