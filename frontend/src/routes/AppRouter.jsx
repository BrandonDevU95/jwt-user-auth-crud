import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};
