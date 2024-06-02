import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';

const UserRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="profile" element={<ProfilePage />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default UserRoutes;
