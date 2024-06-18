import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../asset/style/common.css';
const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleReturnToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="container">
        <div className="box">
            <div className="form-header">
                <img src="./images/job-sphere-logo.jpg" alt="Job Sphere Logo" className="logo"/>
                <h1 className="text-white">JOB SPHERE</h1>
            </div>
            <h2 className="text-white">Reset Your Password</h2>
            <form>
                <div className="form-control">
                    <label htmlFor="email" className="text-white">Email</label>
                    <input type="text" id="email" name="email" required className="input-field"/>
                </div>
                <div className="form-control">
                    <label htmlFor="newPassword" className="text-white">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" required className="input-field"/>
                </div>
                <div className="form-control">
                    <label htmlFor="confirmPassword" className="text-white">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required className="input-field"/>
                </div>
                <button type="submit" className="submit-btn">Confirm</button>
            </form>
            <a className="link" href="#" onClick={handleReturnToLogin}>Return to Login</a>
        </div>
    </div>
    );
};

export default ForgotPassword;
