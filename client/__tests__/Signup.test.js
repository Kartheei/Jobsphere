import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "../../pages/Signup";
import CandidateSignup from "../../components/common/CandidateSignup";
import EmployerSignup from "../../components/common/EmployerSignup";
 
jest.mock("../../components/common/CandidateSignup");
jest.mock("../../components/common/EmployerSignup");
 
describe("Signup Component", () => {
  beforeEach(() => {
    CandidateSignup.mockImplementation(({ handleToggle }) => (
<div>
<button onClick={() => handleToggle(false)}>Switch to Employer</button>
<p>Candidate Signup Form</p>
</div>
    ));
    EmployerSignup.mockImplementation(({ handleToggle }) => (
<div>
<button onClick={() => handleToggle(true)}>Switch to Candidate</button>
<p>Employer Signup Form</p>
</div>
    ));
  });
 
  it("should render CandidateSignup by default", () => {
    render(<Signup />);
    expect(screen.getByText("Candidate Signup Form")).toBeInTheDocument();
    expect(screen.queryByText("Employer Signup Form")).not.toBeInTheDocument();
  });
 
  it("should switch to EmployerSignup when button is clicked", () => {
    render(<Signup />);
    fireEvent.click(screen.getByText("Switch to Employer"));
    expect(screen.getByText("Employer Signup Form")).toBeInTheDocument();
    expect(screen.queryByText("Candidate Signup Form")).not.toBeInTheDocument();
  });
 
  it("should switch back to CandidateSignup when button is clicked", () => {
    render(<Signup />);
    fireEvent.click(screen.getByText("Switch to Employer"));
    fireEvent.click(screen.getByText("Switch to Candidate"));
    expect(screen.getByText("Candidate Signup Form")).toBeInTheDocument();
    expect(screen.queryByText("Employer Signup Form")).not.toBeInTheDocument();
  });
});