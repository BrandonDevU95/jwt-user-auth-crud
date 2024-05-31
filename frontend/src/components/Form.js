import { showToast } from './Toast.js';

const form = document.getElementById('signup');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const username = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	try {
		const response = await fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});

		const data = await response.json();

		if (data.error) {
			showToast(data.error, 'error');
			form.reset();
		} else {
			showToast('Login successful', 'success');
			form.reset();
			setTimeout(() => {
				window.location.href = '/profile';
			}, 2000);
		}
	} catch (error) {
		showToast('An error occurred', 'error');
	}
});
