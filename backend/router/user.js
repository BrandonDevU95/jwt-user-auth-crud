const express = require('express');
const UserController = require('../controllers/user');
const { userAuth } = require('../middlewares/authenticated');
const { isAdmin } = require('../middlewares/credentials');

const api = express.Router();

api.get('/user/me', [userAuth], UserController.getMe);
api.post('/user/update', [userAuth], UserController.updateProfile);
api.get('/users', [userAuth, isAdmin], UserController.getUsers);
api.post('/user', [userAuth, isAdmin], UserController.createUser);
api.patch('/user/:id', [userAuth, isAdmin], UserController.updateUser);
api.delete('/user/:id', [userAuth, isAdmin], UserController.deleteUser);
api.get('/user/role', [userAuth], UserController.userRole);

module.exports = api;
