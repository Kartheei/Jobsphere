import axios from "axios";

// @Desc - Function to fetch the profile of the logged-in user
const fetchEmployerProfileData = async () => {
  try {
    const response = await axios.get("/api/employers/profile", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employer profile data:", error);
    throw error;
  }
};

const updateEmployerProfile = async (updatedData) => {
  try {
    const response = await axios.put("/api/employers/profile", updatedData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating employer profile data:", error);
    throw error;
  }
};

export { fetchEmployerProfileData, updateEmployerProfile };
