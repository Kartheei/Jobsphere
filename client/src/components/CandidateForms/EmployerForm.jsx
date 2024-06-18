import React from 'react';

const EmployerForm = ({ handleToggle, isCandidate }) => {
  return (
    <main className="App-main">
      <div className="signup_container_employer">
        <div className="signup_grid1">
          <img src="./images/employer_sideimage.jpg" alt="A person collecting information on board which contains details regarding another person."/>
        </div>
        <div className="signup_grid2">
          <div className="grid2_container">
            <div className="logoh1">
              <img src="./images/job-sphere-logo.jpg" alt="Logo for Job Sphere: A circular emblem with the words 'Job Sphere' in bold, modern font, surrounded by interconnected gears symbolizing career opportunities." />
              <h3>JOB SPHERE</h3>
            </div>
            <h2>Create Account</h2>
            <div className="signup_toggle-container">
              <button onClick={handleToggle} disabled={isCandidate}>Candidate</button>
              <button onClick={handleToggle} disabled={!isCandidate}>Employer</button>
            </div>

            <hr className="signup_hr"></hr>
            <div className="signup_form-container">
              <form>
                <div className="signup_form-group1">
                  <div>
                    <label htmlFor="efname">First Name</label>
                    <input type="text" id="efname" name="efname" required />
                  </div>
                  <div>
                    <label htmlFor="elname">Last Name</label>
                    <input type="text" id="elname" name="elname" required />
                  </div>
                </div>
                <div className="signup_form-group">
                  <label htmlFor="eoname">Organization Name</label>
                  <input type="text" id="eoname" name="eoname" required />
                </div>
                <div className="signup_form-group">
                  <label htmlFor="eemail">Email</label>
                  <input type="email" id="eemail" name="eemail" required />
                </div>
                <div className="signup_form-group">
                  <label htmlFor="epassword">Password</label>
                  <input type="password" id="epassword" name="epassword" required />
                </div>
                <div className="signup_form-group">
                  <label htmlFor="econfirm-password">Confirm Password</label>
                  <input type="password" id="econfirm-password" name="econfirm-password" required />
                </div>
                <button type="submit" className="signup_submit-btn">Create Account</button>
                <div className= 'signin-link'>
                  <span>Already have an account? <a href='/login'>signin</a></span>
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
