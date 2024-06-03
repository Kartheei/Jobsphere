import React from 'react';

const EmployerForm = ({ handleToggle, isCandidate   }) => {
  return (
    <main className="App-main">
      <div className="signup_container_employer">
        <div className="grid1">
          <img src="./images/employer_sideimage.jpg" alt="A person collecting on board which contains details regarding a person from a person." className="centered-image" />
        </div>
        <div className="grid2">
          <div className="grid2_container">
            <div className="logoh1">
              <img src="./images/job-sphere-logo.jpg" alt="Logo for Job Sphere: A circular emblem with the words 'Job Sphere' in bold, modern font, surrounded by interconnected gears symbolizing career opportunities." />
              <h3>JOB SPHERE</h3>
            </div>
            <h2>Create Account</h2>
            <div className="toggle-container">
              <button onClick={handleToggle} disabled={isCandidate}>Candidate</button>
              <button onClick={handleToggle} disabled={!isCandidate}>Employer</button>
            </div>

            <hr className="custom-hr"></hr>
            <div className="form-container">
              <form>
                <div className="form-group1">
                  <div>
                    <label for="efname">First Name</label>
                    <input type="text" id="efname" name="efname" required />
                  </div>
                  <div>
                    <label for="elname">Last Name</label>
                    <input type="text" id="elname" name="lname" required />
                  </div>
                </div>
                <div class="form-group">
                  <label for="eoname">Organization Name</label>
                  <input type="eoname" id="eoname" name="eoname" required />
                </div>
                <div class="form-group">
                  <label for="eemail">Email</label>
                  <input type="email" id="eemail" name="eemail" required />
                </div>
                <div class="form-group">
                  <label for="epassword">Password</label>
                  <input type="password" id="epassword" name="epassword" required />
                </div>
                <div class="form-group">
                  <label for="econfirm-password">Confirm Password</label>
                  <input type="password" id="econfirm-password" name="econfirm-password" required />
                </div>
                <button type="submit" class="submit-btn">Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmployerForm;
