import React, { useState } from 'react';
import CandidateForm from '../components/CandidateForm';
import EmployerForm from '../components/EmployerForm';

const SignUpPage = () => {
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

export default SignUpPage;
