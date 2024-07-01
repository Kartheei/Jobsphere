import { Job } from '../models/job.js'; // Use named import

export async function createJob(req, res) { // Use export for functions
    const { jobTitle, companyName, location, jobDescription, jobRequirements, employmentType } = req.body;

    try {
        const job = new Job({
            jobTitle,
            companyName,
            location,
            jobDescription,
            jobRequirements,
            employmentType,
        });

        await job.save();
        res.status(201).json({ message: 'Job posted successfully', job });
    } catch (error) {
        res.status(500).json({ message: 'Failed to post job', error });
    }
}
