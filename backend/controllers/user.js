const User = require('../models/user');
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

module.exports = {
	getMe,
	getUsers,
};
