import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CandidateForm = ({ handleToggle, isCandidate }) => {
  const [formData, setFormData] = useState({
    cfname: "",
    clname: "",
    cemail: "",
    cpassword: "",
    cconfirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/users/register", {
        ...formData,
        role: isCandidate ? "Candidate" : "Employer",
      });
      console.log(response.data); // Handle registration success
      setLoading(false);
      navigate("/login"); // Navigate to login page after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="App-main">
      <div className="signup_container_candidate">
        <div className="signup_grid1">
          <img
            src="./images/candidate_sideimage.jpg"
            alt="Three people standing on a table and searching for something through telescope in three directions and a masked figure sitting under the table."
          />
        </div>
        <div className="signup_grid2">
          <div className="grid2_container">
            <div className="logoh1">
              <img
                src="./images/job-sphere-logo.jpg"
                alt="Logo for Job Sphere: A circular emblem with the words 'Job Sphere' in bold, modern font, surrounded by interconnected gears symbolizing career opportunities."
              />
              <h3>JOB SPHERE</h3>
            </div>
            <h2>Create Account</h2>
            <div className="signup_toggle-container">
              <button onClick={handleToggle} disabled={isCandidate}>
                Candidate
              </button>
              <button onClick={handleToggle} disabled={!isCandidate}>
                Employer
              </button>
            </div>
            <hr className="signup_hr"></hr>
            <div className="signup_form-container">
              <form onSubmit={handleSubmit}>
                <div className="signup_form-group1">
                  <div>
                    <label htmlFor="cfname">First Name</label>
                    <input
                      type="text"
                      id="cfname"
                      name="cfname"
                      value={formData.cfname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="clname">Last Name</label>
                    <input
                      type="text"
                      id="clname"
                      name="clname"
                      value={formData.clname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="signup_form-group">
                  <label htmlFor="cemail">Email</label>
                  <input
                    type="email"
                    id="cemail"
                    name="cemail"
                    value={formData.cemail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="signup_form-group">
                  <label htmlFor="cpassword">Password</label>
                  <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    value={formData.cpassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="signup_form-group">
                  <label htmlFor="cconfirm-password">Confirm Password</label>
                  <input
                    type="password"
                    id="cconfirm-password"
                    name="cconfirmPassword"
                    value={formData.cconfirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="signup_submit-btn"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
                <div className="signin-link">
                  <span>
                    Already have an account? <a href="/login">Sign in</a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CandidateForm;
