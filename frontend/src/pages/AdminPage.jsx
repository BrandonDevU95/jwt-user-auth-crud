import { useEffect, useState } from 'react';

import ListUsers from '../components/ListUsers';
import { showToast } from '../components/Toast';

const AdminPage = () => {
	const [listUsers, setListUsers] = useState(null);
	const [reloadListUsers, setReloadListUsers] = useState(false);

	const fetchUsers = async () => {
		try {
			const response = await fetch(
				'http://localhost:3000/api/admin/users',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				}
			);
			const data = await response.json();
			setListUsers(data);
		} catch (error) {
			showToast(error.message || 'Error to getting users', 'error');
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [reloadListUsers]);

	return (
		<div className="container py-5 h-[calc(100vh-65px)] mx-auto">
			{listUsers ? (
				<ListUsers
					listUsers={listUsers}
					reloadListUsers={reloadListUsers}
					setReloadListUsers={setReloadListUsers}
				/>
			) : (
				<NoUsers />
			)}
		</div>
	);
};

export default AdminPage;

const NoUsers = () => {
	return (
		<div className="flex items-center justify-center h-full">
			<p className="text-2xl">No users found</p>
		</div>
	);
};
