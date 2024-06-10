const express = require('express');
const Employer = require('../Models/Employer');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log('POST /api/employers called');
    console.log('Request body:', req.body);
    try {
        const employer = new Employer(req.body);
        console.log('New employer created:', employer);
        await employer.save();
        console.log('Employer saved to database');
        res.status(201).send(employer);
    } catch (error) {
        console.error('Error saving employer:', error);
        res.status(400).send(error);
    }
});

module.exports = router;
