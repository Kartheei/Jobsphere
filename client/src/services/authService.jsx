import axios from "axios";

// API call for register candidate.
const registerCandidate = async (formData) => {
  try {
    const response = await axios.post("/api/users/register", {
      cfname: formData.firstName,
      clname: formData.lastName,
      cemail: formData.email,
      cpassword: formData.password,
      cconfirmPassword: formData.confirmPassword,
      role: "Candidate",
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

// API call for register employer.
const registerEmployer = async (formData) => {
  try {
    const response = await axios.post("/api/users/register", {
      cfname: formData.firstName,
      clname: formData.lastName,
      cemail: formData.email,
      cpassword: formData.password,
      cconfirmPassword: formData.confirmPassword,
      role: "Employer",
      eoname: formData.orgName,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

// API call for login user.
const loginUser = async (formData) => {
  try {
    const response = await axios.post("/api/auth/login", formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

export { registerCandidate, registerEmployer, loginUser };
