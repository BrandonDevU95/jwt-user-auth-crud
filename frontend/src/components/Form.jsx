import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import { USER_CREDENTIALS } from '../constants/localStorage.js';
import { showToast } from './Toast.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [sessionUser, setSessionUser] = useState(() => {
		const userCredentials = JSON.parse(
			localStorage.getItem(USER_CREDENTIALS)
		);

		if (userCredentials) return userCredentials.identifier;
		return '';
	});

	const navigate = useNavigate();

	const initialValues = {
		identifier: sessionUser,
		password: '',
		remember: true,
	};

	const validationSchema = Yup.object({
		identifier: Yup.string()
			.test(
				'is-valid-identifier',
				'Invalid email or username',
				function (value) {
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					const usernameRegex = /^[a-zA-Z0-9_]+$/;
					return emailRegex.test(value) || usernameRegex.test(value);
				}
			)
			.required('Required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Required'),
	});

	const onSubmit = async (values, { setSubmitting, resetForm }) => {
		const data = await loginUser(values.identifier, values.password);

		if (!data) {
			setSubmitting(false);
			return;
		}

		const user = await getUserInfo();

		if (!user) {
			setSubmitting(false);
			return;
		}

		if (values.remember) {
			localStorage.setItem(
				USER_CREDENTIALS,
				JSON.stringify({ identifier: values.identifier })
			);
		} else {
			setSessionUser('');
			localStorage.removeItem(USER_CREDENTIALS);
		}

		showToast(`Welcome ${user.firstname} ${user.lastname}`, 'success');

		setTimeout(() => {
			resetForm;
			navigate('/profile');
		}, 1500);
	};

	const loginUser = async (username, password) => {
		try {
			const response = await fetch('http://localhost:3000/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
				}),
				credentials: 'include', // Incluir credenciales en la solicitud
			});

			const data = await response.json();

			if (!response.ok) {
				showToast(data.error, 'error');
				return;
			}

			return data;
		} catch (error) {
			showToast('An error occurred', 'error');
		}
	};

	const getUserInfo = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/user/me', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			const data = await response.json();

			if (!response.ok) {
				showToast(data.error, 'error');
				return;
			}

			return data;
		} catch (error) {
			showToast('An error occurred', 'error');
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
			<div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 w-full max-w-80">
				<h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
					Welcome Back!
				</h1>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}>
					{({ isSubmitting }) => (
						<Form>
							<div className="mb-4">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Email or Username
								</label>
								<Field
									type="text"
									id="identifier"
									name="identifier"
									className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									placeholder="your@email.com or username"
								/>
								<ErrorMessage
									name="identifier"
									component="div"
									className="text-red-500 text-sm mt-1"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Password
								</label>
								<div className="relative">
									<Field
										type={
											showPassword ? 'text' : 'password'
										}
										id="password"
										name="password"
										className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										placeholder="Enter your password"
									/>
									<button
										type="button"
										onClick={togglePasswordVisibility}
										className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
										{showPassword ? eyeOffIcon : eyeIcon}
									</button>
								</div>
								<ErrorMessage
									name="password"
									component="div"
									className="text-red-500 text-sm mt-1"
								/>
								<a
									href="#"
									className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									Forgot Password?
								</a>
							</div>
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center">
									<Field
										type="checkbox"
										id="remember"
										name="remember"
										className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
									/>
									<label
										htmlFor="remember"
										className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
										Remember me
									</label>
								</div>
								<a
									href="#"
									className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									Create Account
								</a>
							</div>
							<button
								disabled={isSubmitting}
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Login
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default LoginForm;

const eyeIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		className="h-5 w-5 text-gray-500 icon icon-tabler icons-tabler-outline icon-tabler-eye">
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
		<path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
	</svg>
);

const eyeOffIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		className="h-5 w-5 text-gray-500 icon icon-tabler icons-tabler-outline icon-tabler-eye-off">
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
		<path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
		<path d="M3 3l18 18" />
	</svg>
);
