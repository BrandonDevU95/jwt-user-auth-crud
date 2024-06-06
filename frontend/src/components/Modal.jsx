import * as Yup from 'yup';

import { ADMIN_ROLE, USER_ROLE } from '../constants/Auth.js';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { useState } from 'react';

const Modal = ({ user, show, onClose }) => {
	const [showChangePassword, setShowChangePassword] = useState(false);
	console.log(user);
	const initialValues = {
		avatar: user.avatar || '',
		firstname: user.firstname || '',
		lastname: user.lastname || '',
		username: user.username || '',
		email: user.email || '',
		password: '',
		confirmPassword: '',
		active: user.active,
		role: user.role,
		updatedAt: new Date(user.updated_at).toLocaleString('es-MX', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: true,
		}),
		createdAt: new Date(user.created_at).toLocaleString('es-MX', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: true,
		}),
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
		active: Yup.boolean(),
		role: Yup.string().required('Required'),
	});

	const onSubmit = async (values, { setSubmitting }) => {
		console.log(Date(values.updatedAt));
		setSubmitting(false);
	};

	return (
		<>
			{show && (
				<>
					<div
						className="fixed inset-0 transition-opacity bg-gray-500 opacity-75"
						aria-hidden="true"
						onClick={onClose}></div>

					<div
						className="fixed z-10 inset-0 overflow-y-auto"
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-headline">
						<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
							<div className="w-full inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
								<div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-6 py-6 flex flex-col items-center">
									<Formik
										initialValues={initialValues}
										enableReinitialize={true}
										validationSchema={validationSchema}
										onSubmit={onSubmit}>
										{({
											isSubmitting,
											values,
											handleChange,
											setFieldValue,
										}) => (
											<Form className="w-full flex flex-col gap-4">
												<div className="flex justify-between">
													<div className="mb-4 flex flex-auto">
														<div className="flex items-start flex-col justify-start w-full">
															<label
																htmlFor="active"
																className="flex flex-col items-center cursor-pointer">
																<span className="text-sm text-gray-700 dark:text-gray-200 mr-2">
																	User Active:{' '}
																	{values.active
																		? 'Yes'
																		: 'No'}
																</span>
																<div className="relative me-auto">
																	<Field
																		type="checkbox"
																		name="active"
																		id="active"
																		className="checkbox hidden"
																		checked={
																			values.active
																		}
																		onChange={
																			handleChange
																		}
																	/>
																	<div className="block border-[1px] border-gray-900 w-14 h-8 rounded-full dark:border-white"></div>
																	<div
																		className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition ${
																			values.active
																				? 'transform translate-x-full bg-green-600'
																				: 'bg-red-600'
																		}`}></div>
																</div>
															</label>
														</div>
														<div className="flex items-start flex-col justify-start w-full">
															<label
																htmlFor="role"
																className="flex flex-col items-center cursor-pointer">
																<span className="text-sm text-gray-700 dark:text-gray-200 mr-2 whitespace-nowrap">
																	User
																	Credentials:{' '}
																	{values.role ===
																	ADMIN_ROLE
																		? 'Admin'
																		: 'User'}
																</span>
																<div className="relative me-auto">
																	<Field
																		type="checkbox"
																		name="role"
																		id="role"
																		className="checkbox hidden"
																		checked={
																			values.role ===
																			ADMIN_ROLE
																		}
																		onChange={() =>
																			setFieldValue(
																				'role',
																				values.role ===
																					ADMIN_ROLE
																					? USER_ROLE
																					: ADMIN_ROLE
																			)
																		}
																	/>
																	<div className="block border-[1px] border-gray-900 w-14 h-8 rounded-full dark:border-white"></div>
																	<div
																		className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition ${
																			values.role ===
																			ADMIN_ROLE
																				? 'transform translate-x-full bg-green-600'
																				: 'bg-red-600'
																		}`}></div>
																</div>
															</label>
														</div>
													</div>
													<div>
														<img
															src={user.avatar}
															alt="User Avatar"
															className="h-16 w-16 rounded-full"
														/>
													</div>
												</div>
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
												<div className="mb-4 flex gap-x-2">
													<div className="flex items-start flex-col justify-start w-full">
														<label
															htmlFor="firstname"
															className="text-sm text-gray-700 dark:text-gray-200 mr-2">
															First Name:
														</label>
														<Field
															type="text"
															id="firstname"
															name="firstname"
															className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
														/>
														<ErrorMessage
															name="firstname"
															component="div"
															className="text-red-500 text-sm mt-1"
														/>
													</div>

													<div className="flex items-start flex-col justify-start w-full">
														<label
															htmlFor="lastname"
															className="text-sm text-gray-700 dark:text-gray-200 mr-2">
															Last Name:
														</label>
														<Field
															type="text"
															id="lastname"
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
												{showChangePassword && (
													<div className="mb-4 flex gap-x-2">
														<div className="flex items-start flex-col justify-start w-full">
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

														<div className="flex items-start flex-col justify-start w-full">
															<label
																htmlFor="confirmPassword"
																className="text-sm text-gray-700 dark:text-gray-200 mr-2">
																Confirm
																Password:
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
												<div className="mb-4 flex gap-x-2">
													<div className="flex items-start flex-col justify-start w-full">
														<label
															htmlFor="createdAt"
															className="text-sm text-gray-700 dark:text-gray-200 mr-2">
															Created At:
														</label>
														<Field
															type="createdAt"
															id="createdAt"
															name="createdAt"
															disabled={true}
															className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
														/>
													</div>
													<div className="flex items-start flex-col justify-start w-full">
														<label
															htmlFor="updatedAt"
															className="text-sm text-gray-700 dark:text-gray-200 mr-2">
															Update At:
														</label>
														<Field
															type="updatedAt"
															id="updatedAt"
															name="updatedAt"
															disabled={true}
															className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
														/>
													</div>
												</div>

												<div className="inline-flex items-center">
													<label
														className="relative flex cursor-pointer items-center rounded-full py-3 pe-3"
														htmlFor="login"
														data-ripple-dark="true">
														<input
															id="login"
															type="checkbox"
															onClick={() =>
																setShowChangePassword(
																	!showChangePassword
																)
															}
															className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-sky-500 checked:bg-sky-500 checked:before:bg-sky-500 hover:before:opacity-10"
														/>
														<div className="pointer-events-none absolute top-2/4 left-2/4 pe-3 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-3.5 w-3.5"
																viewBox="0 0 20 20"
																fill="currentColor"
																stroke="currentColor"
																strokeWidth="1">
																<path
																	fillRule="evenodd"
																	d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																	clipRule="evenodd"></path>
															</svg>
														</div>
													</label>
													<label
														className="text-sm text-gray-700 dark:text-gray-200 mt-px cursor-pointer select-none font-light"
														htmlFor="login">
														Change Password
													</label>
												</div>

												<div className="sm:flex sm:flex-row-reverse">
													<button
														disabled={isSubmitting}
														type="submit"
														className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
														Update
													</button>
													<button
														onClick={onClose}
														disabled={isSubmitting}
														type="button"
														className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
														Cancel
													</button>
												</div>
											</Form>
										)}
									</Formik>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Modal;
