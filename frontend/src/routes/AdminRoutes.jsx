import { Navigate, Route, Routes } from 'react-router-dom';

import AdminPage from '../pages/AdminPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';

const AdminRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/admin" element={<AdminPage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default AdminRoutes;
