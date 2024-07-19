import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmployerForm from './EmployerForm';

describe('EmployerForm Component', () => {
  const handleToggle = jest.fn();

  test('renders the component correctly', () => {
    render(<EmployerForm handleToggle={handleToggle} isCandidate={false} />);
    
    // Check if all elements are rendered
    expect(screen.getByAltText('A person collecting information on board which contains details regarding another person.')).toBeInTheDocument();
    expect(screen.getByAltText("Logo for Job Sphere: A circular emblem with the words 'Job Sphere' in bold, modern font, surrounded by interconnected gears symbolizing career opportunities.")).toBeInTheDocument();
    expect(screen.getByText('JOB SPHERE')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Organization Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText('Already have an account? signin')).toBeInTheDocument();
  });

  test('handles toggle button clicks correctly', () => {
    render(<EmployerForm handleToggle={handleToggle} isCandidate={false} />);
    
    const candidateButton = screen.getByText('Candidate');
    const employerButton = screen.getByText('Employer');

    // Check if the buttons are correctly enabled/disabled
    expect(candidateButton).not.toBeDisabled();
    expect(employerButton).toBeDisabled();

    // Click the candidate button
    fireEvent.click(candidateButton);

    // Ensure handleToggle was called
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  test('allows form input', () => {
    render(<EmployerForm handleToggle={handleToggle} isCandidate={false} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'One' } });
    fireEvent.change(screen.getByLabelText('Organization Name'), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user21@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'user' } });

    // Check if the values are in the document
    expect(screen.getByLabelText('First Name')).toHaveValue('User');
    expect(screen.getByLabelText('Last Name')).toHaveValue('One');
    expect(screen.getByLabelText('Organization Name')).toHaveValue('Acme Corp');
    expect(screen.getByLabelText('Email')).toHaveValue('user21@gmail.com');
    expect(screen.getByLabelText('Password')).toHaveValue('user');
    expect(screen.getByLabelText('Confirm Password')).toHaveValue('user');
  });

  test('form submission', () => {
    render(<EmployerForm handleToggle={handleToggle} isCandidate={false} />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'One' } });
    fireEvent.change(screen.getByLabelText('Organization Name'), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user21@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'user' } });

    // Submit the form
    fireEvent.click(screen.getByText('Create Account'));

    // Check if the form submission was triggered (you would replace this with your actual form submission handler logic)
    // For this example, we will just ensure there is no error during the submission
  });
});
