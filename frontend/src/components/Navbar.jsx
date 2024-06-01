import { useEffect, useState } from 'react';

import Profile from './Profile';
import { getUserSession } from '../utils/userSession';
import { useProfile } from '../contexts/ProfileContext';

const Navbar = () => {
	const [user, setUser] = useState(null);
	const { reloadProfile } = useProfile();

	useEffect(() => {
		const userSession = getUserSession();
		if (userSession) setUser(userSession);
	}, [reloadProfile]);

	const handleMenuToggle = () => {
		const mobileMenu = document.getElementById('mobile-menu');
		mobileMenu.classList.toggle('hidden');
	};

	return (
		<nav className="bg-white border border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-2.5 dark:bg-gray-800 shadow">
			<div className="container flex flex-wrap justify-between items-center mx-auto">
				<a href="/" className="flex items-center">
					<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
						JWT Admin Panel
					</span>
				</a>

				<div className="flex items-center">
					<button
						id="menu-toggle"
						onClick={handleMenuToggle}
						type="button"
						className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden">
						<span className="sr-only">Open main menu</span>

						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"></path>
						</svg>
					</button>
				</div>

				<div
					className="w-full md:block md:w-auto hidden"
					id="mobile-menu">
					<ul className="flex flex-col items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
						{user ? (
							<>
								<li>
									<a
										href="/"
										className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
										aria-current="page">
										Home
									</a>
								</li>
								<Profile user={user} />
							</>
						) : (
							<>
								<li>
									<a
										href="/"
										className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
										aria-current="page">
										Home
									</a>
								</li>
								<li>
									<a
										href="/login"
										className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
										login
									</a>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
