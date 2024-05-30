const User = require('../models/user');
const { validateUser } = require('../schemas/user');
const { encryptPassword } = require('../utils/authPass');
const jwt = require('../utils/jwt');

async function getMe(req, res) {
	const { user_id } = req.user;

	const response = await User.findById(user_id);

	if (!response) {
		return res.status(404).send({ message: 'User not found' });
	}

	return res.status(200).send(response);
}

async function getUsers(req, res) {
	const { active } = req.query;

	let response = null;

	if (active) {
		response = await User.find({ active });
	} else {
		response = await User.find();
	}

	if (!response) {
		return res.status(404).send({ message: 'Users not found' });
	}

	return res.status(200).send(response);
}

async function createUser(req, res) {
	const userFields = validateUser(req.body);

	if (!userFields.success) {
		return res
			.status(400)
			.json({ error: JSON.parse(userFields.error.message) });
	}

	const hashedPassword = await encryptPassword(userFields.data.password);

	if (hashedPassword.error) {
		return res.status(500).json({ error: hashedPassword.message });
	}

	const tempUser = {
		...userFields.data,
		email: userFields.data.email.toLowerCase(),
		password: hashedPassword,
	};

	const userSchema = new User(tempUser);
	try {
		const user = await userSchema.save();

		//Delete password from response
		delete user._doc.password;

		return res.status(201).json(user);
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

module.exports = {
	getMe,
	getUsers,
	createUser,
};
