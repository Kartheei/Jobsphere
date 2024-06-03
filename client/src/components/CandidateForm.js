import React from 'react';

const CandidateForm = ({ handleToggle, isCandidate }) => {
  return (
    <main className="App-main">
      <div className="signup_container_candidate">
        <div className="grid1">
          <img src="./images/candidate_sideimage.jpg" alt="Three people standing on a table and searching for something through telescope in three directions and a masked figure siting under the table." className="centered-image" />
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
                    <label for="cfname">First Name</label>
                    <input type="text" id="cfname" name="cfname" required />
                  </div>
                  <div>
                    <label for="clname">Last Name</label>
                    <input type="text" id="clname" name="clname" required />
                  </div>
                </div>
                <div class="form-group">
                  <label for="cemail">Email</label>
                  <input type="email" id="cemail" name="cemail" required />
                </div>
                <div class="form-group">
                  <label for="cpassword">Password</label>
                  <input type="password" id="cpassword" name="cpassword" required />
                </div>
                <div class="form-group">
                  <label for="cconfirm-password">Confirm Password</label>
                  <input type="password" id="cconfirm-password" name="cconfirm-password" required />
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

export default CandidateForm;
