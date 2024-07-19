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

export { fetchUserProfile, updateUserProfile };
