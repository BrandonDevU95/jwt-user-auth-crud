import { getUserSession } from '../utils/userSession';
import { useState } from 'react';

const ProfilePage = () => {
	const user = getUserSession();
	const [update, setUpdate] = useState(false);

	const handleUpdate = () => {
		setUpdate(!update);
	};

	if (!user) return null;

	return (
		<div className="flex items-center justify-center h-[calc(100vh-65px)]">
			<div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
				<div className="pb-4 flex justify-center">
					<img
						src={user.avatar}
						alt="User Avatar"
						className="h-32 w-32 rounded-full"
					/>
				</div>
				<form action="#" className="w-full flex flex-col gap-4">
					{update && (
						<div className="flex items-start flex-col justify-start">
							<label
								htmlFor="avatar"
								className="text-sm text-gray-700 dark:text-gray-200 mr-2">
								Avatar
							</label>
							<input
								type="text"
								id="avatar"
								value={user.avatar}
								name="avatar"
								placeholder="https://example.com/avatar.jpg"
								className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
						</div>
					)}

					<div className="mb-4 flex gap-x-2">
						<div className="flex items-start flex-col justify-start">
							<label
								htmlFor="firstName"
								className="text-sm text-gray-700 dark:text-gray-200 mr-2">
								First Name:
							</label>
							<input
								type="text"
								id="firstName"
								disabled={!update}
								value={user.firstname}
								name="firstName"
								className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
						</div>

						<div className="flex items-start flex-col justify-start">
							<label
								htmlFor="lastName"
								className="text-sm text-gray-700 dark:text-gray-200 mr-2">
								Last Name:
							</label>
							<input
								type="text"
								id="lastName"
								disabled={!update}
								value={user.lastname}
								name="lastName"
								className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
							<input
								type="text"
								id="username"
								disabled={!update}
								value={user.username}
								name="username"
								className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
						</div>

						<div className="flex items-start flex-col justify-start basis-2/3">
							<label
								htmlFor="email"
								className="text-sm text-gray-700 dark:text-gray-200 mr-2">
								Email:
							</label>
							<input
								type="email"
								id="email"
								disabled={!update}
								value={user.email}
								name="email"
								className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
								<input
									type="password"
									id="password"
									name="password"
									className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
								/>
							</div>

							<div className="flex items-start flex-col justify-start">
								<label
									htmlFor="confirmPassword"
									className="text-sm text-gray-700 dark:text-gray-200 mr-2">
									Confirm Password:
								</label>
								<input
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
								/>
							</div>
						</div>
					)}

					<div className="flex gap-x-2">
						<button
							type="button"
							onClick={handleUpdate}
							className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
							{update ? 'Save' : 'Update'}
						</button>
						{update && (
							<button
								type="button"
								onClick={() => setUpdate(false)}
								className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
								Cancel
							</button>
						)}
					</div>
				</form>

				<div className="mt-4 text-center">
					<span className="text-sm text-gray-500 dark:text-gray-300">
						Last update:{' '}
						{new Date(user.updated_at).toLocaleString('es-MX', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
							second: 'numeric',
							hour12: true,
						})}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
