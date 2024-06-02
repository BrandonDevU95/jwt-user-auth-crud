import { removeUserSession } from '../utils/userSession';
import { showToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';

const useLogout = () => {
	const navigate = useNavigate();
	const { setReloadProfile } = useProfile();

	const logout = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/logout', {
				method: 'GET',
				credentials: 'include',
			});

			if (response.ok) {
				const data = await response.json();
				showToast(data.message, 'success');
				removeUserSession();
				setReloadProfile(true);
				navigate('/');
			} else {
				showToast('Failed to logout', 'error');
				return;
			}
		} catch (error) {
			showToast('Failed to logout', 'error');
			return;
		}
	};

	return logout;
};

export default useLogout;
