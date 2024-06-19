import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible] = useState(false);
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      console.log(response.data); // Handle login success
      setLoading(false);
      // navigate("/dashboard"); // navigation after login
    } catch (err) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="signin_container">
        <div className="logoh1">
          <img src="./images/job-sphere-logo.jpg" alt="Job Sphere Logo" />
          <h1>JOB SPHERE</h1>
        </div>
        <h2>Login</h2>
        <div style={{ color: "red" }}>{error && <>{error}</>}</div>
        <form onSubmit={handleSubmit}>
          <div className="signin_form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signin_form-group">
            <label htmlFor="password">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="signin_btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <h2 className="signup_option">or</h2>
        <button onClick={goToSignup} className="signin_btn" disabled={loading}>
          Signup
        </button>
      </div>
    </main>
  );
};

export default Login;
