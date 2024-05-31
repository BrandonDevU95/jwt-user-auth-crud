import Toastify from 'toastify-js';

const showToast = (text, type, location = null) => {
	let background = '';

	switch (type) {
		case 'success':
			background = 'linear-gradient(to right, #00b09b, #96c93d)';
			break;
		case 'error':
			background = 'linear-gradient(to right, #ff416c, #ff4b2b)';
			break;
		case 'warning':
			background = 'linear-gradient(to right, #f8b500, #f78e00)';
			break;
		case 'info':
			background = 'linear-gradient(to right, #00b09b, #96c93d)';
			break;
		default:
			background = 'linear-gradient(to right, #00b09b, #96c93d)';
			break;
	}

	const handleToastClick = () => {
		if (location) window.location.href = location;
	};

	Toastify({
		text,
		close: true,
		gravity: 'top',
		position: 'right',
		stopOnFocus: true,
		style: {
			background,
		},
		callback: handleToastClick,
	}).showToast();

	return null;
};

export { showToast };
