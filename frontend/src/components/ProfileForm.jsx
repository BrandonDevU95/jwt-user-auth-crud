import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import { setUserSession } from '../utils/userSession.js';
import { showToast } from './Toast.jsx';
import { useState } from 'react';

const ProfileForm = ({ user, setReloadProfile }) => {
	const [update, setUpdate] = useState(false);

	const initialValues = {
		avatar: user.avatar,
		firstname: user.firstname,
		lastname: user.lastname,
		username: user.username,
		email: user.email,
		password: '',
		confirmPassword: '',
	};

	const validationSchema = Yup.object({
		avatar: Yup.string().url('Invalid URL'),
		firstname: Yup.string().required('Required'),
		lastname: Yup.string().required('Required'),
		username: Yup.string().required('Required'),
		email: Yup.string().email('Invalid email').required('Required'),
		password: Yup.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref('password'), null],
			'Passwords must match'
		),
	});

	const onSubmit = async (values, { setSubmitting }) => {
		if (!update) {
			setUpdate(true);
			return;
		}

		if (values.password === '') {
			delete values.password;
			delete values.confirmPassword;
		}

		//Compare both objects to see if there are any changes
		const changes = Object.keys(values).some(
			(key) => values[key] !== user[key]
		);

		if (!changes) {
			console.log('No changes detected');
			setUpdate(false);
			return;
		}

		//Send the updated values to the server http://localhost:3000/api/user/update
		try {
			values.updated_at = new Date();

			const response = await fetch(
				'http://localhost:3000/api/user/update',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify(values),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				showToast('Failed to update profile', 'error');
				setSubmitting(false);
				return;
			}

			if (data.error) {
				showToast(data.error, 'error');
				setSubmitting(false);
				return;
			}

			setUserSession(data);
			setReloadProfile(true);
			showToast('Profile updated successfully', 'success');
			setUpdate(false);
		} catch (error) {
			console.log(error);
			showToast(error.message, 'error');
			setSubmitting(false);
			return;
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}>
			{({ isSubmitting }) => (
				<Form className="w-full flex flex-col gap-4">
					{update && (
						<div className="flex items-start flex-col justify-start">
							<label
								htmlFor="avatar"
								className="text-sm text-gray-700 dark:text-gray-200 mr-2">
								Avatar
							</label>
							<Field
								type="text"
								id="avatar"
								name="avatar"
								placeholder="https://example.com/avatar.jpg"
								className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
							<ErrorMessage
								name="avatar"
								component="div"
								className="text-red-500 text-sm mt-1"
							/>
						</div>
					)}

					<div className="mb-4 flex gap-x-2">
						<div className="flex items-start flex-col justify-start">
							<label
								htmlFor="firstname"
								className="text-sm text-gray-700 dark:text-gray-200 mr-2">
								First Name:
							</label>
							<Field
								type="text"
								id="firstname"
								disabled={!update}
								name="firstname"
								className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
							<ErrorMessage
								name="firstname"
								component="div"
								className="text-red-500 text-sm mt-1"
							/>
						</div>

						<div className="flex items-start flex-col justify-start">
							<label
								htmlFor="lastname"
								className="text-sm text-gray-700 dark:text-gray-200 mr-2">
								Last Name:
							</label>
							<Field
								type="text"
								id="lastname"
								disabled={!update}
								name="lastname"
								className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
							<ErrorMessage
								name="lastname"
								component="div"
								className="text-red-500 text-sm mt-1"
							/>
						</div>
					</div>
					<div className="mb-4 flex gap-x-2">
						<div className="flex items-start flex-col justify-start basis-1/3">
							<label
								htmlFor="username"
								className="text-sm text-gray-700 dark:text-gray-200 mr-2">
								Username:
							</label>
							<Field
								type="text"
								id="username"
								disabled={!update}
								name="username"
								className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
							<ErrorMessage
								name="username"
								component="div"
								className="text-red-500 text-sm mt-1"
							/>
						</div>

						<div className="flex items-start flex-col justify-start basis-2/3">
							<label
								htmlFor="email"
								className="text-sm text-gray-700 dark:text-gray-200 mr-2">
								Email:
							</label>
							<Field
								type="email"
								id="email"
								disabled={!update}
								name="email"
								className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className="text-red-500 text-sm mt-1"
							/>
						</div>
					</div>
					{update && (
						<div className="mb-4 flex gap-x-2">
							<div className="flex items-start flex-col justify-start">
								<label
									htmlFor="password"
									className="text-sm text-gray-700 dark:text-gray-200 mr-2">
									Password:
								</label>
								<Field
									type="password"
									id="password"
									name="password"
									className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
								/>
								<ErrorMessage
									name="password"
									component="div"
									className="text-red-500 text-sm mt-1"
								/>
							</div>

							<div className="flex items-start flex-col justify-start">
								<label
									htmlFor="confirmPassword"
									className="text-sm text-gray-700 dark:text-gray-200 mr-2">
									Confirm Password:
								</label>
								<Field
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
								/>
								<ErrorMessage
									name="confirmPassword"
									component="div"
									className="text-red-500 text-sm mt-1"
								/>
							</div>
						</div>
					)}

					<div className="flex gap-x-2">
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
							{update ? 'Save' : 'Update'}
						</button>
						{update && (
							<button
								type="button"
								disabled={isSubmitting}
								onClick={() => setUpdate(false)}
								className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
								Cancel
							</button>
						)}
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ProfileForm;
