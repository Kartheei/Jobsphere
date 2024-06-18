import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import ForgotPassword from './ForgotPassword'; // Adjust the import path based on your project structure

// Helper function to render the component within the router context
function renderWithRouter(ui, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
}

describe('ForgotPassword', () => {
  it('renders correctly', () => {
    renderWithRouter(<ForgotPassword />);
    expect(screen.getByText(/reset your password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('allows input to be entered', () => {
    renderWithRouter(<ForgotPassword />);
    const emailInput = screen.getByLabelText(/email/i);
    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    userEvent.type(emailInput, 'test@example.com');
    expect(emailInput.value).toBe('test@example.com');

    userEvent.type(newPasswordInput, 'newPassword');
    expect(newPasswordInput.value).toBe('newPassword');

    userEvent.type(confirmPasswordInput, 'confirmPassword');
    expect(confirmPasswordInput.value).toBe('confirmPassword');
  });

  it('handles form submission', () => {
    const mockSubmit = jest.fn();
    renderWithRouter(<ForgotPassword onSubmit={mockSubmit} />);
    const submitButton = screen.getByRole('button', { name: /confirm/i });

    fireEvent.click(submitButton);
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('navigates to login on link click', () => {
    const testMessage = 'You are on the login page';
    renderWithRouter(
      <MemoryRouter initialEntries={['/forgot-password']}>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<div>{testMessage}</div>} />
      </MemoryRouter>
    );

    const returnLink = screen.getByText(/return to login/i);
    userEvent.click(returnLink);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
