const express = require('express');
const UserController = require('../controllers/user');
const { userAuth } = require('../middlewares/authenticated');

const api = express.Router();

api.get('/user/me', [userAuth], UserController.getMe);
api.get('/users', [userAuth], UserController.getUsers);
api.post('/user', [userAuth], UserController.createUser);
api.patch('/user/:id', [userAuth], UserController.updateUser);

module.exports = api;
