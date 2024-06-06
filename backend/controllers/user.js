const User = require('../models/user');
const { validateUser, validateUserPartial } = require('../schemas/user');
const { encryptPassword } = require('../utils/authPass');

async function getMe(req, res) {
	const { user_id } = req.user;

	const user = await User.findById(user_id);

	if (!user) {
		return res.status(404).send({ message: 'User not found' });
	}

	delete user._doc.password;
	return res.status(200).send(user);
}

async function updateProfile(req, res) {
	const { user_id } = req.user;
	const userData = req.body;

	delete userData.active;
	delete userData.role;
	userData.updated_at = new Date(userData.updated_at);

	if (!user_id) return res.status(400).json({ error: 'Id is required.' });

	const userFields = validateUserPartial(userData);

	if (!userFields.success) {
		return res
			.status(400)
			.json({ error: JSON.parse(userFields.error.message) });
	}

	if (userFields.data.email) {
		userFields.data.email = userFields.data.email.toLowerCase();
	}

	if (userFields.data.password) {
		const hashedPassword = await encryptPassword(userFields.data.password);
		if (hashedPassword.error) {
			return res.status(500).json({ error: hashedPassword.message });
		}
		userFields.data.password = hashedPassword;
	}

	try {
		const user = await User.findByIdAndUpdate(
			{ _id: user_id },
			userFields.data,
			{ new: true }
		);
		delete user._doc.password;
		return res.status(200).json(user);
	} catch (error) {
		if (error.code === 11000) {
			// Código de error de duplicación
			const duplicateField = Object.keys(error.keyPattern)[0]; // Obtener el campo duplicado
			let errorMessage = '';

			if (duplicateField === 'username') {
				errorMessage = 'Username already in use.';
			} else if (duplicateField === 'email') {
				errorMessage = 'Email already in use.';
			} else {
				errorMessage = 'Duplicate field error.';
			}

			res.status(400).json({ error: errorMessage });
		} else {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
}

async function userRole(req, res) {
	const { user_id } = req.user;

	const user = await User.findById(user_id);

	if (!user) {
		return res.status(404).send({ message: 'User not found' });
	}

	return res.status(200).json({ role: user.role });
}

module.exports = {
	getMe,
	updateProfile,
	userRole,
};
