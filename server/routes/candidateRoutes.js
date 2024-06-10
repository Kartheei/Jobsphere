const express = require('express');
const Candidate = require('../Models/Candidate');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log('POST /api/candidates called');
    console.log('Request body:', req.body);
    try {
        const candidate = new Candidate(req.body);
        console.log('New candidate created:', candidate);
        await candidate.save();
        console.log('Candidate saved to database');
        res.status(201).send(candidate);
    } catch (error) {
        console.error('Error saving candidate:', error);
        res.status(400).send(error);
    }
});

module.exports = router;
