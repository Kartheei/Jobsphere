import axios from "axios";

export const saveUserProfile = async () => {
  try {
    const response = await axios.get("/api/users/register", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

// Function to fetch the profile of the logged-in user
const fetchUserProfile = async () => {
  try {
    const response = await axios.get("/api/users/profile", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Function to update the profile of the logged-in user
const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put("/api/users/profile", profileData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Function to fetch the profile of a specific user by ID
const fetchCandidateProfile = async (userId) => {
  try {
    const response = await axios.get(`/api/users/profile/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Function to Upload the Resume of candidate
const uploadCandidateResume = async (formData) => {
  debugger;
  try {
    const response = await axios.post('/api/users/uploadResume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to Upload the Resume of candidate
const fetchCandidateResume = async (userId) => {
  debugger;
  try {
    const response = await axios.get(`/api/users/getResume`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'resume.pdf');
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    return response.data;

  } catch (error) {
    console.error('Error fetching the resume:', error);
    throw error;
  }
};

export { fetchUserProfile, updateUserProfile, fetchCandidateProfile, uploadCandidateResume, fetchCandidateResume };
