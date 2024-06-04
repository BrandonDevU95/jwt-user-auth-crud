const express = require('express');
const UserController = require('../controllers/user');
const { userAuth } = require('../middlewares/authenticated');

const api = express.Router();

api.get('/user/me', [userAuth], UserController.getMe);
api.get('/user/role', [userAuth], UserController.userRole);
api.post('/user/update', [userAuth], UserController.updateProfile);

module.exports = api;
