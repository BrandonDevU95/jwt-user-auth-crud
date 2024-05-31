import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import { showToast } from './Toast.jsx';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const navigate = useNavigate();

	const initialValues = {
		identifier: '',
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

	return (
		<div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
			<div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
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
								<Field
									type="password"
									id="password"
									name="password"
									className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									placeholder="Enter your password"
								/>
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
