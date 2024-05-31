import { showToast } from './Toast.jsx';
import { useState } from 'react';

const Form = () => {
	const [username, setUsername] = useState('bvargas');
	const [password, setPassword] = useState('123456');

	const handleSubmit = async (e) => {
		e.preventDefault();

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

			if (data.error) {
				showToast(data.error, 'error');
				setUsername('');
				setPassword('');
			} else {
				showToast('Login successful', 'success');
				setUsername('');
				setPassword('');
				// setTimeout(() => {
				// 	window.location.href = '/profile';
				// }, 2000);
			}
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
				<form action="#" onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Email Address
						</label>
						<input
							type="text"
							id="email"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="your@email.com"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="Enter your password"
							required
						/>
						<a
							href="#"
							className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Forgot Password?
						</a>
					</div>
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center">
							<input
								type="checkbox"
								id="remember"
								className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
								defaultChecked
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
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Form;
