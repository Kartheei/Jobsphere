import axios from "axios";

// Function to create job data object
const constructJobData = (formData) => {
  return {
    title: formData.jobTitle,
    description: formData.jobDescription,
    location: formData.location,
    salary: formData.salary,
    requirements: formData.jobRequirements,
    job_type: formData.employmentType,
  };
};

// API call for creating a job.
const createJob = async (formData) => {
  try {
    const jobData = constructJobData(formData);
    const response = await axios.post("/api/jobs/createJob", jobData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// API call for fetching all jobs.
const fetchJobs = async () => {
  try {
    const response = await axios.get("/api/jobs", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Function to fetch and return 3 random jobs.
const fetchRandomJobs = async () => {
  try {
    const jobs = await fetchJobs();
    if (jobs.length === 0) {
      return [];
    }
    const shuffled = jobs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchJoblistbyEmployer = async () => {
  try {
    const response = await axios.get("/api/jobs/employer/jobs", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export { createJob, fetchJobs, fetchRandomJobs, fetchJoblistbyEmployer };
