import { createContext, useContext, useEffect, useState } from 'react';

import { getUserSession } from '../utils/userSession';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
	const [reloadProfile, setReloadProfile] = useState(false);
	const [status, setStatus] = useState(() => {
		const user = getUserSession();

		if (user) {
			return user.role;
		}
		return 'no-authenticated';
	});
	const [userRefresh, setUserRefresh] = useState(false);

	useEffect(() => {
		setUserRefresh(false);
		(async () => {
			try {
				const response = await fetch(
					'http://localhost:3000/api/user/role',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
						credentials: 'include',
					}
				);

				const data = await response.json();

				if (!response.ok || !data.role) {
					setStatus('no-authenticated');
				} else {
					setStatus(data.role);
				}
			} catch (error) {
				console.error('Failed to authenticate', error);
			}
		})();
	}, [userRefresh]);

	return (
		<ProfileContext.Provider
			value={{
				reloadProfile,
				setReloadProfile,
				status,
				setUserRefresh,
			}}>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfile = () => {
	return useContext(ProfileContext);
};
