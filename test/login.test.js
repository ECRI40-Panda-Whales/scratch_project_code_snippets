/* eslint-disable indent */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../client/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

// Arrange -> Act -> Assert
// Arrange is where you render the component to be tested
// Act is where user actions are simulated
// Assert is where you check expected values versus actual values

describe('Login', () => {
	beforeEach(() => {
		render(
			<Router>
				<Login />
			</Router>
		);
	});

	test('Login page loads with Username input field', async () => {
		// Check if username field exists
		const usernameInput = screen.getByLabelText('Username');
		expect(usernameInput).toBeInTheDocument();
	});

	test('Login page loads with Password input field', async () => {
		// Check if password field exists
		const passwordInput = screen.getByLabelText('Password');
		expect(passwordInput).toBeInTheDocument();
	});

	test('Login page loads with Login Button', async () => {
		// Check if password field exists
		const loginButton = screen.getByText('Login');
		expect(loginButton).toBeInTheDocument();
	});

	test('Login page loads with Signup Button', async () => {
		// Check if password field exists
		const signupButton = screen.getByText('Sign Up');
		expect(signupButton).toBeInTheDocument();
	});
});
