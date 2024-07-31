import axios from "axios";

// Function to submit a job application
const applyForJob = async (jobId) => {
  try {
    const response = await axios.post(
      "/api/applications",
      { jobId },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Function to fetch applications for a specific job
const fetchApplicationsByJobId = async (jobId) => {
  try {
    const response = await axios.get(`/api/applications/job/${jobId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Function to get the application status for a job
const getApplicationStatus = async (jobId) => {
  try {
    const response = await axios.get(`/api/applications/status/${jobId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Function to update the application status
const updateApplicationStatus = async (applicationId, status) => {
  try {
    const response = await axios.put(
      `/api/applications/${applicationId}`,
      { status },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export {
  applyForJob,
  fetchApplicationsByJobId,
  getApplicationStatus,
  updateApplicationStatus,
};
