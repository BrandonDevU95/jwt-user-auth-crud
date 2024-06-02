import { Navigate, Route, Routes } from 'react-router-dom';

import AdminPage from '../pages/AdminPage';

const AdminRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<AdminPage />} />
			<Route path="/admin" element={<AdminPage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default AdminRoutes;
