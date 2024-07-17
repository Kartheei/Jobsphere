import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Ensure this matches the correct path if needed
import Login from "./Login";

describe("Login Component", () => {
  it("renders email and password inputs", () => {
    render(<Login onLogin={jest.fn()} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("calls onLogin with email and password when form is submitted", () => {
    const mockOnLogin = jest.fn();
    render(<Login onLogin={mockOnLogin} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password" } });
    fireEvent.click(screen.getByText(/login/i));
    
    expect(mockOnLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password"
    });
  });
});
