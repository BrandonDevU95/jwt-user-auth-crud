import { useEffect, useRef, useState } from 'react';

import { removeUserSession } from '../utils/userSession';
import { showToast } from './Toast';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';

const Profile = ({ user: { avatar, firstname, lastname, username } }) => {
	const navigate = useNavigate();
	const dropdownRef = useRef(null);
	const { setReloadProfile } = useProfile();
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target)
		) {
			setIsOpen(false);
		}
	};

	const handleProfileClick = () => {
		navigate('/profile');
	};

	const handleLogoutClick = async () => {
		const response = await fetch('http://localhost:3000/api/logout', {
			method: 'GET',
			credentials: 'include',
		});

		if (response.ok) {
			const data = await response.json();
			showToast(data.message, 'success');
			removeUserSession();
			setReloadProfile(true);
			navigate('/');
		} else {
			showToast('Failed to logout', 'error');
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
	}, [dropdownRef]);

	return (
		<div className="relative inline-block text-left" ref={dropdownRef}>
			<img
				src={avatar}
				width="40"
				height="40"
				onClick={toggleDropdown}
				className="cursor-pointer rounded-full"
				alt="User Avatar"
			/>
			{isOpen && (
				<ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
					<div className="p-2">
						<li className="text-sm font-medium text-gray-900">
							<div className="px-4 py-2 cursor-default">
								<div className="flex flex-col">
									<span className="font-medium capitalize">
										{firstname} {lastname}
									</span>
									<span className="text-xs text-gray-500">
										@{username}
									</span>
								</div>
							</div>
						</li>
						<hr className="my-1" />
						<li>
							<button
								id="profile"
								onClick={handleProfileClick}
								className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
								Profile
							</button>
						</li>
						<li>
							<button
								id="logout"
								onClick={handleLogoutClick}
								className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
								Logout
							</button>
						</li>
					</div>
				</ul>
			)}
		</div>
	);
};

export default Profile;
