import { ADMIN_ROLE, USER_ROLE } from '../constants/Auth';
import { Route, Routes } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserRoutes from './UserRoutes';
import { useProfile } from '../contexts/ProfileContext';

export const AppRouter = () => {
	const { status } = useProfile();

	return (
		<Routes>
			{status === ADMIN_ROLE && (
				<Route path="/*" element={<AdminRoutes />} />
			)}
			{status === USER_ROLE && (
				<Route path="/*" element={<UserRoutes />} />
			)}
			<Route path="/" element={<HomePage />} />
			<Route path="*" element={<LoginPage />} />
		</Routes>
	);
};
