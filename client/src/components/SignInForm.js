import React from 'react';

const SignInForm = () => {
    return (
        <main>
            <div className="signin_container">
                <div className="logoh1">
                    <img src="./images/job-sphere-logo.jpg" alt="Job Sphere Logo"/>
                    <h1>JOB SPHERE</h1>
                </div>
                <h2>Login</h2>
                <form>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" required />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" required />
                    </div>
                    <button type="submit" class="btn">Create Account</button>
                </form>
            </div>

        </main>

    );
};

export default SignInForm;