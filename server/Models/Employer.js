const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    organizationName: String,
    email: String,
    password: String
});

module.exports = mongoose.models.Employer || mongoose.model('Employer', employerSchema);
