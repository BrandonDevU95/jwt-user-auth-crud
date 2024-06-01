import { USER } from '../constants/localStorage';

const getUserSession = () => {
	const user = JSON.parse(localStorage.getItem(USER));
	if (!user) return null;

	return user;
};

const setUserSession = (user) => {
	localStorage.setItem(USER, JSON.stringify(user));
};

const removeUserSession = () => {
	localStorage.removeItem(USER);
};

export { getUserSession, setUserSession, removeUserSession };
