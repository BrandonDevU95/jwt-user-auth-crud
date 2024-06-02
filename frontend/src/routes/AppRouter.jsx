import { Route, Routes } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserRoutes from './UserRoutes';

let credential = '';

export const AppRouter = () => {
	return (
		<Routes>
			{credential === 'admin' && (
				<Route path="/*" element={<AdminRoutes />} />
			)}
			{credential === 'user' && (
				<Route path="/*" element={<UserRoutes />} />
			)}
			<Route path="/" element={<HomePage />} />
			<Route path="*" element={<LoginPage />} />
		</Routes>
	);
};
