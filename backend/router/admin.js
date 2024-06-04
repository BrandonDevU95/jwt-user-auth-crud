const express = require('express');
const UserController = require('../controllers/user');
const { userAuth } = require('../middlewares/authenticated');
const { isAdmin } = require('../middlewares/credentials');

const api = express.Router();

api.get('/admin/users', [userAuth, isAdmin], UserController.getUsers);
api.post('/admin/user', [userAuth, isAdmin], UserController.createUser);
api.patch('/admin/user/:id', [userAuth, isAdmin], UserController.updateUser);
api.delete('/admin/user/:id', [userAuth, isAdmin], UserController.deleteUser);

module.exports = api;
