const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const candidateRoutes = require('./routes/candidateRoutes');
const employerRoutes = require('./routes/employerRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

console.log('Initializing server...');

// Enable CORS
app.use(cors());
console.log('CORS enabled');

// MongoDB connection string
const mongoUri = '';

// Connect to MongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Middleware to parse request bodies
app.use(bodyParser.json());
console.log('Body parser middleware enabled');

// Routes
app.use('/api/candidates', candidateRoutes);
console.log('Candidate routes enabled');
app.use('/api/employers', employerRoutes);
console.log('Employer routes enabled');
app.use('/api/auth', authRoutes);
console.log('Auth routes enabled');

app.get('/', (req, res) => {
    console.log('GET / called');
    res.send('Hello from JobSphere!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
