import { getUserSession } from '../utils/userSession';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate('/login');
	};

	const userSession = getUserSession();

	return (
		<div className="flex items-center justify-center h-[calc(100vh-65px)]">
			<div className="max-w-md py-4 px-8 bg-gray-100 shadow-lg rounded-lg my-20">
				<div className="text-center">
					<h2 className="text-gray-800 text-3xl font-semibold">
						JWT Admin Panel
					</h2>
					{userSession && (
						<p className="mt-2 text-gray-600">
							Welcome, {userSession.firstname}{' '}
							{userSession.lastname} !
						</p>
					)}
					<p className="mt-2 text-gray-600">
						Este es un ejemplo de un panel de administración con JWT
						que utiliza React, Tailwind CSS y Express.js.
					</p>
				</div>
				<div className="flex justify-center mt-4">
					<button
						onClick={handleLogin}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none">
						{userSession ? 'Profile' : 'Login'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
