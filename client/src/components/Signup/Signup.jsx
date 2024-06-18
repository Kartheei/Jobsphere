import React, { useState } from 'react';
import CandidateForm from '../CandidateForms/CandidateForm';
import EmployerForm from '../CandidateForms/EmployerForm';

const SignUp = () => {
  const [isCandidate, setIsCandidate] = useState(true);

  const handleToggle = () => {
    setIsCandidate(!isCandidate);
  };

  return (
    <div>
      {isCandidate ? (
        <CandidateForm handleToggle={handleToggle} isCandidate={isCandidate} />
      ) : (
        <EmployerForm handleToggle={handleToggle} isCandidate={isCandidate} />
      )}
    </div>
  );
};

export default SignUp;
