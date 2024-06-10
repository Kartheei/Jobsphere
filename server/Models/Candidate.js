const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

module.exports = mongoose.models.Candidate || mongoose.model('Candidate', candidateSchema);
