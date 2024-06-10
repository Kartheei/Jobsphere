const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Job = require('../models/Job');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const seedData = async () => {
  await User.deleteMany({});
  await Job.deleteMany({});

  const user = new User({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin',
  });

  const savedUser = await user.save();

  const job = new Job({
    title: 'Software Engineer',
    description: 'Job description here',
    company: 'Tech Company',
    location: 'San Francisco, CA',
    salary: 120000,
    postedBy: savedUser._id,
  });

  await job.save();
  console.log('Database seeded');
  mongoose.connection.close();
};

seedData();
