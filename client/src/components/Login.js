import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const goToSignup = () => {
        navigate('/signup'); 
    };

    return (
        <main>
            <div className="signin_container">
                <div className="logoh1">
                    <img src="./images/job-sphere-logo.jpg" alt="Job Sphere Logo"/>
                    <h1>JOB SPHERE</h1>
                </div>
                <h2>Login</h2>
                <form>
                    <div className="signin_form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" required />
                    </div>
                    <div className="signin_form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required />
                    </div>
                    <button type="submit" className="signin_btn">Login</button>
                </form>
                <h2 className='signup_option'>or</h2>
                <button onClick={goToSignup} className="signin_btn">Signup</button>

            </div>
        </main>
    );
};

export default Login;