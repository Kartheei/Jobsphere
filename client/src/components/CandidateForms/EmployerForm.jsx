import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployerForm = ({ handleToggle, isCandidate }) => {
  const [formData, setFormData] = useState({
    efname: "",
    elname: "",
    eoname: "",
    eemail: "",
    epassword: "",
    econfirmPassword: "",
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
        cfname: formData.efname,
        clname: formData.elname,
        eoname: formData.eoname,
        cemail: formData.eemail,
        cpassword: formData.epassword,
        cconfirmPassword: formData.econfirmPassword,
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
      <div className="signup_container_employer">
        <div className="signup_grid1">
          <img
            src="./images/employer_sideimage.jpg"
            alt="A person collecting information on board which contains details regarding another person."
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
                    <label htmlFor="efname">First Name</label>
                    <input
                      type="text"
                      id="efname"
                      name="efname"
                      value={formData.efname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="elname">Last Name</label>
                    <input
                      type="text"
                      id="elname"
                      name="elname"
                      value={formData.elname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="signup_form-group">
                  <label htmlFor="eoname">Organization Name</label>
                  <input
                    type="text"
                    id="eoname"
                    name="eoname"
                    value={formData.eoname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="signup_form-group">
                  <label htmlFor="eemail">Email</label>
                  <input
                    type="email"
                    id="eemail"
                    name="eemail"
                    value={formData.eemail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="signup_form-group">
                  <label htmlFor="epassword">Password</label>
                  <input
                    type="password"
                    id="epassword"
                    name="epassword"
                    value={formData.epassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="signup_form-group">
                  <label htmlFor="econfirm-password">Confirm Password</label>
                  <input
                    type="password"
                    id="econfirm-password"
                    name="econfirmPassword"
                    value={formData.econfirmPassword}
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

export default EmployerForm;
