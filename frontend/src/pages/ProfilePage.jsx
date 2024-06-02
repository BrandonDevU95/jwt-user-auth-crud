import { useEffect, useState } from 'react';

import ProfileForm from '../components/ProfileForm';
import { getUserSession } from '../utils/userSession';
import { useProfile } from '../contexts/ProfileContext';

const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const { reloadProfile, setReloadProfile } = useProfile();

	useEffect(() => {
		setReloadProfile(false);
		const userSession = getUserSession();
		if (userSession) setUser(userSession);
		else setUser(null);
	}, [reloadProfile, setReloadProfile]);

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
				<ProfileForm user={user} setReloadProfile={setReloadProfile} />
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
