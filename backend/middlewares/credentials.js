const User = require('../models/user');

async function isAdmin(req, res, next) {
	const { user_id } = req.user;

	if (!user_id) {
		return res.status(401).send({ message: 'Unauthorized' });
	}

	const user = await User.findById(user_id);

	if (!user) {
		return res.status(404).send({ message: 'User not found' });
	}

	if (user.role !== 'admin') {
		return res
			.status(403)
			.json({ error: 'Forbidden: Admin access required' });
	}

	next();
}

module.exports = { isAdmin };
