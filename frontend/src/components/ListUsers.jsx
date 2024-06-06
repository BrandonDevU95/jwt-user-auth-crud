import { ADMIN_ROLE } from '../constants/Auth';
import Modal from './Modal';
import classnames from 'classnames';
import { useState } from 'react';

const ListUsers = ({ listUsers }) => {
	const [showModal, setShowModal] = useState(false);
	const [user, setUser] = useState({});
	return (
		<>
			<ul
				role="list"
				className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{listUsers.map((user) => (
					<li
						key={user._id}
						className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
						<div className="flex w-full items-center justify-between space-x-4 p-6">
							<div className="flex-1 truncate">
								<div className="flex items-center space-x-3">
									<h3 className="truncate text-base font-medium text-gray-900">
										{user.firstname + ' ' + user.lastname}
									</h3>
									<span
										className={classnames(
											'inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ring-green-600/20',
											user.role === ADMIN_ROLE
												? 'bg-orange-50 text-orange-600 ring-orange-600'
												: 'bg-blue-50 text-blue-600 ring-blue-600'
										)}>
										{user.role}
									</span>
									<span
										className={classnames(
											'inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ring-green-600/20',
											user.active
												? 'bg-green-50 text-green-600 ring-green-600'
												: 'bg-red-50 text-red-600 ring-red-600'
										)}>
										{user.active ? 'Active' : 'Inactive'}
									</span>
								</div>
								<p className="truncate text-sm text-gray-500">
									@{user.username}
								</p>
							</div>
							<img
								className="h-14 w-14"
								src={user.avatar}
								alt={user._id}
							/>
						</div>
						<div>
							<div className="-mt-px flex divide-x divide-gray-200">
								<div className="flex w-0 flex-1">
									<button
										type="button"
										className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-700 hover:bg-red-100 hover:text-red-900">
										<TrashIcon />
										Delete
									</button>
								</div>
								<div className="-ml-px flex w-0 flex-1">
									<button
										type="button"
										onClick={() => {
											setUser(user);
											setShowModal(true);
										}}
										className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-700 hover:bg-sky-100 hover:text-sky-900">
										<EditIcon />
										Edit
									</button>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
			<Modal
				user={user}
				show={showModal}
				onClose={() => setShowModal(false)}
			/>
		</>
	);
};

export default ListUsers;

const TrashIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M4 7l16 0" />
			<path d="M10 11l0 6" />
			<path d="M14 11l0 6" />
			<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
			<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
		</svg>
	);
};

const EditIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="icon icon-tabler icons-tabler-outline icon-tabler-pencil">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
			<path d="M13.5 6.5l4 4" />
		</svg>
	);
};
