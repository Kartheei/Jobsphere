import { useState } from "react";
import CandidateSignup from "../../components/common/CandidateSignup";
import EmployerSignup from "../../components/common/EmployerSignup";

const Signup = () => {
  const [isCandidate, setIsCandidate] = useState(true);

  const handleToggle = (candidate) => {
    setIsCandidate(candidate);
  };

  return (
    <>
      {isCandidate ? (
        <CandidateSignup
          handleToggle={handleToggle}
          isCandidate={isCandidate}
        />
      ) : (
        <EmployerSignup handleToggle={handleToggle} isCandidate={isCandidate} />
      )}
    </>
  );
};

export default Signup;
