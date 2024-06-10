const express = require('express');
const Candidate = require('../Models/Candidate');
const Employer = require('../Models/Employer');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received with email:', email);

    try {
        let user = await Candidate.findOne({ email, password });
        if (!user) {
            user = await Employer.findOne({ email, password });
        }

        if (user) {
            console.log('User found:', user);
            res.status(200).json({ message: 'Login successful' });
        } else {
            console.log('Invalid credentials');
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
