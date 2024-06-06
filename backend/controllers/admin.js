const User = require('../models/user');
const { validateUser, validateUserPartial } = require('../schemas/user');
const { encryptPassword } = require('../utils/authPass');

async function getUsers(req, res) {
	const user = await User.find();

	if (!user) {
		return res.status(404).send({ message: 'Users not found' });
	}

	delete user.password;

	return res.status(200).send(user);
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

async function updateUser(req, res) {
	const { id } = req.params;
	const userData = req.body;

	userData.updated_at = new Date(userData.updated_at);

	if (!id) return res.status(400).json({ error: 'Id is required.' });

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
			{ _id: id },
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

async function deleteUser(req, res) {
	const { id } = req.params;

	if (!id) return res.status(400).json({ error: 'Id is required.' });

	try {
		const user = await User.findByIdAndDelete({ _id: id });
		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}
		return res.status(200).json({ message: 'User deleted successfully.' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
};
