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


export const getAllJobs = async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching jobs', error });
    }
  };