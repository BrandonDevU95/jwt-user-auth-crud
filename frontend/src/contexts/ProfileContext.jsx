import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
	const [reloadProfile, setReloadProfile] = useState(false);

	return (
		<ProfileContext.Provider value={{ reloadProfile, setReloadProfile }}>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfile = () => {
	return useContext(ProfileContext);
};
